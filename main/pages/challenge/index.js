import React, { useState, useEffect } from "react";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import axios from "axios";
import clientPromise from "../../util/mongodb";
import { getUserOrRedirect } from "../../util/auth";
//component
import ProgressBar from "../../components/challenge/Main/ProgressBar";
import Navbar from "../../components/challenge/Main/Navbar";
import Search from "../../components/challenge/Main/Search";
import RecommendChallenge from "../../components/challenge/Main/RecommendChallenge";
import PastChallenges from "../../components/challenge/test/PastChallenges.tsx";
import MainModal from "../../components/challenge/Main/MainModal";
import PopularChallenge from "../../components/challenge/Main/PopularChallenge";
//css
import "semantic-ui-css/semantic.min.css";
import MainStyle from "../../styles/challenge/Main.module.css";
import ChallengeStyle from "../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../styles/challenge/Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Icon, Image, Popup } from "semantic-ui-react";

const Index = ({ challenges, user }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [title, setTitle] = useState("참여중인 챌린지 전체 보기");
  const [head, setHead] = useState("진행중인 챌린지");
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
          <h2 className={ChallengeStyle.h2L}>챌린지</h2>
        </div>

        <div style={{ marginTop: "40%", marginBottom: "5%" }}>
          {participatedChallenges.length === 0 ? (
            <>
              <div className={MainStyle.mainTag}>추천 챌린지</div>
              <RecommendChallenge
                challenges={challenges}
                key={challenges._id}
              />
              <div className={MainStyle.mainTag}>인기 챌린지</div>
              <PopularChallenge challenges={challenges} key={challenges._id} />
            </>
          ) : (
            <>
              <div className={ChallengeStyle.mainTag}>참여중인 챌린지</div>
              {smallChallenges.map((challenge) => {
                return (
                  <div key={challenge._id}>
                    <>
                      <div style={{ margin: "5% 0 0 0" }} key={challenge._id}>
                        <>
                          <Link
                            passHref
                            href={"/challenge/list/" + challenge._id}
                          >
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
                          </Link>
                          <ul className={MainStyle.ul}>
                            <Link
                              passHref
                              href={"/challenge/list/" + challenge._id}
                            >
                              <li className={MainStyle.h2L} key={challenge._id}>
                                {challenge.title}
                              </li>
                            </Link>
                            <Link
                              passHref
                              href={"/challenge/list/" + challenge._id}
                            >
                              <li className={MainStyle.mainLi}>
                                시작일:
                                {new Date(challenge.startDate).getMonth() +
                                  1 +
                                  "월" +
                                  new Date(challenge.startDate).getDate() +
                                  "일"}
                              </li>
                            </Link>
                            <Link
                              passHref
                              href={"/challenge/list/" + challenge._id}
                            >
                              <li className={MainStyle.mainLi}>
                                종료일:
                                {new Date(challenge.endDate).getMonth() +
                                  1 +
                                  "월" +
                                  new Date(challenge.endDate).getDate() +
                                  "일"}
                              </li>
                            </Link>
                            <Link
                              passHref
                              href={"/challenge/list/" + challenge._id}
                            >
                              <li className={MainStyle.mainLi}>
                                남은 일수:
                                {Math.ceil(
                                  (new Date(challenge.endDate).getTime() -
                                    new Date().getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )}
                                일
                              </li>
                            </Link>
                          </ul>
                        </>

                        <div
                          style={{
                            position: "relative",
                            left: "56%",
                            bottom: "0.5rem",
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
                                    realProgressBar.value = result;
                                    realProgressBar.max =
                                      challenge.diet.condition;
                                    const span =
                                      realProgressBar.nextElementSibling;
                                    span.innerText =
                                      Math.round(
                                        (result / challenge.diet.condition) *
                                          100
                                      ) + " %";
                                  } else {
                                    realProgressBar.value = result;
                                    realProgressBar.max =
                                      challenge.recipe.uploadCount;
                                    const span =
                                      realProgressBar.nextElementSibling;
                                    span.innerText =
                                      Math.round(
                                        (result /
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
                  </div>
                );
              })}
              <div style={{ marginTop: "15%" }}>
                <MainModal
                  challenges={participatedChallenges}
                  title={title}
                  head={head}
                />
              </div>
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
