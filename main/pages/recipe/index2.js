import React, { useState } from "react";
import Link from "next/link";
import Image from "next/dist/client/image";

// import RcpData from "../../public/static/recipe/dataSample/RecipeData";
import clientPromise from "../../util/mongodb";
import { getUserOrRedirect } from "../../util/auth";
import Categories from "../../components/recipe/index/Categories";
import Search from "../../components/recipe/index/Search";

// CSS
import containerStyles from "../../styles/recipe/Container.module.css";
import headerStyles from "../../styles/recipe/Header.module.css";
import recipeListStyles from "../../styles/RecipeList.module.css";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEllipsisV, faEye } from "@fortawesome/free-solid-svg-icons";

const Index2 = ({ user, filteredLatestRecipes, filteredHitRecipes }) => {
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
    <div className={containerStyles.container}>
      {/* header */}
      <div className={headerStyles.header}>
        {/* 로고옆에 글쓰기, 내 래시피 버튼 */}
        {/* 검색창 */}
        <Search />

        {/* 레시피 등록하기 */}
        <Link passHref href="/recipe/create">
          <a>
            <FontAwesomeIcon icon={faPen} color="black" size="2x" />
            <p>
              레시피
              <br /> 등록하기
            </p>
          </a>
        </Link>

        {/* 내 레시피 조회 */}
        <Link passHref href="/recipe/list/my">
          <a>
            <FontAwesomeIcon icon={faEllipsisV} color="black" size="2x" />
            <p>내 레시피</p>
          </a>
        </Link>
      </div>

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

      {/* 최신 레시피 */}
      <h3>최신 레시피</h3>
      <ul className={recipeListStyles.cards}>
        {filteredLatestRecipes.map((card, index) => {
          return (
            <li key={card._id} className={recipeListStyles.card}>
              <Link
                href={{
                  pathname: `/recipe/card/${card._id}`,
                }}
                as={`/recipe/card/${card._id}`}
                passHref
              >
                <a>
                  {/* 카드 헤더 (이미지) */}
                  <div className={recipeListStyles.cardHeader}>
                    <Image
                      className={recipeListStyles.cardHeaderImage}
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
                  <div className={recipeListStyles.cardBodyMain}>
                    {/* 카드 바디 헤더 */}
                    <div className={recipeListStyles.cardBodyHeader}>
                      <h1 className={recipeListStyles.h1}>{card.title}</h1>
                      <p className={recipeListStyles.cardBodyCategory}>
                        #{renderSwitchCategory(card.category)}
                      </p>
                      <p className={recipeListStyles.cardBodyAuthor}>
                        작성자: {card.author[0].name}
                      </p>
                    </div>

                    {/* 카드 바디 본문 */}
                    <div className={recipeListStyles.cardBodyMain}>
                      <p className={recipeListStyles.cardBodyDesc}>
                        {card.desc}
                      </p>
                    </div>

                    {/* 카드 바디 푸터 */}
                    <div className={recipeListStyles.cardBodyFooter}>
                      <hr className={recipeListStyles.hr} />
                      <FontAwesomeIcon
                        className={recipeListStyles.cardIconHit}
                        icon={faEye}
                      />
                      <span>조회 {card.hit}회</span>
                      <span className={recipeListStyles.cardUploadDate}>
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

      {/* 인기 레시피 */}
      <h3>인기 레시피</h3>
      <ul className={recipeListStyles.cards}>
        {filteredHitRecipes.map((card, index) => {
          return (
            <li key={card._id} className={recipeListStyles.card}>
              <Link
                href={{
                  pathname: `/recipe/card/${card._id}`,
                }}
                as={`/recipe/card/${card._id}`}
                passHref
              >
                <a>
                  {/* 카드 헤더 (이미지) */}
                  <div className={recipeListStyles.cardHeader}>
                    <Image
                      className={recipeListStyles.cardHeaderImage}
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
                  <div className={recipeListStyles.cardBodyMain}>
                    {/* 카드 바디 헤더 */}
                    <div className={recipeListStyles.cardBodyHeader}>
                      <h1 className={recipeListStyles.h1}>{card.title}</h1>
                      <p className={recipeListStyles.cardBodyCategory}>
                        #{renderSwitchCategory(card.category)}
                      </p>
                      <p className={recipeListStyles.cardBodyAuthor}>
                        작성자: {card.author[0].name}
                      </p>
                    </div>

                    {/* 카드 바디 본문 */}
                    <div className={recipeListStyles.cardBodyMain}>
                      <p className={recipeListStyles.cardBodyDesc}>
                        {card.desc}
                      </p>
                    </div>

                    {/* 카드 바디 푸터 */}
                    <div className={recipeListStyles.cardBodyFooter}>
                      <hr className={recipeListStyles.hr} />
                      <FontAwesomeIcon
                        className={recipeListStyles.cardIconHit}
                        icon={faEye}
                      />
                      <span>조회 {card.hit}회</span>
                      <span className={recipeListStyles.cardUploadDate}>
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
export default Index2;
