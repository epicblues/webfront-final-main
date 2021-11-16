import React from "react";
import { parseDocumentToObject } from "../../util/date";
import ChallengeMainList from "../../components/challenge/List/ChallengeMainList";
import { getUserOrRedirect } from "../../util/auth";
import clientPromise from "../../util/mongodb";

const list = ({ user, challenges }) => {
  return (
    <>
      <ChallengeMainList
        user={user}
        challenges={challenges}
      ></ChallengeMainList>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);

  const client = await clientPromise;
  const challenges = await client
    .db("webfront")
    .collection("challenge")
    .find({})
    .toArray();

  console.log("user:", user);
  console.log(challenges);

  return {
    props: { user, challenges: parseDocumentToObject(challenges) },
  };
};

export default list;
