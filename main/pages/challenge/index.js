import React from "react";
import Link from "next/link";
import "semantic-ui-css/semantic.min.css";
import ChallengeList from "../../components/challenge/ChallengeList";
import MyChallenge from "../../components/challenge/MyChallenge";

const index = () => {
  return (
    <>
      <Link href="challenge/write">
        <button>챌린지 작성</button>
      </Link>
      <MyChallenge />
      <ChallengeList />
      <Link href="challenge/list">
        <button>챌린지 리스트 보기 </button>
      </Link>
    </>
  );
};

export default index;
