import { getUserOrRedirect } from "../../../../../util/auth";
import clientPromise from "../../../../../util/mongodb";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import Categories from "../../../../../components/recipe/index/Categories";
import Search from "../../../../../components/recipe/index/Search";

//CSS
import recipeListStyles from "../../../../../styles/recipe/RecipeList.module.css";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <div>
      <GoBackward />
      <Search />
      <Categories />
      <h1>카테고리 : {renderSwitchCategory(category)}</h1>
      <div>
        <ul className={recipeListStyles.cards}>
          {filteredRecipes.map((card, index) => {
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
    .limit(9)
    .toArray();
  const filteredRecipes = JSON.parse(JSON.stringify(data));

  return { props: { user, filteredRecipes, category } };
};

export default Index;
