import React, { useState } from "react";
import Link from "next/link";
import Image from "next/dist/client/image";

// import RcpData from "../../public/static/recipe/dataSample/RecipeData";
import clientPromise from "../../util/mongodb";
import { getUserOrRedirect } from "../../util/auth";
import Categories from "../../components/recipe/index/Categories";
import Search from "../../components/recipe/index/Search";

// CSS
import recipeListStyles from "../../styles/RecipeList.module.css";

const Index = ({ user, filteredLatestRecipes, filteredHitRecipes }) => {
  const [showCategories, setShowCategories] = useState(true);

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
    <div>
      {/* 홈 */}
      <h1>Recipe Main</h1>

      {/* 검색창 */}
      <Search />

      {/* 카테고리 검색 */}
      {showCategories ? <Categories /> : null}
      <input
        type="button"
        value={showCategories ? "카테고리 접기" : "카테고리 펼치기 "}
        onClick={() => {
          setShowCategories(showCategories ? false : true);
        }}
      />
      <br />
      <p></p>

      {/* 레시피 등록하기 */}
      <Link passHref href="/recipe/create">
        <button>레시피 등록하기</button>
      </Link>

      {/* 내 레시피 조회 */}
      <Link passHref href="/recipe/list/my">
        <button>내 레시피</button>
      </Link>

      {/* 최신 레시피 */}
      <h3>최신 레시피</h3>
      <ul className={recipeListStyles.cards}>
        {filteredLatestRecipes.map((card, index) => {
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
                    src={
                      process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                      card.steps.slice(-1)[0].image_url
                    }
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

      {/* 인기 레시피 */}
      <h3>인기 레시피</h3>
      <ul className={recipeListStyles.cards}>
        {filteredHitRecipes.map((card, index) => {
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
                    src={
                      process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                      card.steps.slice(-1)[0].image_url
                    }
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
  );
};

export const getServerSideProps = async (ctx) => {
  // 유저 인증 로직
  const user = await getUserOrRedirect(ctx);
  const data1 = await (
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
    .sort({ upload_date: -1 })
    .limit(4)
    .toArray();
  const filteredLatestRecipes = JSON.parse(JSON.stringify(data1));

  const data2 = await (
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
    .limit(4)
    .toArray();
  const filteredHitRecipes = JSON.parse(JSON.stringify(data2));

  return { props: { user, filteredLatestRecipes, filteredHitRecipes } };
};
export default Index;
