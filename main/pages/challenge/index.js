import React from "react";
import Link from "next/link";
import "semantic-ui-css/semantic.min.css";
import { getUserOrRedirect } from "../../util/auth";
import { Button } from "semantic-ui-react";
import MyChallenge from "../../components/challenge/Main/MyChallenge";
import clientPromise from "../../util/mongodb";

const index = ({ challenges, user }) => {
  return (
    <>
      <Link passHref href="challenge/write">
        <Button>챌린지 작성</Button>
      </Link>

      <Link passHref href="challenge/list">
        <Button>챌린지 리스트 보기 </Button>
      </Link>
      <br />
      <div className="myChallenge">
        <MyChallenge challenges={challenges}></MyChallenge>
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
    .find({
      userId: user.id,
    })
    .toArray();

  console.log("user:", user);
  console.log(challenges);

  return {
    props: { user, challenges: JSON.parse(JSON.stringify(challenges)) },
  };
};
export default index;
