import React from "react";
import Link from "next/link";
import axios from "axios";
import clientPromise from "../../util/mongodb";
import { getUserOrRedirect } from "../../util/auth";
//component
import MyChallenge from "../../components/challenge/Main/MyChallenge";
import ProgressBar from "../../components/challenge/Main/ProgressBar";
//css
import "semantic-ui-css/semantic.min.css";
import ListStyle from "../../styles/challenge/List.module.css";
import ButtonStyle from "../../styles/challenge/Button.module.css";
import ChallengeStyle from "../../styles/challenge/Challenge.module.css";
import UserStyle from "../../styles/challenge/Input.module.css";
import { BACKGROUND_COLOR, MIDDLE_COLOR } from "../../constants";

const index = ({ challenges, user }) => {
  const participatedChallenges = challenges.filter(
    (challenge) =>
      challenge.userId !== user.id &&
      challenge.participants.some((participant) => participant === user.id)
  );
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            font: " normal 600 1.2rem",
            padding: "0 1rem",
            paddingBottom: "1.6rem",
          }}
        >
          <div style={{ textAlign: "center", margin: "0 10px", color: "#999" }}>
            <Link passHref href="/challenge/mainlist">
              <p>전체</p>
            </Link>
          </div>
          <div style={{ textAlign: "center", margin: "0 10px", color: "#999" }}>
            <Link passHref href="/challenge/mainlist">
              <p>신규</p>
            </Link>
          </div>
        </div>
        <hr />
        <div className={ChallengeStyle.container2}>
          <h2 className={ChallengeStyle.h2}>참여중인 챌린지</h2>
          <MyChallenge
            challenges={challenges}
            user={user}
            key={challenges.id}
          ></MyChallenge>
          {challenges.map((challenge) => {
            return (
              <>
                {!(challenge.participants.indexOf(user.id) === -1) ? (
                  <>
                    <div className={ChallengeStyle.item}>
                      <div>
                        <h4> 참가자 수:{challenge.participants.length}명</h4>
                      </div>
                      <ul className={ListStyle.ul}>
                        <li className={ListStyle.li}>
                          <Link
                            passHref
                            href={"/challenge/list/" + challenge._id}
                          >
                            <a>
                              {" "}
                              <li key={challenge.id}>
                                챌린지 명:{challenge.title}
                              </li>
                            </a>
                          </Link>
                          <li key={challenge.id}>
                            {new Date(challenge.startDate).getFullYear() +
                              "년" +
                              (new Date(challenge.startDate).getMonth() + 1) +
                              "월" +
                              new Date(challenge.startDate).getDate() +
                              "일" +
                              "~" +
                              new Date(challenge.endDate).getFullYear() +
                              "년" +
                              (new Date(challenge.endDate).getMonth() + 1) +
                              "월" +
                              new Date(challenge.endDate).getDate() +
                              "일"}
                          </li>
                        </li>
                      </ul>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          className={ButtonStyle.button1}
                          onClick={async (event) => {
                            const { data: result } = await axios.post(
                              "/api/challenge/validate",
                              challenge
                            );
                            console.log(result);
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
                                  progressBar.firstElementChild
                                    .firstElementChild;
                                if (challenge.type === "diet") {
                                  realProgressBar.value = result.length;
                                  realProgressBar.max =
                                    challenge.diet.condition;
                                  const span =
                                    realProgressBar.nextElementSibling;
                                  span.innerText =
                                    Math.round(
                                      (result.length /
                                        challenge.diet.condition) *
                                        100
                                    ) + " %";
                                } else {
                                  realProgressBar.value = result.length;
                                  realProgressBar.max =
                                    challenge.recipe.uploadCount;
                                  const span =
                                    realProgressBar.nextElementSibling;
                                  span.innerText =
                                    Math.round(
                                      (result.length /
                                        challenge.recipe.uploadCount) *
                                        100
                                    ) + " %";
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

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);

  const client = await clientPromise;
  const challenges = await client
    .db("webfront")
    .collection("challenge")
    .aggregate([
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "author",
        },
      },
    ])
    .match({ endDate: { $gte: new Date() } })
    .toArray();

  console.log("user:", user);
  console.log(challenges);

  return {
    props: { user, challenges: JSON.parse(JSON.stringify(challenges)) },
  };
};
export default index;
