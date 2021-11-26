import React, { useEffect } from "react";
import Link from "next/dist/client/link";
import axios from "axios";
import ProgressBar from "./ProgressBar";
const MyChallenge = ({ challenges, user }) => {
  return (
    <>
      <div>
        {challenges.map((challenge) => {
          return (
            <>
              {challenge.author[0]._id === user.id ? (
                <>
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
                    <li key={challenge.id}>
                      작성자:{challenge.author[0].name}
                    </li>
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
                      onClick={async (event) => {
                        const {
                          data: { result },
                        } = await axios.post(
                          "/api/challenge/validate",
                          challenge
                        );
                        console.log(result);
                        console.log(event);
                        const button = event.target;

                        button.disabled = true;
                        if (Array.isArray(result)) {
                          // 실패했다.
                          button.textContent = "진행중!";
                          button.style.color = "white";
                          setInterval(
                            (button) => {
                              button.style.display = "none";
                            },
                            3000,
                            button
                          );
                          const progressBar = button.nextElementSibling;
                          progressBar.style.display = "block";
                        } else {
                          // 성공했다.
                          button.textContent = "성공!";
                          button.style.backgroundColor = "blue";

                          setInterval(
                            (button) => {
                              button.style.display = "none";
                            },
                            3000,
                            button
                          );
                        }
                      }}
                    >
                      챌린지 결과 확인
                    </button>
                    <div style={{ display: "none" }}>
                      <ProgressBar value={20} max={100} />
                    </div>
                  </div>
                </>
              ) : null}
            </>
          );
        })}
      </div>
    </>
  );
};

export default MyChallenge;
