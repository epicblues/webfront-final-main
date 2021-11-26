import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

//  인증, db연결
import { getUserOrRedirect } from "../../../../util/auth";
import clientPromise from "../../../../util/mongodb";

//  CSS
import recipeListStyles from "../../../../styles/RecipeList.module.css";
import { postStaticAxios } from "../../../../util/axios";
import GoBackward from "../../../../components/GoBackward";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEllipsisV, faEye } from "@fortawesome/free-solid-svg-icons";

const Index = ({ user, filteredRecipes }) => {
  const [recipes, setRecipes] = useState([...filteredRecipes]);

  //  삭제버튼 로직
  const onDeleteBtn = async (data) => {
    if (confirm("정말 삭제하시겠습니까? \n\n확인 (예)  /  취소 (아니오)")) {
      const res = await postStaticAxios("/api/recipe/delete", user.token, {
        recipe_id: data._id,
      });

      console.log(res.data.message);

      alert("삭제하였습니다.");
      setRecipes(
        recipes.filter((recipe) => {
          return recipe._id !== data._id;
        })
      );
    } else {
      alert("취소하였습니다.");
    }
  };

  // recipe.category 필드 한글화
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
      <h1>내 레시피</h1>
      <ul className={recipeListStyles.cards}>
        {recipes.map((card, index) => {
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
                      {/* 수정하기 링크 버튼 */}
                      <Link
                        href={{
                          pathname: `/recipe/update/${card._id}`,
                        }}
                        as={`/recipe/update/${card._id}`}
                        passHref
                      >
                        <a>
                          <button type="button">수정하기</button>
                        </a>
                      </Link>
                      <button type="button" onClick={() => onDeleteBtn(card)}>
                        삭제하기
                      </button>
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
  console.log(user);
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
    .match({ user_id: user.id })
    .limit(9)
    .toArray();
  const filteredRecipes = JSON.parse(JSON.stringify(data));

  return { props: { user, filteredRecipes } };
};

export default Index;
