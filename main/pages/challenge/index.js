import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import clientPromise from "../../util/mongodb";
import { getUserOrRedirect } from "../../util/auth";
//component
import MyChallenge from "../../components/challenge/Main/MyChallenge";
import ProgressBar from "../../components/challenge/Main/ProgressBar";
import Navbar from "../../components/challenge/Main/Navbar";
import Search from "../../components/challenge/Main/Search";
import RecommendChallenge from "../../components/challenge/Main/RecommendChallenge";
//css
import "semantic-ui-css/semantic.min.css";
import ListStyle from "../../styles/challenge/List.module.css";
import ButtonStyle from "../../styles/challenge/Button.module.css";
import ChallengeStyle from "../../styles/challenge/Challenge.module.css";
import UserStyle from "../../styles/challenge/Input.module.css";
import ImageStyle from "../../styles/challenge/Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Icon, Image } from "semantic-ui-react";
import { useRouter } from "next/router";

const index = ({ challenges, user }) => {
  const router = useRouter();

  const [participatedChallenges, setParticipatedChallenges] = useState(
    challenges.filter(
      (challenge) =>
        challenge.participants.some((participant) => participant === user.id) ||
        challenge.userId === user.id
    )
  );

  return (
    <>
      <div>
        <div className={ChallengeStyle.header2}>
          <Icon
            name="angle double left"
            size="large"
            className={ImageStyle.back}
            onClick={() => router.back()}
          />
          <Search setChallenges={setParticipatedChallenges} />
          <Navbar currentURL={"/challenge"} />
          <h2 className={ChallengeStyle.h2L}>참여중인 챌린지</h2>
        </div>
        <div className={ChallengeStyle.container2}>
          {participatedChallenges.length === 0 ? (
            <>
              <RecommendChallenge challenges={challenges} />
            </>
          ) : (
            <>
              {participatedChallenges.map((challenge) => {
                return (
                  <>
                    <Link passHref href={"/challenge/list/" + challenge._id}>
                      <>
                        <div
                          className="image-wrap"
                          style={{
                            position: "relative",
                            borderRadius: "0.3rem",
                          }}
                        >
                          <div
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
                          <li className={ListStyle.li}>
                            <li
                              className={ChallengeStyle.h2L}
                              key={challenge._id}
                            >
                              챌린지 명:{challenge.title}
                            </li>

                            <li className={ChallengeStyle.li}>
                              시작일:
                              {new Date(challenge.startDate).getMonth() +
                                1 +
                                "월" +
                                new Date(challenge.startDate).getDate() +
                                "일"}
                            </li>
                            <li className={ChallengeStyle.li}>
                              종료일:
                              {new Date(challenge.endDate).getMonth() +
                                1 +
                                "월" +
                                new Date(challenge.endDate).getDate() +
                                "일"}
                            </li>
                            <li className={ChallengeStyle.li}>
                              남은 일수:
                              {Math.ceil(
                                (new Date(challenge.endDate).getTime() -
                                  new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}
                              일
                            </li>
                          </li>
                        </ul>
                      </>
                    </Link>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
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
                        결과 확인
                      </button>
                      <div style={{ display: "none" }}>
                        <ProgressBar />
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}
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
