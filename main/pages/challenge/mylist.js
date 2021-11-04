import React from "react";
import ChallengeList from "../../components/challenge/List/ChallengeList";
import MyChallenge from "../../components/challenge/List/MyChallenge";
const mylist = () => {
  return (
    <>
      <div className="littleList">
        <ChallengeList></ChallengeList>
      </div>
      <div className="myChallenge">
        <MyChallenge></MyChallenge>
      </div>
    </>
  );
};

export default mylist;
