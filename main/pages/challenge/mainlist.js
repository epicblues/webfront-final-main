import React, { useState } from "react";
import { getUserOrRedirect } from "../../util/auth";
import clientPromise from "../../util/mongodb";
import Link from "next/dist/client/link";
import ChallengeMainList from "../../components/challenge/List/ChallengeMainList";
//css
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import ChallengeStyle from "../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../styles/challenge/Input.module.css";

const MainList = ({ challenges, user }) => {
  const challengeIndexes = [];
  for (let i = 1; i <= Math.ceil(challenges.length / 10); i++) {
    challengeIndexes.push(i);
  }
  const [challengeIndex, setChallengeIndex] = useState(1);

  const selectChallenges = (index) => {
    const pickedChallenges = [];
    for (
      let i = (index - 1) * 10;
      i < index * 10 && i < challenges.length;
      i++
    ) {
      pickedChallenges.push(challenges[i]);
    }
    return pickedChallenges;
  };

  return (
    <>
      <div className="container">
        <div>
          <div className={ChallengeStyle.header}>
            <Link passHref href={"/challenge"}>
              <FontAwesomeIcon
                icon={faAngleDoubleLeft}
                className={ImageStyle.image4}
              />
            </Link>
          </div>
          <h2 className={ChallengeStyle.h2C}>챌린지 리스트</h2>
          <hr className={ChallengeStyle.hr3} />

          {challenges.length > 0 ? (
            <ChallengeMainList
              challenges={selectChallenges(challengeIndex)}
              user={user}
            />
          ) : (
            <h2>No Challenges</h2>
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);

  const client = await clientPromise;
  const challenges = await client
    .db("webfront")
    .collection("challenge")
    .aggregate([
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "author",
        },
      },
    ])
    .match({
      endDate: { $gte: new Date() },
      participants: {
        $nin: [user.id],
      },
    })
    .sort({ _id: 1 })
    .toArray();

  console.log("user:", user);
  console.log(challenges);

  return {
    props: { user, challenges: JSON.parse(JSON.stringify(challenges)) },
  };
};

export default MainList;
