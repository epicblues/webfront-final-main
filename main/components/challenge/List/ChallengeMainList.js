import React from "react";
import Link from "next/link";

const DetailList = ({ challenges, user }) => {
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
              }}
            >
              <li>
                <li>작성자:{challenge.author[0].name}</li>
                <li>참가자 수:{challenge.participants.length}명</li>
                <Link passHref href={"/challenge/list/" + challenge._id}>
                  <a>
                    {" "}
                    <li>챌린지 명:{challenge.title}</li>
                  </a>
                </Link>
                <li>
                  챌린지 기한:
                  {new Date(challenge.startDate).toLocaleDateString()}~{" "}
                  {new Date(challenge.endDate).toLocaleDateString()}
                </li>
                {challenge.type === "diet" ? (
                  <li>챌린지 종류: 다이어트</li>
                ) : (
                  <li>챌린지 종류: 레시피</li>
                )}
              </li>
            </ul>
          </>
        );
      })}
    </div>
  );
};

export default DetailList;
