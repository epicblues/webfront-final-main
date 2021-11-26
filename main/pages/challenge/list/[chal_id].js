import React, { useState } from "react";
import { getUserOrRedirect } from "../../../util/auth";
import clientPromise from "../../../util/mongodb";
import ChallengeJoin from "../../../components/challenge/List/ChallengeJoin";
import ChallengeCancel from "../../../components/challenge/List/ChallengeCancel";
import ChallengeModify from "../../../components/challenge/List/ChallengeModify";
import axios from "axios";

const ChallengePage = ({ originalChallenge, user }) => {
  const [challenge, setChallenge] = useState(originalChallenge);

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
        return <h3>레시피 종류: rlxk</h3>;
      default:
        return <h3>없음</h3>;
    }
  };
  return (
    <>
      <div className="container" style={{ textAlign: "center" }}>
        <h2>{challenge.title}</h2>
        <hr />
        <h3 style={{ textAlign: "right", margin: "10px" }}>
          작성자:{challenge.author[0].name}
        </h3>
        <h3 style={{ textAlign: "right", margin: "5px" }}>
          시작일: {new Date(challenge.startDate).toLocaleDateString()}
          <br />
          종료일:
          {new Date(challenge.endDate).toLocaleDateString()}
        </h3>
        <br />

        <div style={{ margin: "30px" }}>
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
                  <h3>다이어트 완료 일수:{challenge.diet.condition}일</h3>
                  <h3>참가자 인원:{challenge.participants.length}명</h3>
                </>
              ) : (
                <>
                  <h3>챌린지 조건</h3>
                  <h3>챌린지 종류: 레시피</h3>
                  <h3>{changeRecipeName()}</h3>
                  <h3>레시피 업로드 횟수:{challenge.recipe.uploadCount}회</h3>
                  <h3>참가자 인원:{challenge.participants.length}명</h3>
                </>
              )}
              <hr />
              {challenge.author[0]._id === user.id ? (
                <>
                  <ChallengeModify />
                </>
              ) : (
                <>
                  <>
                    <ChallengeCancel
                      user={user}
                      challenge={challenge}
                      setChallenge={setChallenge}
                    />
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
                  <h3>다이어트 완료 일수:{challenge.diet.condition}일</h3>
                  <h3>참가자 인원:{challenge.participants.length}명</h3>
                </>
              ) : (
                <>
                  <h3>챌린지 조건</h3>
                  <h3>챌린지 종류: 레시피 </h3>
                  <h3>{changeRecipeName()}</h3>
                  <h3>레시피 업로드 횟수:{challenge.recipe.uploadCount}회</h3>
                  <h3>참가자 인원:{challenge.participants.length}명</h3>
                </>
              )}
              <hr />
              <ChallengeJoin
                user={user}
                challenge={challenge}
                setChallenge={setChallenge}
              />
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
