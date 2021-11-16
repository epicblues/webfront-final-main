import React from "react";
import { getUserOrRedirect } from "../../util/auth";
import clientPromise from "../../util/mongodb";
import ChallengeMainList from "../../components/challenge/List/ChallengeMainList";

const mainlist = ({ challenges, user }) => {
  return <ChallengeMainList challenges={challenges} user={user} />;
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
    props: { user, challenges: JSON.parse(JSON.stringify(challenges)) },
  };
};

export default mainlist;
