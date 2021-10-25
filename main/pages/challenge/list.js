import React from "react";
import ChallengeJoin from "../../components/challenge/ChallengeJoin";
import ChallengeMainList from "../../components/challenge/ChallengeMainList";

const list = () => {
  return (
    <>
      <ChallengeMainList>메인 챌린지 리스트</ChallengeMainList>
      <ChallengeJoin>챌린지 참가</ChallengeJoin>
    </>
  );
};

export default list;
