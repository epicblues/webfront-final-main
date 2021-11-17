import React, { useState } from "react";
import { getUserOrRedirect } from "../../../util/auth";
import clientPromise from "../../../util/mongodb";
import ChallengeJoin from "../../../components/challenge/List/ChallengeJoin";
import ChallengeCancel from "../../../components/challenge/List/ChallengeCancel";

const ChallengePage = ({ originalChallenge, user }) => {
  const [challenge, setChallenge] = useState(originalChallenge);
  return (
    <>
      <div className="container">
        <h2>{challenge.title}</h2>
        <h4 style={{ textAlign: "right", margin: "0" }}>
          시작일: {new Date(challenge.startDate).toLocaleDateString()}
        </h4>
        <h4 style={{ textAlign: "right", margin: "0" }}>
          종료일: {new Date(challenge.endDate).toLocaleDateString()}
        </h4>
        <div>
          {!(challenge.participants.indexOf(user.id) === -1) ? (
            <>
              {challenge.type === "diet" ? (
                <>
                  <h3>작성자:{challenge.author[0].name}</h3>
                  <h3>챌린지 조건</h3>
                  {challenge.diet.kind === "pluskcal" ? (
                    <>
                      <h3>다이어트 종류: 벌크업 </h3>
                    </>
                  ) : (
                    <>
                      <h3>다이어트 종류: 컷팅 </h3>
                    </>
                  )}
                  <h3>하루 섭취량:{challenge.diet.dailyCalorie}Kcal</h3>
                  <h3>다이어트 성공 일수:{challenge.diet.condition}</h3>
                  <h3>참가자 인원:{challenge.participants.length}</h3>
                </>
              ) : (
                <>
                  <h3>작성자:{challenge.author[0].name}</h3>
                  <h3>챌린지 조건</h3>
                  <h3>레시피 종류:{challenge.recipe.kind}</h3>
                  <h3>레시피 업로드 횟수:{challenge.recipe.uploadCount}회</h3>
                  <h3>참가자 인원:{challenge.participants.length}명</h3>
                </>
              )}
              <ChallengeCancel />
            </>
          ) : (
            <>
              {challenge.type === "diet" ? (
                <>
                  <h3>작성자:{challenge.author[0].name}</h3>
                  <h3>챌린지 조건</h3>
                  {challenge.diet.kind === "pluskcal" ? (
                    <>
                      <h3>다이어트 종류: 벌크업 </h3>
                    </>
                  ) : (
                    <>
                      <h3>다이어트 종류: 컷팅 </h3>
                    </>
                  )}
                  <h3>하루 섭취량:{challenge.diet.dailyCalorie}Kcal</h3>
                  <h3>다이어트 성공 일수:{challenge.diet.condition}</h3>
                  <h3>참가자 인원:{challenge.participants.length}</h3>
                </>
              ) : (
                <>
                  <h3>작성자:{challenge.author[0].name}</h3>
                  <h3>챌린지 조건</h3>
                  <h3>레시피 종류:{challenge.recipe.kind}</h3>
                  <h3>레시피 업로드 횟수:{challenge.recipe.uploadCount}회</h3>
                  <h3>참가자 인원:{challenge.participants.length}명</h3>
                </>
              )}
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
