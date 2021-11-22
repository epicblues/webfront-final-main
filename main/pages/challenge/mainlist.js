import React, { useState } from "react";
import { getUserOrRedirect } from "../../util/auth";
import clientPromise from "../../util/mongodb";
import ChallengeMainList from "../../components/challenge/List/ChallengeMainList";

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
      {challengeIndexes.map((index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setChallengeIndex(index);
            }}
          >
            {index}
          </button>
        );
      })}
      {challenges.length > 0 ? (
        <ChallengeMainList
          challenges={selectChallenges(challengeIndex)}
          user={user}
        />
      ) : (
        <h2>No Challenges</h2>
      )}
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
    .sort({ _id: 1 })
    .toArray();

  console.log("user:", user);
  console.log(challenges);

  return {
    props: { user, challenges: JSON.parse(JSON.stringify(challenges)) },
  };
};

export default MainList;
