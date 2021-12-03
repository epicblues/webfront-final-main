import React, { useEffect } from "react";
import Link from "next/dist/client/link";
import axios from "axios";
import { Button, Image } from "semantic-ui-react";
import ProgressBar from "./ProgressBar";
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css";
import ListStyle from "../../../styles/challenge/List.module.css";
import ButtonStyle from "../../../styles/challenge/Button.module.css";
const MyChallenge = ({ challenges, user }) => {
  return (
    <>
      <div className="MyChallnege">
        <div className={ChallengeStyle.item}>
          {challenges.map((challenge) => {
            return (
              <>
                {challenge.author[0]._id === user.id ? (
                  <>
                    <ul className={ListStyle.ul}>
                      <Link passHref href={"/challenge/list/" + challenge._id}>
                        <a>
                          {" "}
                          <li key={challenge.id}>{challenge.title}</li>
                        </a>
                      </Link>
                      <li key={challenge.id}>
                        {new Date(challenge.startDate).toLocaleDateString()}~{" "}
                        {new Date(challenge.endDate).toLocaleDateString()}
                      </li>
                      <li key={challenge.id}>
                        참가인원:{challenge.participants.length}명
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
                      {challenge.type === "diet" ? (
                        <>
                          <li key={challenge.id}>챌린지 종류: 다이어트</li>
                        </>
                      ) : (
                        <>
                          <li key={challenge.id}>챌린지 종류: 레시피</li>
                        </>
                      )}
                    </ul>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        className={ButtonStyle.button}
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
                              2000,
                              button
                            );
                            const progressBar = button.nextElementSibling;
                            if (progressBar instanceof HTMLElement) {
                              progressBar.style.display = "block";
                              const realProgressBar =
                                progressBar.firstElementChild.firstElementChild;
                              if (challenge.type === "diet") {
                                realProgressBar.value = result.length;
                                realProgressBar.max = challenge.diet.condition;
                                const span = realProgressBar.nextElementSibling;
                                span.innerText =
                                  (result.length / challenge.diet.condition) *
                                    100 +
                                  " %";
                              } else {
                                realProgressBar.value = result.length;
                                realProgressBar.max =
                                  challenge.recipe.uploadCount;
                                const span = realProgressBar.nextElementSibling;
                                span.innerText =
                                  (result.length /
                                    challenge.recipe.uploadCount) *
                                    100 +
                                  " %";
                              }
                            }
                          } else {
                            // 성공했다.
                            button.textContent = "성공!";
                            button.style.backgroundColor = "blue";

                            setInterval(
                              (button) => {
                                button.style.display = "none";
                              },
                              2000,
                              button
                            );
                          }
                        }}
                      >
                        챌린지 결과 확인
                      </button>
                      <div style={{ display: "none" }}>
                        <ProgressBar />
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyChallenge;
