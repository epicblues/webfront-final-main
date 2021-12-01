import React, { useEffect } from "react";

import clientPromise from "../../util/mongodb";
import { getUserOrRedirect } from "../../util/auth";
import CardsSwiper from "../../components/recipe/list/CardsSwiper";

// CSS
import mainStyles from "../../styles/recipe/Main.module.css";

const Index = ({ user, filteredHitRecipes }) => {
  // Y스크롤 막기
  useEffect(() => {
    console.log("스크롤X!!!");
    document.body.style.overflow = "hidden";
  });
  return (
    <div className={mainStyles.container}>
      <CardsSwiper filteredHitRecipes={filteredHitRecipes}></CardsSwiper>
      <div className={mainStyles.content}></div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // 유저 인증 로직
  const user = await getUserOrRedirect(ctx);
  const data = await (
    await clientPromise
  )
    .db("webfront")
    .collection("recipe")
    .aggregate([
      {
        $lookup: {
          from: "user",
          localField: "user_id",
          foreignField: "_id",
          as: "author",
        },
      },
    ])
    .sort({ hit: -1 })
    .limit(5)
    .toArray();
  const filteredHitRecipes = JSON.parse(JSON.stringify(data));

  return { props: { user, filteredHitRecipes } };
};
export default Index;
