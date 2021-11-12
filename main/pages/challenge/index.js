import React from "react";
import Link from "next/link";
import "semantic-ui-css/semantic.min.css";
import { getUserOrRedirect } from "../api/auth";
import { Button } from "semantic-ui-react";
import MyChallenge from "../../components/challenge/Main/MyChallenge";
import SmallList from "../../components/challenge/Main/SmallList";
const index = () => {
  return (
    <>
      <Link href="challenge/write">
        <Button>챌린지 작성</Button>
      </Link>

      <Link href="challenge/list">
        <Button>챌린지 리스트 보기 </Button>
      </Link>
      <br />
      <div className="SamllList">
        <SmallList> </SmallList>
      </div>
      <div className="myChallenge">
        <MyChallenge></MyChallenge>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);
  console.log("user:", user);
  return { props: { user } };
};
export default index;
