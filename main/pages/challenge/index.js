import React from "react";
import Link from "next/link";
import "semantic-ui-css/semantic.min.css";
import ChallengeList from "../../components/challenge/ChallengeList";
import MyChallenge from "../../components/challenge/MyChallenge";
import { getUserOrRedirect } from "../api/auth";
import { Button } from "semantic-ui-react";
const index = () => {
  return (
    <>
      <Link href="challenge/write">
        <Button>챌린지 작성</Button>
      </Link>
      <MyChallenge />
      <ChallengeList />
      <Link href="challenge/list">
        <Button>챌린지 리스트 보기 </Button>
      </Link>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);
  console.log("user:", user);
  return { props: user };
};
export default index;
