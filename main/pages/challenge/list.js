import React from "react";
import ChallengeJoin from "../../components/challenge/ChallengeJoin";
import ChallengeMainList from "../../components/challenge/ChallengeMainList";

const list = () => {
  return (
    <>
      <ChallengeMainList></ChallengeMainList>
      <ChallengeJoin></ChallengeJoin>
    </>
  );
};

export default list;
