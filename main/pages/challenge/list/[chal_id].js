import React, { useState } from "react";
import { getUserOrRedirect } from "../../../util/auth";
import clientPromise from "../../../util/mongodb";
import { patchStaticAxios, postStaticAxios } from "../../../util/axios";
//component
import ChallengeJoin from "../../../components/challenge/List/ChallengeJoin";
import ChallengeCancel from "../../../components/challenge/List/ChallengeCancel";

//css
import { Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import ChallengeStyles from "../../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../../styles/challenge/Input.module.css";
import DetailStyles from "../../../styles/challenge/Detail.module.css";
import { useRouter } from "next/dist/client/router";

const ChallengePage = ({ originalChallenge, user }) => {
  const [challenge, setChallenge] = useState(originalChallenge);
  //좋아요 버튼
  const router = useRouter();
  const handleClick = async (event) => {
    const { data } = await postStaticAxios(
      "/api/challenge/like?id=" + challenge._id,
      user.token,
      {}
    );
    const newChallenge = data.challenge;
    setChallenge((chal) => {
      const newState = { ...chal };
      newState.likes = newChallenge.likes;
      return newState;
    });
    // newChallenge로 setChallenge 해서 덮어 쓰거나
    // setChallenge에서 likes 배열만 바꾸기
  };

  // 좋아요 취소 버튼

  const handleDislike = async (event) => {
    const { data } = await patchStaticAxios(
      "/api/challenge/like?id=" + challenge._id,
      user.token
    );
    const newChallenge = data.challenge;
    setChallenge((chal) => {
      const newState = { ...chal };
      newState.likes = newChallenge.likes;
      return newState;
    });
  };

  const countChallengeDate = (endDate) => {
    const dateCount = Math.ceil(
      (new Date(challenge.endDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return <div>{dateCount}일</div>;
  };
  const changeDateStr = () => {
    const newStartDateStr =
      new Date(challenge.startDate).getFullYear() +
      "년" +
      (new Date(challenge.startDate).getMonth() + 1) +
      "월" +
      new Date(challenge.startDate).getDate() +
      "일";
    const newEndDateStr =
      new Date(challenge.endDate).getFullYear() +
      "년" +
      (new Date(challenge.endDate).getMonth() + 1) +
      "월" +
      new Date(challenge.endDate).getDate() +
      "일";
    return (
      <div>
        {newStartDateStr}~{newEndDateStr}
      </div>
    );
  };

  const changeRecipeName = () => {
    switch (challenge.recipe.category) {
      case "noodle":
        return <div>레시피 종류 : 면/파스타</div>;
      case "soup":
        return <div>레시피 종류 : 국/탕/찌개</div>;
      case "dessert":
        return <div>레시피 종류 : 디저트</div>;
      case "rice":
        return <div>레시피 종류 : 밥/볶음밥</div>;
      case "kimchi":
        return <div>레시피 종류 : 김치</div>;
      case "grill":
        return <div>레시피 종류 : 구이</div>;
      case "etc":
        return <div>레시피 종류 : 기타</div>;
      default:
        return <div>없음</div>;
    }
  };
  return (
    <>
      <div className={DetailStyles.container}>
        <div style={{ margin: "0" }}></div>
        <div className={DetailStyles.image}>
          <Image
            className={ImageStyle.mImage}
            src={process.env.NEXT_PUBLIC_STATIC_SERVER_URL + challenge.image}
            layout="fill"
          />
        </div>
        <br />
        <div className={DetailStyles.title}>{challenge.title}</div>
        <div className={DetailStyles.date}>{countChallengeDate()}</div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              font: "normal 600 1rem/24px Noto Sans KR",
              marginRight: "5px",
            }}
          >
            <Icon className="user" size="large" />
            {challenge.participants.length}명
          </div>
          {challenge.likes.indexOf(user.id) === -1 ? (
            <div style={{ font: "normal 600 1rem/24px Noto Sans KR" }}>
              <Icon
                className="heart outline"
                size="large"
                onClick={handleClick}
              />
              {challenge.likes.length}개
            </div>
          ) : (
            <div style={{ font: "normal 600 1rem/24px Noto Sans KR" }}>
              <Icon
                className="heart"
                color="red"
                size="large"
                onClick={handleDislike}
              />
              {challenge.likes.length}개
            </div>
          )}
        </div>

        <hr className={ChallengeStyles.hr2} />
        <div style={{ margin: "10px 0" }}>
          <div className={DetailStyles.tag}>챌린지 기간</div>
          <div className={DetailStyles.content}>
            {changeDateStr(challenge.startDate, challenge.endDate)}
          </div>
        </div>
        <hr className={ChallengeStyles.hr2} />
        <div>
          {!(challenge.participants.indexOf(user.id) === -1) ? (
            <>
              {challenge.type === "diet" ? (
                <>
                  <div className={DetailStyles.tag}>챌린지 조건</div>
                  <div className={DetailStyles.content}>
                    챌린지 종류 : 다이어트
                  </div>

                  {challenge.diet.kind === "plusKcal" ? (
                    <>
                      <div className={DetailStyles.content}>
                        다이어트 종류 : 벌크업{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={DetailStyles.content}>
                        다이어트 종류 : 컷팅{" "}
                      </div>
                    </>
                  )}
                  <div className={DetailStyles.content}>
                    하루 섭취량 : {challenge.diet.dailyCalorie} Kcal
                  </div>
                  <div className={DetailStyles.content}>
                    다이어트 완료조건 : {challenge.diet.condition}일 작성
                  </div>
                </>
              ) : (
                <>
                  <div className={DetailStyles.tag}>챌린지 조건</div>
                  <div className={DetailStyles.content}>
                    챌린지 종류 : 레시피
                  </div>
                  <div className={DetailStyles.content}>
                    {changeRecipeName()}
                  </div>
                  <div className={DetailStyles.content}>
                    레시피 완료조건 : {challenge.recipe.uploadCount}회 작성
                  </div>
                </>
              )}
              <hr className={ChallengeStyles.hr2} />
              <div className={DetailStyles.tag}> 챌린지 설명</div>
              <div className={DetailStyles.content}>
                {challenge.description}
              </div>
              {challenge.author[0]._id === user.id ? (
                <>
                  <footer className={ChallengeStyles.footer}>
                    {challenge.likes.indexOf(user.id) === -1 ? (
                      <div>
                        <Icon
                          className="heart outline"
                          size="large"
                          onClick={handleClick}
                        />
                      </div>
                    ) : (
                      <div>
                        <Icon
                          className="heart"
                          color="red"
                          size="large"
                          onClick={handleDislike}
                        />
                      </div>
                    )}
                  </footer>
                </>
              ) : (
                <>
                  <>
                    <footer className={ChallengeStyles.footer}>
                      {challenge.likes.indexOf(user.id) === -1 ? (
                        <div
                          style={{
                            fontSize: "16px",
                            position: "relative",
                            bottom: "0.3rem",
                          }}
                        >
                          <Icon
                            className="heart outline"
                            size="large"
                            onClick={handleClick}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            fontSize: "16px",
                            position: "relative",
                            bottom: "0.3rem",
                          }}
                        >
                          <Icon
                            className="heart"
                            color="red"
                            size="large"
                            onClick={handleDislike}
                          />
                        </div>
                      )}
                      <ChallengeCancel
                        user={user}
                        challenge={challenge}
                        setChallenge={setChallenge}
                      />
                    </footer>
                  </>
                </>
              )}
            </>
          ) : (
            <>
              {challenge.type === "diet" ? (
                <>
                  <div className={DetailStyles.tag}>챌린지 조건</div>
                  <div className={DetailStyles.content}>
                    챌린지 종류: 다이어트
                  </div>
                  {challenge.diet.kind === "plusKcal" ? (
                    <>
                      <div className={DetailStyles.content}>
                        다이어트 종류: 벌크업{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={DetailStyles.content}>
                        다이어트 종류: 컷팅{" "}
                      </div>
                    </>
                  )}
                  <div className={DetailStyles.content}>
                    하루 섭취량:{challenge.diet.dailyCalorie} Kcal
                  </div>
                  <div className={DetailStyles.content}>
                    다이어트 완료 조건:{challenge.diet.condition}일 작성
                  </div>
                  <hr className={ChallengeStyles.hr2} />
                  <div className={DetailStyles.tag}> 챌린지 설명</div>
                  <div className={DetailStyles.content}>
                    {challenge.description}
                  </div>
                </>
              ) : (
                <>
                  <div className={DetailStyles.tag}>챌린지 조건</div>
                  <div className={DetailStyles.content}>
                    챌린지 종류: 레시피{" "}
                  </div>
                  <div className={DetailStyles.content}>
                    {changeRecipeName()}
                  </div>
                  <div className={DetailStyles.content}>
                    레시피 완료 조건:{challenge.recipe.uploadCount}회 작성
                  </div>
                  <hr className={ChallengeStyles.hr2} />
                  <div className={DetailStyles.tag}> 챌린지 설명</div>
                  <div className={DetailStyles.content}>
                    {challenge.description}
                  </div>
                </>
              )}

              <footer className={ChallengeStyles.footer}>
                {challenge.likes.indexOf(user.id) === -1 ? (
                  <div
                    style={{
                      fontSize: "16px",
                      position: "relative",
                      bottom: "0.3rem",
                    }}
                  >
                    <Icon
                      className="heart outline"
                      size="large"
                      onClick={handleClick}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "16px",
                      position: "relative",
                      bottom: "0.3rem",
                    }}
                  >
                    <Icon
                      className="heart"
                      color="red"
                      size="large"
                      onClick={handleDislike}
                    />
                  </div>
                )}
                <ChallengeJoin
                  user={user}
                  challenge={challenge}
                  setChallenge={setChallenge}
                />
              </footer>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);
  const challengeId = Number(ctx.query.chal_id);
  const client = await clientPromise;
  console.log(challengeId);
  const challenge = (
    await client
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
      .match({ _id: challengeId })
      .toArray()
  )[0];
  console.log(challenge);

  return {
    props: { originalChallenge: JSON.parse(JSON.stringify(challenge)), user },
  };
};

export default ChallengePage;
