import React from "react";
import { useRouter } from "next/dist/client/router";

const ChallengeList = ({ challenges }) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/detail");
  };
  return (
    <>
      <h2>챌린지 리스트</h2>
      <div
        className="challengeList"
        style={{ fontFamily: "fantasy", fontSize: "15px", fontWeight: "bold" }}
      >
        <div className="challenge-startDate">{challenges.startDate}</div>
        <div className="challenge-endDate">{challenges.endDate}</div>
        <div className="challenge-id">{challenges.id}</div>
        <div className="challenge-userid">{challenges.userId}</div>
        <div className="challenge-name">{challenges.challengeName}</div>
        <div className="challenge-kind">{challenges.challengeKind}</div>
        <div className="challenge-content">{challenges.challengeContent}</div>
        <div className="challenge-joinCount">{challenges.joinCount}</div>
        <div className="challenge-points">{challenges.points}</div>

        <hr />
      </div>
      <div>
        <button onClick={onClick}>더보기</button>
      </div>
    </>
  );
};

export default ChallengeList;
