import React, { useState } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import clientPromise from "../../../../util/mongodb";
import { getUserOrRedirect } from "../../../../util/auth";
import { postStaticAxios } from "../../../../util/axios";

import ModalNutrition from "../../../../components/recipe/card/ModalNutrition";
import { useRouter } from "next/router";

const Index = ({ user, recipe }) => {
  const router = useRouter();
  //  영양정보 Modal 컨트롤
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleSetIsModalVisible = (val) => {
    setIsModalVisible(val);
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

  // recipe.duration 필드 한글화
  function renderSwitchDuration(param) {
    switch (param) {
      case "1":
        return "10분 이내";
      case "2":
        return "10분 ~ 30분";
      case "3":
        return "30분 ~ 1시간";
      case "4":
        return "1시간 ~ 2시간";
      case "5":
        return "2시간 이상";
      default:
        return "몰라용";
    }
  }

  //  삭제버튼 로직
  const onDeleteBtn = async (data) => {
    if (confirm("정말 삭제하시겠습니까? \n\n확인 (예)  /  취소 (아니오)")) {
      const res = await postStaticAxios("/api/recipe/delete", user.token, {
        recipe_id: data._id,
      });
      console.log(res.data.message);
      alert("삭제하였습니다.");
      router.back();
    } else {
      alert("취소하였습니다.");
    }
  };

  return (
    <div>
      <div>
        <Image
          src={
            process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
            recipe.steps.slice(-1)[0].image_url +
            "?date=" +
            recipe.update_date
          }
          width={500}
          height={300}
          alt="main image"
        />
        <p>카테고리: {renderSwitchCategory(recipe.category)}</p>
        <h2>{recipe.title}</h2>
        <p>{recipe.desc}</p>
        <p>기준: {recipe.qtt}인분</p>
        <p>소요시간: {renderSwitchDuration(recipe.duration)}</p>
        {user.id === recipe.user_id && (
          <>
            <Link
              href={{
                pathname: `/recipe/update/${recipe._id}`,
              }}
              as={`/recipe/update/${recipe._id}`}
              passHref
            >
              <a>
                <button type="button">수정하기</button>
              </a>
            </Link>
            <button type="button" onClick={() => onDeleteBtn(recipe)}>
              삭제하기
            </button>
          </>
        )}
        <p>등록일: {recipe.upload_date}</p>
        <p>최종수정일: {recipe.update_date}</p>
        {/* <p>작성자 : {recipe.</p> */}
        <p>조회수: {recipe.hit}</p>
      </div>
      <div>
        <h3>레시피 재료</h3>
        {recipe.ingredients.map((value, index) => {
          return (
            <div key={Math.random()}>
              <span>{value.food.name} </span>
              <span>(제조사: {value.food.mfr}) </span>
              <span>{value.quantity}</span>
              <span>{value.food.unit}</span>
            </div>
          );
        })}
      </div>
      <div>
        <button type="button" onClick={() => handleSetIsModalVisible(true)}>
          영양정보 보기
        </button>
        {isModalVisible && (
          <ModalNutrition
            setIsModalVisible={setIsModalVisible}
            nutritionData={recipe.nutrition}
          />
        )}
      </div>
      <div>
        <h3>만드는 방법</h3>
        {recipe.steps.map((value, index) => {
          return (
            <div key={Math.random()}>
              <p>Step {index + 1}.</p>
              <p>{value.desc}</p>
              <Image
                src={
                  process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                  value.image_url +
                  "?date=" +
                  recipe.update_date
                }
                width={500}
                height={300}
                alt="main image"
              />
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 유저 인증, recipe DB data 요청
export const getServerSideProps = async (ctx) => {
  // 유저 인증 로직
  const client = await clientPromise;
  const user = await getUserOrRedirect(ctx);
  const hitResult = await client
    .db("webfront")
    .collection("recipe")
    .findOneAndUpdate({ _id: Number(ctx.query.post_no) }, { $inc: { hit: 1 } });
  console.log(hitResult);
  const recipe = await client
    .db("webfront")
    .collection("recipe")
    .aggregate([
      {
        $lookup: {
          from: "food",
          localField: "ingredients.food_id",
          foreignField: "no",
          as: "ingredients_data",
        },
      },
    ])
    .match({
      _id: Number(ctx.query.post_no),
    })
    .toArray();

  // .findOne({ _id: Number(ctx.query.post_no) });
  const newRecipe = JSON.parse(JSON.stringify(recipe[0]));
  newRecipe.ingredients.forEach((ingredient, index) => {
    ingredient.food = newRecipe.ingredients_data[index];
  });
  return { props: { user, recipe: newRecipe } };
};
export default Index;
