import React, { useState, MouseEventHandler } from "react";
import { getUserOrRedirect } from "../../../util/auth";
import clientPromise from "../../../util/mongodb";
import { patchStaticAxios, postStaticAxios } from "../../../util/axios";
//component
import ChallengeJoin from "../../../components/challenge/List/ChallengeJoin";
import ChallengeCancel from "../../../components/challenge/List/ChallengeCancel";

//css
import { Image } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "semantic-ui-react";
import ChallengeStyles from "../../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../../styles/challenge/Input.module.css";
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

  const countChallengeDate = () => {
    const weeks = Math.round(challenge.dateDiff / 7);
    if (challenge.dateDiff < 7) {
      return <div>{challenge.dateDiff}일</div>;
    } else {
      return <div>{weeks}주</div>;
    }
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
        return <h3>레시피 종류: 면/파스타</h3>;
      case "soup":
        return <h3>레시피 종류: 국/탕/찌개</h3>;
      case "dessert":
        return <h3>레시피 종류: 디저트</h3>;
      case "rice":
        return <h3>레시피 종류: 밥/볶음밥</h3>;
      case "kimchi":
        return <h3>레시피 종류: 김치</h3>;
      case "grill":
        return <h3>레시피 종류: 구이</h3>;
      case "etc":
        return <h3>레시피 종류: 기타</h3>;
      default:
        return <h3>없음</h3>;
    }
  };
  return (
    <>
      <div className="container">
        <div style={{ margin: "0" }}>
          <FontAwesomeIcon
            icon={faAngleDoubleLeft}
            className={ImageStyle.image4}
            onClick={() => router.back()}
          />
        </div>
        <div className="image">
          <Image
            className={ImageStyle.mImage}
            src={process.env.NEXT_PUBLIC_STATIC_SERVER_URL + challenge.image}
            layout="fill"
          />
        </div>
        <br />
        <h2>{challenge.title}</h2>
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              width: "36px",
              borderRadius: "0.3rem",
              textAlign: "center",
              backgroundColor: "lightgrey",
              margin: "0 10px",
            }}
          >
            {countChallengeDate()}
          </div>
          <div
            style={{ fontSize: "16px", fontWeight: "bold", marginRight: "5px" }}
          >
            <FontAwesomeIcon icon={faUser} className={ImageStyle.image3} />
            {challenge.participants.length}명
          </div>
          {challenge.likes.indexOf(user.id) === -1 ? (
            <div style={{ fontSize: "16px" }}>
              <Icon
                className="heart outline"
                size="large"
                onClick={handleClick}
              />
              {challenge.likes.length}
            </div>
          ) : (
            <div style={{ fontSize: "16px" }}>
              <Icon
                className="heart"
                color="red"
                size="large"
                onClick={handleDislike}
              />
              {challenge.likes.length}
            </div>
          )}
        </div>

        <hr className={ChallengeStyles.hr2} />
        <div style={{ margin: "10px 0" }}>
          <h3 className={ChallengeStyles.h3Mt}>챌린지 기간</h3>
          <h3>{changeDateStr(challenge.startDate, challenge.endDate)}</h3>
        </div>
        <hr className={ChallengeStyles.hr2} />
        <div>
          {!(challenge.participants.indexOf(user.id) === -1) ? (
            <>
              {challenge.type === "diet" ? (
                <>
                  <h3>챌린지 조건</h3>
                  <h3>챌린지 종류: 다이어트</h3>

                  {challenge.diet.kind === "plusKcal" ? (
                    <>
                      <h3>다이어트 종류: 벌크업 </h3>
                    </>
                  ) : (
                    <>
                      <h3>다이어트 종류: 컷팅 </h3>
                    </>
                  )}
                  <h3>하루 섭취량:{challenge.diet.dailyCalorie} Kcal</h3>
                  <h3>다이어트 완료 조건:{challenge.diet.condition}일</h3>
                </>
              ) : (
                <>
                  <h3>챌린지 조건</h3>
                  <h3>챌린지 종류: 레시피</h3>
                  <h3>{changeRecipeName()}</h3>
                  <h3>레시피 완료 조건:{challenge.recipe.uploadCount}회</h3>
                </>
              )}
              <hr />
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
                    {/* <ChallengeCancel
                      user={user}
                      challenge={challenge}
                      setChallenge={setChallenge}
                    /> */}
                  </footer>
                </>
              ) : (
                <>
                  <>
                    <footer className={ChallengeStyles.footer}>
                      {challenge.likes.indexOf(user.id) === -1 ? (
                        <div style={{ fontSize: "16px" }}>
                          <Icon
                            className="heart outline"
                            size="large"
                            onClick={handleClick}
                          />
                          {challenge.likes.length}
                        </div>
                      ) : (
                        <div style={{ fontSize: "16px" }}>
                          <Icon
                            className="heart"
                            color="red"
                            size="large"
                            onClick={handleDislike}
                          />
                          {challenge.likes.length}
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
                  <h3>챌린지 조건</h3>
                  <h3>챌린지 종류: 다이어트</h3>
                  {challenge.diet.kind === "plusKcal" ? (
                    <>
                      <h3>다이어트 종류: 벌크업 </h3>
                    </>
                  ) : (
                    <>
                      <h3>다이어트 종류: 컷팅 </h3>
                    </>
                  )}
                  <h3>하루 섭취량:{challenge.diet.dailyCalorie} Kcal</h3>
                  <h3>다이어트 완료 조건:{challenge.diet.condition}일</h3>
                  <h3>참가자 인원:{challenge.participants.length}명</h3>
                </>
              ) : (
                <>
                  <h3>챌린지 조건</h3>
                  <h3>챌린지 종류: 레시피 </h3>
                  <h3>{changeRecipeName()}</h3>
                  <h3>레시피 완료 조건:{challenge.recipe.uploadCount}회</h3>
                </>
              )}
              <hr />
              <footer className={ChallengeStyles.footer}>
                {challenge.likes.indexOf(user.id) === -1 ? (
                  <div style={{ fontSize: "16px" }}>
                    <Icon
                      className="heart outline"
                      size="large"
                      onClick={handleClick}
                    />
                    {challenge.likes.length}
                  </div>
                ) : (
                  <div style={{ fontSize: "16px" }}>
                    <Icon
                      className="heart"
                      color="red"
                      size="large"
                      onClick={handleDislike}
                    />
                    {challenge.likes.length}
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
