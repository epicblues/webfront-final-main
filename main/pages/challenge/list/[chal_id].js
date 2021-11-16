import React from "react";
import { getUserOrRedirect } from "../../../util/auth";
import clientPromise from "../../../util/mongodb";

const ChallengePage = ({ challenge, user }) => {
  console.log(challenge, user);
  return (
    <>
      <div>
        <h2>{challenge.title}</h2>
        <h4 style={{ textAlign: "right", margin: "0" }}>
          시작일: {new Date(challenge.startDate).toLocaleDateString()}
        </h4>
        <h4 style={{ textAlign: "right", margin: "0" }}>
          종료일: {new Date(challenge.endDate).toLocaleDateString()}
        </h4>
        <div>
          {challenge.type === "diet" ? (
            <>
              <h3>작성자:{challenge.author[0].name}</h3>
              <h3>챌린지 조건</h3>
              {challenge.diet.type === "pluskcal" ? (
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
              <h3>레시피 업로드 횟수:{challenge.recipe.uploadCount}</h3>
              <h3>참가자 인원:{challenge.participants.length}</h3>
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

  return { props: { challenge: JSON.parse(JSON.stringify(challenge)), user } };
};

export default ChallengePage;