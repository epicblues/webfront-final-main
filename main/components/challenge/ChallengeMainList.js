import React from "react";

const ChallengeMainList = () => {
  const challenges = [
    {
      id: 1,
      userId: "강호동",
      challengeName: "10000kcal 챌린지",
      challengeKind: "diet",
      challengeContent: "1주일 동안 만칼로리 먹기",
      joinCount: "50명",
      points: "10만",
      startDate: "2021.10.26",
      endDate: "2021.11.26",
    },
    {
      id: 2,
      userId: "정준하",
      challengeName: "100000kcal 챌린지",
      challengeKind: "diet",
      challengeContent: "10일 동안 10만칼로리 먹기",
      joinCount: "50명",
      points: "10만",
      startDate: "2021.10.26",
      endDate: "2021.11.5",
    },
    {
      id: 3,
      userId: "유재석",
      challengeName: "20000kcal 챌린지",
      challengeKind: "diet",
      challengeContent: "1주일 동안 2만칼로리 먹기",
      joinCount: "50명",
      points: "10만",
      startDate: "2021.10.26",
      endDate: "2021.11.2",
    },
    {
      id: 4,
      userId: "백종원",
      challengeName: "나만의 한식 레시피",
      challengeKind: "receipe",
      challengeContent: "2주 동안 한식 레피시 3개 업로드",
      joinCount: "30명",
      points: "10만",
      startDate: "2021.10.26",
      endDate: "2021.11.09",
    },
  ];
  return (
    <div className="challengeListMain">
      {challenges.map((challenges, index) => {
        return (
          <ul>
            <li>{challenges.id}</li>
            <li>{challenges.userId}</li>
            <li>{challenges.challengeName}</li>
            <li>{challenges.challengeKind}</li>
            <li>{challenges.challengeContent}</li>
            <li>{challenges.joinCount}</li>
            <li>{challenges.points}</li>
            <li>{challenges.startDate}</li>
            <li>{challenges.endDate}</li>
            <challenges key={index}></challenges>
          </ul>
        );
      })}
    </div>
  );
};

export default ChallengeMainList;
