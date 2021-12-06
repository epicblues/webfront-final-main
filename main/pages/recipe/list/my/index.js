import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

//  인증, db연결
import { getUserOrRedirect } from "../../../../util/auth";
import clientPromise from "../../../../util/mongodb";

//  CSS
import myRecipeStyles from "../../../../styles/recipe/MyRecipe.module.css";
import { postStaticAxios } from "../../../../util/axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import MyNavigation from "../../../../components/recipe/list/MyNavigation";

const Index = ({ user, filteredRecipes }) => {
  const [recipes, setRecipes] = useState([...filteredRecipes]);
  const [activeIndex, setActiveIndex] = useState(0);

  function switchViewByIndex(param) {
    switch (param) {
      case 0:
        return (
          <div className={myRecipeStyles.container}>
            {recipes.map((card, index) => {
              return (
                <div key={card._id} className={myRecipeStyles.card}>
                  {/* 카드 헤더 (이미지) */}
                  <Link
                    href={{
                      pathname: `/recipe/card/${card._id}`,
                    }}
                    as={`/recipe/card/${card._id}`}
                    passHref
                  >
                    <a>
                      <div className={myRecipeStyles.cardHeader}>
                        <Image
                          className={myRecipeStyles.cardHeaderImage}
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
                    </a>
                  </Link>

                  {/* 카드 바디 */}
                  <div className={myRecipeStyles.cardBodyMain}>
                    {/* 카드 바디 헤더 */}
                    <div className={myRecipeStyles.cardBodyHeader}>
                      <Link
                        href={{
                          pathname: `/recipe/card/${card._id}`,
                        }}
                        as={`/recipe/card/${card._id}`}
                        passHref
                      >
                        <a>
                          <p className={myRecipeStyles.h1}>{card.title}</p>
                          <p className={myRecipeStyles.cardBodyCategory}>
                            #{renderSwitchCategory(card.category)}
                          </p>
                        </a>
                      </Link>
                      {/* 수정하기 링크 버튼 */}
                      <Link
                        href={{
                          pathname: `/recipe/update/${card._id}`,
                        }}
                        as={`/recipe/update/${card._id}`}
                        passHref
                      >
                        <a>
                          <div className={myRecipeStyles.btnUpdate}>수정</div>
                        </a>
                      </Link>
                      <div
                        className={myRecipeStyles.btnDel}
                        onClick={(e) => {
                          e.preventDefault();
                          onDeleteBtn(card);
                        }}
                      >
                        삭제
                      </div>
                    </div>

                    {/* 카드 바디 푸터 */}
                    <div className={myRecipeStyles.cardBodyFooter}>
                      <div className={myRecipeStyles.hr} />
                      <p className={myRecipeStyles.hitCount}>
                        <FontAwesomeIcon
                          className={myRecipeStyles.cardIconHit}
                          icon={faEye}
                        />
                        조회 {card.hit}회
                      </p>
                      <p className={myRecipeStyles.cardUploadDate}>
                        {card.upload_date.slice(0, -14)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      case 1:
        return (
          <div className={myRecipeStyles.containerList}>
            <table className={myRecipeStyles.tableContainer}>
              <tr className={myRecipeStyles.itemWrapper}>
                <th>번호</th>
                <th>카테고리</th>
                <th>제목</th>
                <th>조회수</th>
                <th>작성일</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
              {recipes.map((card, index) => {
                return (
                  <tr key={card._id} className={myRecipeStyles.itemWrapper}>
                    <td>{card._id}</td>
                    <td>{renderSwitchCategory(card.category)}</td>
                    <td>{card.title}</td>
                    <td>{card.hit}</td>
                    <td>{card.upload_date.slice(0, -14)}</td>
                    <td>
                      <Link
                        href={{
                          pathname: `/recipe/update/${card._id}`,
                        }}
                        as={`/recipe/update/${card._id}`}
                        passHref
                      >
                        <a>
                          <div className={myRecipeStyles.btnUpdate}>수정</div>
                        </a>
                      </Link>
                    </td>
                    <td>
                      <div
                        className={myRecipeStyles.btnDel}
                        onClick={(e) => {
                          e.preventDefault();
                          onDeleteBtn(card);
                        }}
                      >
                        삭제
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        );
    }
  }

  const onTabBtn = (param) => {
    setActiveIndex(param);
  };

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
    <div className={myRecipeStyles.main}>
      <MyNavigation
        onTabBtn={onTabBtn}
        activeIndex={activeIndex}
      ></MyNavigation>
      {switchViewByIndex(activeIndex)}
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
    .toArray();
  const filteredRecipes = JSON.parse(JSON.stringify(data));

  return { props: { user, filteredRecipes } };
};

export default Index;
