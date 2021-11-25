import React from "react";
import Link from "next/link";
import axios from "axios";

const ChallengeMainList = ({ challenges, user }) => {
  return (
    <div className="DetailList">
      {challenges.map((challenge) => {
        return (
          <>
            <ul
              style={{
                listStyle: "none",
                border: "solid 2px lightgray",
                borderRadius: "5px",
                textAlign: "left",
              }}
            >
              <li>
                <Link passHref href={"/challenge/list/" + challenge._id}>
                  <a>
                    {" "}
                    <li key={challenge.id}>챌린지 명:{challenge.title}</li>
                  </a>
                </Link>
                <li key={challenge.id}>작성자:{challenge.author[0].name}</li>
                <li key={challenge.id}>
                  참가자 수:{challenge.participants.length}명
                </li>
                <li key={challenge.id}>
                  챌린지 기한:
                  {new Date(challenge.startDate).toLocaleDateString()}~{" "}
                  {new Date(challenge.endDate).toLocaleDateString()}
                </li>
                {challenge.type === "diet" ? (
                  <li key={challenge.id}>챌린지 종류: 다이어트</li>
                ) : (
                  <li key={challenge.id}>챌린지 종류: 레시피</li>
                )}
              </li>
            </ul>
          </>
        );
      })}
    </div>
  );
};

export default ChallengeMainList;
