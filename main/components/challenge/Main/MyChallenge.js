import React, { useState } from "react";
import Link from "next/dist/client/link";
const MyChallenge = ({ challenges, user }) => {
  return (
    <>
      <div>
        {challenges.map((challenge) => {
          return (
            <>
              {challenge.author[0]._id === user.id ? (
                <ul
                  style={{
                    listStyle: "none",
                    border: "solid 2px lightgray",
                    borderRadius: "5px",
                  }}
                >
                  <Link passHref href={"/challenge/list/" + challenge._id}>
                    <a>
                      {" "}
                      <li key={challenge.id}>챌린지명:{challenge.title}</li>
                    </a>
                  </Link>
                  <li key={challenge.id}>작성자:{challenge.author[0].name}</li>
                  <li key={challenge.id}>
                    참가인원:{challenge.participants.length}명
                  </li>

                  <li key={challenge.id}>
                    챌린지 기한:
                    {new Date(challenge.startDate).toLocaleDateString()}~
                    {new Date(challenge.endDate).toLocaleDateString()}
                  </li>
                  <li key={challenge.id}>
                    남은 일수:
                    {Math.ceil(
                      (new Date(challenge.endDate).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                    일
                  </li>
                </ul>
              ) : null}
            </>
          );
        })}
      </div>
    </>
  );
};

export default MyChallenge;
