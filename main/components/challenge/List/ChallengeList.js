import React, { useState } from "react";
import ChallengeListTable from "./ChallengeListTable";
const ChallengeList = ({ user, challenges }) => {
  return (
    <div className="challengeListMain">
      {[0, 1, 2].map((num) => (
        <ChallengeListTable
          challenge={challenges[num]}
          key={challenges[num]._id}
        />
      ))}

      {challenges.map((challenge) => {
        return <div></div>;
      })}
    </div>
  );
};

export default ChallengeList;
