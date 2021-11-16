import React from "react";
<<<<<<< HEAD
import { parseDocumentToObject } from "../../util/date";
import ChallengeMainList from "../../components/challenge/List/ChallengeMainList";
=======
import ChallengeList from "../../components/challenge/List/ChallengeList";
>>>>>>> 330fd197fadd8750033bc360ac4f395e5e03350d
import { getUserOrRedirect } from "../../util/auth";
import clientPromise from "../../util/mongodb";

const list = ({ user, challenges }) => {
  console.log(user, challenges);
  return (
    <>
      <span>
        <h2>챌린지 리스트</h2>
      </span>
      <ChallengeList user={user} challenges={challenges}></ChallengeList>
      <span>
        <a href="/challenge/mainlist">더보기</a>
      </span>
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
    .toArray();

  console.log("user:", user);
  console.log(challenges);

  return {
    props: { user, challenges: parseDocumentToObject(challenges) },
  };
};

export default list;
