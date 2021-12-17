import { getUserOrRedirect } from "../../../../../util/auth";
import clientPromise from "../../../../../util/mongodb";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { debounce } from "../../../../../util/axios";

// Component
import Navigation from "../../../../../components/recipe/index/Navigation";
// import Categories from "../../../../../components/recipe/index/Categories";
// LikeButton
import LikeButton from "../../../../../components/recipe/LikeButton";
import DislikeButton from "../../../../../components/recipe/DislikeButton";

//CSS
import searchListStyles from "../../../../../styles/recipe/SearchList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { parseDocumentToObject } from "../../../../../util/date";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMouse, faArrowDown } from "@fortawesome/free-solid-svg-icons";

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
  const [hasMore, setHasMore] = useState(true);
  const [recipeList, setRecipeList] = useState(filteredRecipes);
  const [recipeCounter, setRecipeCounter] = useState(recipeList.length);
  useEffect(() => {
    setRecipeList(filteredRecipes);
    setHasMore(true);
  }, [filteredRecipes]);
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
      <Navigation currentURL={`/recipe/list/category/${category}`}></Navigation>
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
        <div className={searchListStyles.container}>
          {recipeList.map((card, index) => {
            return (
              <div key={card._id} className={searchListStyles.card}>
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
                  <div className={searchListStyles.like}>
                    {card.likes.includes(user.id) === true ? (
                      <DislikeButton
                        filterData={setRecipeList}
                        index={index}
                        token={user.token}
                        recipeId={card._id}
                      />
                    ) : (
                      <LikeButton
                        recipeId={card._id}
                        token={user.token}
                        filterData={setRecipeList}
                        index={index}
                      />
                    )}
                  </div>
                </div>
                {/* 카드 바디 */}
                <div className={searchListStyles.cardBodyWrapper}>
                  {/* 카드 바디 헤더 */}
                  <div className={searchListStyles.cardBodyHeader}>
                    <h1 className={searchListStyles.h1}>{card.title}</h1>
                    <div className={searchListStyles.cardBodyAuthor}>
                      <strong>작성자</strong> | {card.author[0].name}
                    </div>
                    <div className={searchListStyles.cardBodyCategory}>
                      <p>#{renderSwitchCategory(card.category)}</p>
                    </div>
                  </div>

                  {/* 카드 바디 본문 */}
                  <div className={searchListStyles.cardBodyMain}>
                    <Link
                      href={{
                        pathname: `/recipe/card/${card._id}`,
                      }}
                      as={`/recipe/card/${card._id}`}
                      passHref
                    >
                      <a>
                        <div className={searchListStyles.cardBodyDesc}>
                          <div className={searchListStyles.cardBodyMouse}>
                            -----
                            <FontAwesomeIcon
                              className={searchListStyles.cardBodyMouse}
                              icon={faArrowDown}
                            />
                            Click!!
                            <FontAwesomeIcon
                              className={searchListStyles.cardBodyMouse}
                              icon={faMouse}
                            />
                            <FontAwesomeIcon
                              className={searchListStyles.cardBodyMouse}
                              icon={faArrowDown}
                            />
                            -----
                          </div>
                          {card.desc}
                        </div>
                      </a>
                    </Link>
                  </div>
                  {/* 카드 바디 푸터 */}
                  <div className={searchListStyles.cardBodyFooter}>
                    <div className={searchListStyles.hr}></div>
                    <div className={searchListStyles.textWrapper}>
                      <span>
                        <FontAwesomeIcon
                          className={searchListStyles.cardIconHit}
                          icon={faEye}
                        />
                        조회{" "}
                        <strong className={searchListStyles.hitSpan}>
                          {card.hit}
                        </strong>
                        회
                      </span>
                      <span className={searchListStyles.cardUploadDate}>
                        {card.upload_date.slice(0, -14)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
