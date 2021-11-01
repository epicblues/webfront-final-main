import React from "react";
import ChallengeJoin from "../../components/challenge/List/ChallengeJoin";
import ChallengeMainList from "../../components/challenge/List/ChallengeMainList";

const list = (challeges) => {
  return (
    <>
      <ChallengeMainList></ChallengeMainList>
      <ChallengeJoin></ChallengeJoin>
    </>
  );
};

export default list;
