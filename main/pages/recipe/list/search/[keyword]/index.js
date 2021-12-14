import { getUserOrRedirect } from "../../../../../util/auth";
import clientPromise from "../../../../../util/mongodb";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Component
import Navigation from "../../../../../components/recipe/index/Navigation";
// LikeButton
import LikeButton from "../../../../../components/recipe/LikeButton";
import DislikeButton from "../../../../../components/recipe/DislikeButton";
//  CSS
import searchListStyles from "../../../../../styles/recipe/SearchList.module.css";
import { parseDocumentToObject } from "../../../../../util/date";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMouse, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Index = ({ user, filteredRecipes, keyword }) => {
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
  const [recipeList, setRecipeList] = useState(filteredRecipes);

  const [currentURL, setCurrentURL] = useState("/recipe/list/search");
  return (
    <div className={searchListStyles.main}>
      <Navigation currentURL={currentURL}></Navigation>
      <h1>검색어 : {keyword}</h1>
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
                  <p className={searchListStyles.cardBodyAuthor}>
                    <strong>작성자</strong> | {card.author[0].name}
                  </p>
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
                      <p className={searchListStyles.cardBodyDesc}>
                        <p className={searchListStyles.cardBodyMouse}>
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
                        </p>
                        {card.desc}
                      </p>
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
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const keyword = ctx.query.keyword;

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
    .match({ title: { $regex: keyword } })
    .limit(9)
    .toArray();
  const filteredRecipes = parseDocumentToObject(data);
  return { props: { user, filteredRecipes, keyword } };
};

export default Index;
