// page component '/recipe/list'
// 모든 레시피를 보여주는 리스트

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserOrRedirect } from "../../../util/auth";
import clientPromise from "../../../util/mongodb";

import Categories from "../../../components/recipe/index/Categories";
import Search from "../../../components/recipe/index/Search";

//  CSS
import recipeListStyles from "../../../styles/RecipeList.module.css";

const index = ({ user, recipes }) => {
  //  카테고리 값(Int)에 맞는 카테고리명(String) 표시 함수
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
    <div>
      <Search />
      <Categories />
      <h1>카테고리 : 전체</h1>
      <div>
        <ul className={recipeListStyles.cards}>
          {recipes.map((card, index) => {
            return (
              <li key={card._id}>
                <Link
                  href={{
                    pathname: `/recipe/card/${card._id}`,
                  }}
                  as={`/recipe/card/${card._id}`}
                  passHref
                >
                  <a>
                    <Image
                      src={user.url + card.steps.slice(-1)[0].image_url}
                      width={100}
                      height={100}
                      alt="thumbnail image"
                    />
                    <p>{card.title}</p>
                    <p>카테고리: {renderSwitchCategory(card.category)}</p>
                    <p>작성자: {card.author[0].name}</p>
                    <p>조회수: {card.hit}</p>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
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
    .limit(9)
    .toArray();
  const recipes = JSON.parse(JSON.stringify(data));

  return { props: { user, recipes } };
};

export default index;
