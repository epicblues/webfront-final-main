import React from "react";
import Link from "next/link";
import Image from "next/image";

//  인증, db연결
import { getUserOrRedirect } from "../../../../util/auth";
import clientPromise from "../../../../util/mongodb";

//  CSS
import recipeListStyles from "../../../../styles/RecipeList.module.css";

const index = ({ user, filteredRecipes }) => {
  // 카테고리 값(Int)에 맞는 카테고리명(String) 표시 함수
  const onUpdateBtn = () => {};

  const onDeleteBtn = () => {
    if (confirm("정말 삭제하시겠습니까? \n\n확인 (예)  /  취소 (아니오)")) {
      alert("삭제하였습니다.");
    } else {
      alert("취소하였습니다.");
    }
  };

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
      <h1>내 레시피</h1>
      <ul className={recipeListStyles.cards}>
        {filteredRecipes.map((card, index) => {
          return (
            <li key={card._id}>
              <Link
                href={{
                  pathname: `/recipe/card/${card._id}`,
                  query: { props: { card } },
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
              <button type="button">수정하기</button>
              <button type="button" onClick={onDeleteBtn}>
                삭제하기
              </button>
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

export default index;