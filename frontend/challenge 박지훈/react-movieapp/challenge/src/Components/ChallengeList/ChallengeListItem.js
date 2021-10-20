import React from "react";
import ChallengeList from "./ChallengsList";
const ChallegeListItem = ({ challenges }) => {
  const { id, userId, challengeKind, challengeContent } = challenges;
  return <div>{challengeKind}</div>;
};

export default ChallegeListItem;
