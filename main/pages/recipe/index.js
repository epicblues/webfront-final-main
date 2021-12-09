import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import clientPromise from "../../util/mongodb";
import { getUserOrRedirect } from "../../util/auth";

// Component
import CardsSwiper from "../../components/recipe/list/CardsSwiper";
import Navigation from "../../components/recipe/index/Navigation";
import MyDashboard from "../../components/recipe/index/MyDashboard";

// CSS
import mainStyles from "../../styles/recipe/Main.module.css";

const Index = ({ user, filteredHitRecipes, myRecipes }) => {
  let tempData = 0;
  for (let key in myRecipes) {
    tempData += myRecipes[key].hit;
  }
  const [totalHit, setTotalHit] = useState(tempData);
  const [currentURL, setCurrentURL] = useState("/recipe");

  // 현재 URL 참조하기 위한 useRouter
  const router = useRouter();
  useEffect(() => {
    setCurrentURL(router.pathname);
  });

  return (
    <div className={mainStyles.container}>
      <Head>
        <title>요건 다 내꺼! - 레시피</title>
      </Head>
      <Navigation currentURL={currentURL}></Navigation>
      <CardsSwiper
        user={user}
        filteredHitRecipesProps={filteredHitRecipes}
      ></CardsSwiper>
      <MyDashboard
        countMyRecipes={myRecipes.length}
        totalHit={totalHit}
      ></MyDashboard>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // 유저 인증 로직
  const client = await clientPromise;
  const user = await getUserOrRedirect(ctx);
  const data1 = await client
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

  const data2 = await client
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
    .match({ user_id: user.id })
    .toArray();

  const filteredHitRecipes = JSON.parse(JSON.stringify(data1));
  const myRecipes = JSON.parse(JSON.stringify(data2));

  return { props: { user, filteredHitRecipes, myRecipes } };
};
export default Index;
