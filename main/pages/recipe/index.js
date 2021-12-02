import React from "react";
import Head from "next/head";

import clientPromise from "../../util/mongodb";
import { getUserOrRedirect } from "../../util/auth";

// Component
import CardsSwiper from "../../components/recipe/list/CardsSwiper";
import Navigation from "../../components/recipe/index/Navigation";

// CSS
import mainStyles from "../../styles/recipe/Main.module.css";

const Index = ({ user, filteredHitRecipes }) => {
  return (
    <div className={mainStyles.container}>
      <Head>
        <title>요건 다 내꺼! - 레시피</title>
      </Head>
      <Navigation></Navigation>
      <div className={mainStyles.hitWrapper}>
        <CardsSwiper filteredHitRecipes={filteredHitRecipes}></CardsSwiper>
      </div>
      <div className={mainStyles.content}>asd</div>
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
