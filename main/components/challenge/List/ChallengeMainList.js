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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{
                  backgroundColor: "#35a2f4",
                  color: "#fff",
                  textShadow: "none",
                  display: "inline-block",
                  cursor: "pointer",
                  border: "none",
                  verticalAlign: "baseline",
                  fontFamily:
                    "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                  margin: "0 0.25em0 0",
                  padding: "0.78571429em 1.5em 0.78571429m",
                  fontWeight: "700",
                  lineHeight: "1em",
                  textAlign: "center",
                  fontSize: "1rem",
                  borderRadius: "0.3rem;",
                  minHeight: "1em",
                  height: "35px",
                  width: "120px",
                }}
                onClick={async () => {
                  const { data } = await axios.post(
                    "/api/challenge/validate",
                    challenge
                  );
                  console.log(data);
                }}
              >
                챌린지 결과 확인
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ChallengeMainList;
