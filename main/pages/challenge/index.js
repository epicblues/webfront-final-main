import React from "react";
import Link from "next/link";
import "semantic-ui-css/semantic.min.css";
import { getUserOrRedirect } from "../../util/auth";
import { Button, List } from "semantic-ui-react";
import MyChallenge from "../../components/challenge/Main/MyChallenge";
import ProgressBar from "../../components/challenge/Main/ProgressBar";
import clientPromise from "../../util/mongodb";
import ListStyle from "../../styles/challenge/List.module.css";
import ButtonStyle from "../../styles/challenge/Button.module.css";
import ChallengeStyle from "../../styles/challenge/Challenge.module.css";
import axios from "axios";
const index = ({ challenges, user }) => {
  const participatedChallenges = challenges.filter(
    (challenge) =>
      challenge.userId !== user.id &&
      challenge.participants.some((participant) => participant === user.id)
  );
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link passHref href="/challenge/create">
          <Button>챌린지 작성</Button>
        </Link>

        <Link passHref href="/challenge/mainlist">
          <Button>챌린지 리스트 보기 </Button>
        </Link>
      </div>
      <br />

      <div className={ChallengeStyle.container2}>
        <h2>참여한 챌린지</h2>
        <MyChallenge
          challenges={challenges}
          user={user}
          key={challenges.id}
        ></MyChallenge>
        {challenges.map((challenge) => {
          return (
            <>
              {!challenge.participants.indexOf(user.id) === -1 ? (
                <>
                  <div className={ChallengeStyle.item}>
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
                          작성자:{challenge.author[0].name}
                        </li>
                        <li key={challenge.id}>
                          참가자 수:{challenge.participants.length}명
                        </li>
                        <li key={challenge.id}>
                          챌린지 기한:
                          {new Date(
                            challenge.startDate
                          ).toLocaleDateString()}~{" "}
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
                        className={ButtonStyle.button}
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
