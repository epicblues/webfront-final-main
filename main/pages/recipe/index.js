import React, { useState } from "react";
import Link from "next/link";
import Image from "next/dist/client/image";

import clientPromise from "../../util/mongodb";
import { getUserOrRedirect } from "../../util/auth";
import CardsSwiper from "../../components/recipe/list/CardsSwiper";

// CSS
import mainStyles from "../../styles/recipe/Main.module.css";
import recipeListStyles from "../../styles/RecipeList.module.css";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEllipsisV, faEye } from "@fortawesome/free-solid-svg-icons";

const Index = ({ user, filteredHitRecipes }) => {
  // 카테고리 값(Int)에 맞는 카테고리명(String) 표시 함수
  function renderSwitchCategory(param) {
    switch (param) {
      case "soup":
        return "국/탕/찌개";
      case "grill":
        return "구이";
      case "noodle":
        return "면/파스타";
      case "rice":
        return "밥/볶음밥";
      case "side":
        return "반찬";
      case "kimchi":
        return "김치";
      case "dessert":
        return "디저트";
      case "etc":
        return "기타";
      default:
        return "몰라용";
    }
  }

  return (
    <div className={mainStyles.container}>
      <CardsSwiper filteredHitRecipes={filteredHitRecipes}></CardsSwiper>
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
