import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import clientPromise from "../../util/mongodb";
import { getUserOrRedirect } from "../../util/auth";
//component
import DateContent from "../../components/challenge/Main/DateContent";
import ProgressBar from "../../components/challenge/Main/ProgressBar";
import Navbar from "../../components/challenge/Main/Navbar";
import Search from "../../components/challenge/Main/Search";
import RecommendChallenge from "../../components/challenge/Main/RecommendChallenge";
import Header from "../../components/challenge/Main/Header";
import ImageAndParti from "../../components/challenge/Main/ImageAndParti";
import PastChallenges from "../../components/challenge/test/PastChallenges.tsx";
import MainModal from "../../components/challenge/Main/MainModal";
//css
import "semantic-ui-css/semantic.min.css";
import MainStyle from "../../styles/challenge/Main.module.css";
import ListStyle from "../../styles/challenge/List.module.css";
import ButtonStyle from "../../styles/challenge/Button.module.css";
import ChallengeStyle from "../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../styles/challenge/Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Icon, Image } from "semantic-ui-react";

const Index = ({ challenges, user }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const router = useRouter();

  const [participatedChallenges, setParticipatedChallenges] = useState(
    challenges.filter(
      (challenge) =>
        challenge.participants.some((participant) => participant === user.id) ||
        challenge.userId === user.id
    )
  );
  const copiedChallenges = [...participatedChallenges];
  const smallChallenges = copiedChallenges.slice(0, 3);

  const handleButton = () => {};
  const tabChallenge = [
    {
      tabTitle: (
        <a
          key="challengeId1"
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          메인
        </a>
      ),
      tabContent: (
        <>
          <div>
            <Header />
            <Search setChallenges={setParticipatedChallenges} />
          </div>

          {participatedChallenges.length === 0 ? (
            <div className={ChallengeStyle.container2}>
              <>
                <RecommendChallenge challenges={challenges} />
              </>
            </div>
          ) : (
            <>
              {participatedChallenges.map((challenge) => {
                <>
                  <div className={ChallengeStyle.indexCont}>
                    <ImageAndParti challenge={challenges} />
                  </div>
                  <div>
                    <DateContent challenge={challenges} />
                  </div>
                </>;
              })}
            </>
          )}
        </>
      ),
    },
    {
      tabTitle: (
        <a
          key="challengeId2"
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1)}
        >
          전체
        </a>
      ),
      tabContent: (
        <>
          <div>
            <Header />
            <Search setChallenges={setParticipatedChallenges} />
          </div>
          <div className={ChallengeStyle.mainContainer}>
            {challenges.map((challenge) => {
              <>
                <div className={ChallengeStyle.indexCont}>
                  <ImageAndParti challenges={challenges} />
                </div>
                <div>
                  <DateContent challenge={challenges} />
                  {challenge.type === "diet" ? (
                    <Link passHref href={"/challenge/list/" + challenge._id}>
                      <li>챌린지 종류: 다이어트</li>
                    </Link>
                  ) : (
                    <Link passHref href={"/challenge/list/" + challenge._id}>
                      <li>챌린지 종류: 다이어트</li>
                    </Link>
                  )}
                </div>
              </>;
            })}
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ margin: "10px 0" }}>
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
        <div style={{ marginTop: "30%", marginBottom: "5%" }}>
          {participatedChallenges.length === 0 ? (
            <>
              <RecommendChallenge challenges={challenges} />
            </>
          ) : (
            <>
              {smallChallenges.map((challenge) => {
                return (
                  <>
                    <div style={{ margin: "1rem 0" }} key={challenge._id}>
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
                                left: "30%",
                                top: "10%",
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
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                position: "absolute",
                                top: "40%",
                                marginLeft: "5%",
                              }}
                            >
                              <Image
                                style={{
                                  zIndex: "0",
                                  borderRadius: "5%",
                                  width: "40%",
                                }}
                                src={
                                  process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                                  challenge.image
                                }
                                layout="fill"
                              />
                            </div>
                          </div>
                          <ul className={MainStyle.ul}>
                            <li
                              className={ChallengeStyle.h2L}
                              key={challenge._id}
                            >
                              {challenge.title}
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
                          </ul>
                        </>
                      </Link>
                      <div
                        style={{
                          position: "relative",
                          left: "53%",
                          top: "10px",
                        }}
                      >
                        <button
                          className={MainStyle.button}
                          onClick={async (event) => {
                            const {
                              data: { result, message },
                            } = await axios.post(
                              "/api/challenge/validate",
                              challenge
                            );
                            console.log(result);
                            const button = event.target;

                            button.disabled = true;
                            if (message === "failed") {
                              // 실패했다.
                              button.textContent = "진행중!";
                              button.style.color = "white";
                              setInterval(
                                (button) => {
                                  button.style.display = "none";
                                },
                                100,
                                button
                              );
                              const progressBar = button.nextElementSibling;
                              if (progressBar instanceof HTMLElement) {
                                progressBar.style.display = "block";
                                const realProgressBar =
                                  progressBar.firstElementChild
                                    .firstElementChild;
                                if (challenge.type === "diet") {
                                  realProgressBar.value = realProgressBar.max =
                                    challenge.diet.condition;
                                  const span =
                                    realProgressBar.nextElementSibling;
                                  span.innerText =
                                    Math.round(
                                      (result / challenge.diet.condition) * 100
                                    ) + " %";
                                } else {
                                  realProgressBar.value = realProgressBar.max =
                                    challenge.recipe.uploadCount;
                                  const span =
                                    realProgressBar.nextElementSibling;
                                  span.innerText =
                                    Math.round(
                                      (result / challenge.recipe.uploadCount) *
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
                                100,
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
                    </div>
                  </>
                );
              })}
              <MainModal challenges={participatedChallenges} />
              <PastChallenges />
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
export default Index;
