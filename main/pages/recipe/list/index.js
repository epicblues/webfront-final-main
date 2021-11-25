// page component '/recipe/list'
// 모든 레시피를 보여주는 리스트

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserOrRedirect } from "../../../util/auth";
import clientPromise from "../../../util/mongodb";
import axios from "axios";
import { debounce } from "../../../util/axios";

import Categories from "../../../components/recipe/index/Categories";
import Search from "../../../components/recipe/index/Search";

//  CSS
import recipeListStyles from "../../../styles/RecipeList.module.css";
import { parseDocumentToObject } from "../../../util/date";
import InfiniteScroll from "react-infinite-scroll-component";

const Index = ({ user, recipes }) => {
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

  const [hasMore, setHasMore] = useState(true);
  const [recipeList, setRecipeList] = useState(recipes);
  const [recipeCounter, setRecipeCounter] = useState(4);

  // 스크롤 내릴 때마다 api로 recipe data 4개씩 요청하는 로직
  // api 응답이 빈 배열일 경우 setHasMore(false)로 endMessage 출력
  const getMoreRecipes = debounce(async () => {
    const { data } = await axios.get(
      "/api/recipe/infiniteScroll/listAll/" + recipeCounter
    );
    console.log(data);
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setRecipeList([...recipeList, ...data]);
      console.log("ONSCROLL!");
      setRecipeCounter(recipeCounter + 4);
    }
  }, 500);

  return (
    <div>
      <Search />
      <Categories />
      <InfiniteScroll
        dataLength={recipeList.length}
        next={getMoreRecipes}
        hasMore={hasMore}
        loader={<h3> 레시피 불러오는 중 ... </h3>}
        endMessage={<h4>모든 레시피를 다 보여드렸어요!</h4>}
      >
        <h1>카테고리 : 전체</h1>
        <div>
          <ul className={recipeListStyles.cards}>
            {recipeList.map((card, index) => {
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
      </InfiniteScroll>
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
    .sort({ upload_date: -1 })
    .limit(4)
    .toArray();
  const recipes = parseDocumentToObject(data);

  return { props: { user, recipes } };
};

export default Index;
