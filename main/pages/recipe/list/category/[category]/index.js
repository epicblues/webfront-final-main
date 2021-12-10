import { getUserOrRedirect } from "../../../../../util/auth";
import clientPromise from "../../../../../util/mongodb";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { debounce } from "../../../../../util/axios";

import Categories from "../../../../../components/recipe/index/Categories";

//CSS
import searchListStyles from "../../../../../styles/recipe/SearchList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { parseDocumentToObject } from "../../../../../util/date";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../../../../../components/recipe/index/Navigation";
import loader from "../../../../../public/static/logos/logo04.png";

const Index = ({ user, filteredRecipes, category }) => {
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
  useEffect(() => {
    setRecipeList(filteredRecipes);
  }, [filteredRecipes]);
  const [hasMore, setHasMore] = useState(true);
  const [recipeList, setRecipeList] = useState(filteredRecipes);
  const [recipeCounter, setRecipeCounter] = useState(recipeList.length);

  const getMoreRecipes = debounce(async () => {
    const { data } = await axios.get(
      `/api/recipe/infiniteScroll/counter?category=${category}&recipeCounter=` +
        recipeCounter
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
    <div className={searchListStyles.main}>
      <Navigation currentURL={"/recipe/list"}></Navigation>
      <Categories currentURL={`/recipe/list/category/${category}`} />
      <h1>분류 : {renderSwitchCategory(category)}</h1>
      <InfiniteScroll
        dataLength={recipeList.length}
        next={getMoreRecipes}
        hasMore={hasMore}
        loader={
          <div className={searchListStyles.loader}>
            <p>불러오는 중.....⏳</p>
            <Image width="50px" height="50px" src={loader} alt="logo03" />
          </div>
        }
        endMessage={
          <div className={searchListStyles.loader}>
            <h4>✔모든 레시피를 다 보여드렸어요✔</h4>
          </div>
        }
      >
        <div>
          <ul className={searchListStyles.cards}>
            {recipeList.map((card, index) => {
              return (
                <li key={card._id} className={searchListStyles.card}>
                  <Link
                    href={{
                      pathname: `/recipe/card/${card._id}`,
                    }}
                    as={`/recipe/card/${card._id}`}
                    passHref
                  >
                    <a>
                      {/* 카드 헤더 (이미지) */}
                      <div className={searchListStyles.cardHeader}>
                        <Image
                          className={searchListStyles.cardHeaderImage}
                          src={
                            process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                            card.steps.slice(-1)[0].image_url
                          }
                          layout="fill"
                          objectFit="cover"
                          objectPosition="top"
                          alt="thumbnail image"
                        />
                      </div>
                      {/* 카드 바디 */}
                      <div className={searchListStyles.cardBodyMain}>
                        {/* 카드 바디 헤더 */}
                        <div className={searchListStyles.cardBodyHeader}>
                          <h1 className={searchListStyles.h1}>{card.title}</h1>
                          <p className={searchListStyles.cardBodyCategory}>
                            #{renderSwitchCategory(card.category)}
                          </p>
                          <p className={searchListStyles.cardBodyAuthor}>
                            작성자: {card.author[0].name}
                          </p>
                        </div>

                        {/* 카드 바디 본문 */}
                        <div className={searchListStyles.cardBodyMain}>
                          <p className={searchListStyles.cardBodyDesc}>
                            {card.desc}
                          </p>
                        </div>

                        {/* 카드 바디 푸터 */}
                        <div className={searchListStyles.cardBodyFooter}>
                          <hr className={searchListStyles.hr} />
                          <FontAwesomeIcon
                            className={searchListStyles.cardIconHit}
                            icon={faEye}
                          />
                          <span>조회 {card.hit}회</span>
                          <span className={searchListStyles.cardUploadDate}>
                            {card.upload_date.slice(0, -14)}
                          </span>
                        </div>
                      </div>
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
  const category = ctx.query.category;

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
    .match({ category })
    .sort({ upload_date: -1 })
    .limit(4)
    .toArray();
  const filteredRecipes = parseDocumentToObject(data);

  return { props: { user, filteredRecipes, category } };
};

export default Index;
