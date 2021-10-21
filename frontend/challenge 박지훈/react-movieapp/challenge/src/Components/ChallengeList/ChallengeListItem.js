import React, { useState } from "react";

const ChallengeListItem = () => {
  const [challenges, setChallegnes] = useState([
    {
      id: 1,
      userid: "kim jong guk",
      challengeName: "10000칼로리 챌린지",
      startDate: "2021.10.19",
      endDate: `2021.10.31`,
      challengeKind: "diet",
      challegeContent: "12일 동안, 10000칼로리 먹기",
    },
    {
      id: 2,
      userid: "kim Gae Ran",
      challengeName: "한식 레시피 3개 창작",
      startDate: "2021.10.19",
      endDate: `2021.11.19`,
      challengeKind: "recipe",
      challegeContent: "한 달 동안, 한식레시피 3개 올리기",
    },
    {
      id: 3,
      usesid: "Mok ha ran",
      challengeName: "양식 레시피 3개 창작",
      regDate: Date,
      startDate: "2021.10.20",
      endDate: `2021.11.20`,
      challengeKind: "diet",
      challegeContent: "한 달 동안, 양식 레피시 3개 올리기",
    },
  ]);

  return <ChallengeListItem>{challenges}</ChallengeListItem>;
};

export default ChallengeListItem;
