import React, { useEffect } from "react";
import Link from "next/dist/client/link";
import axios from "axios";

import ProgressBar from "./ProgressBar";
//css
import { Image } from "semantic-ui-react";
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css";
import ListStyle from "../../../styles/challenge/List.module.css";
import ButtonStyle from "../../../styles/challenge/Button.module.css";
import ImageStyle from "../../../styles/challenge/Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const MyChallenge = ({ challenges, user }) => {
  return (
    <>
      <div>
        {challenges.map((challenge) => {
          return (
            <>
              {challenge.author[0]._id === user.id ? (
                <>
                  <Link passHref href={"/challenge/list/" + challenge._id}>
                    <div className={ChallengeStyle.container2}>
                      <div>
                        <div
                          className="image-wrap"
                          style={{
                            position: "relative",
                            borderRadius: "0.3rem",
                          }}
                        >
                          <div
                            key={challenge.id}
                            style={{
                              backgroundColor: "gray",
                              width: "50px",
                              right: "0",
                              position: "absolute",
                              textAlign: "right",
                              zIndex: "1",
                              color: "white",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faUser}
                              className={ImageStyle.image2}
                            />
                            {challenge.participants.length}명
                          </div>
                          <div>
                            <Image
                              style={{
                                zIndex: "0",
                                borderRadius: "5%",
                                height: "80px",
                                width: "250px",
                              }}
                              src={
                                process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                                challenge.image
                              }
                              layout="fill"
                              objectFit="cover"
                              objectPosition="top"
                            />
                          </div>
                        </div>

                        <ul className={ListStyle.ul}>
                          <li className={ChallengeStyle.h2C} key={challenge.id}>
                            {challenge.title}
                          </li>
                          <li className={ChallengeStyle.li} key={challenge.id}>
                            시작일:
                            {new Date(challenge.startDate).getMonth() +
                              1 +
                              "월" +
                              new Date(challenge.startDate).getDate() +
                              "일"}
                          </li>
                          <li className={ChallengeStyle.li} key={challenge.id}>
                            종료일:
                            {new Date(challenge.endDate).getMonth() +
                              1 +
                              "월" +
                              new Date(challenge.endDate).getDate() +
                              "일"}
                          </li>
                          <li className={ChallengeStyle.li} key={challenge.id}>
                            남은 일수:
                            {Math.ceil(
                              (new Date(challenge.endDate).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}
                            일
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className={ButtonStyle.button1}
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
                                Math.round(
                                  (result.length / challenge.diet.condition) *
                                    100
                                ) + " %";
                            } else {
                              realProgressBar.value = result.length;
                              realProgressBar.max =
                                challenge.recipe.uploadCount;
                              const span = realProgressBar.nextElementSibling;
                              span.innerText =
                                Math.round(
                                  result.length / challenge.recipe.uploadCount
                                ) *
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
                      결과 확인
                    </button>
                    <div style={{ display: "none" }}>
                      <ProgressBar />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

export default MyChallenge;
