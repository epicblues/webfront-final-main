import React from "react";
import ChallengeListItem from "./ChallengeListItem";

const ChallengeList = ({ challenges }) => {
  return (
    <div className="ChallengeList">
      {challenges.map((challenge) => (
        <ChallengeListItem challenge={challenge} key={challenge.id} />
      ))}
    </div>
  );
};

export default ChallengeList;
