import React, { useState, useEffect } from "react";
import { getUserOrRedirect } from "../../util/auth";
import clientPromise from "../../util/mongodb";

//component
import Navbar from "../../components/challenge/Main/Navbar";
import ChallengeMainList from "../../components/challenge/List/ChallengeMainList";
import Search from "../../components/challenge/Main/Search";
//css

import ChallengeStyle from "../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../styles/challenge/Input.module.css";

const MainList = ({ challenges, user }) => {
  const challengeIndexes = [];
  for (let i = 1; i <= Math.ceil(challenges.length / 10); i++) {
    challengeIndexes.push(i);
  }
  const [challengeIndex, setChallengeIndex] = useState(1);
  const [search, setSearch] = useState(false);
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
      <div className="container" style={{ margin: "0 1rem" }}>
        <div>
          <div className={ChallengeStyle.header2}>
            <Search />
            <Navbar currentURL={"/challenge/mainlist"} />
          </div>
          <div className={ChallengeStyle.newTitle}>챌린지 리스트</div>
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
