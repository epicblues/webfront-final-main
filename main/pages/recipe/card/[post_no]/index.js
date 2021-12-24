import React, { useState } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import clientPromise from "../../../../util/mongodb";
import { getUserOrRedirect } from "../../../../util/auth";
import { postStaticAxios } from "../../../../util/axios";

import ModalNutrition from "../../../../components/recipe/card/ModalNutrition";
import { useRouter } from "next/router";

import cardStyles from "../../../../styles/recipe/Card.module.css";
import LikeButtonCard from "../../../../components/recipe/card/LikeButtonCard";
import DislikeButtonCard from "../../../../components/recipe/card/DislikeButtonCard";

const Index = ({ user, recipe }) => {
  const router = useRouter();
  //  영양정보 Modal 컨트롤
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleSetIsModalVisible = (val) => {
    setIsModalVisible(val);
  };
  const [recipeData, setRecipeData] = useState(recipe);

  const totalQtt = recipe.ingredients.reduce(function (prev, next) {
    return prev + next.quantity;
  }, 0);

  // Slice()를 위한 데이터 할당
  const uploadDate = recipe.upload_date;
  const updateDate = recipe.update_date;

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
      alert("삭제하였습니다.");
      router.back();
    } else {
      alert("취소하였습니다.");
    }
  };

  return (
    <div className={cardStyles.container}>
      <div className={cardStyles.thumbnail}>
        <Image
          src={
            process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
            recipe.steps.slice(-1)[0].image_url +
            "?date=" +
            recipe.update_date
          }
          layout="fill"
          alt="main image"
          objectFit="cover"
        />
      </div>
      <div className={cardStyles.header}>
        {user.id === recipe.user_id && (
          <div className={cardStyles.btnUpdateAndDelete}>
            <Link
              href={{
                pathname: `/recipe/update/${recipe._id}`,
              }}
              as={`/recipe/update/${recipe._id}`}
              passHref
            >
              <a>
                <div className={cardStyles.btn} type="button">
                  <span>수정</span>
                </div>
              </a>
            </Link>
            <div className={cardStyles.btn} onClick={() => onDeleteBtn(recipe)}>
              <span>삭제</span>
            </div>
          </div>
        )}
        <p className={cardStyles.author}>
          <i className="pencil alternate icon"></i>작성자:{" "}
          {recipe.author[0].name}
        </p>
        <div className={cardStyles.bodyHeader}>
          <p className={cardStyles.category}>
            #{renderSwitchCategory(recipe.category)}
          </p>
          <p className={cardStyles.hit}>
            <i className="eye icon"></i>조회수: {recipe.hit}
          </p>
        </div>
        <h2 className={cardStyles.title}>{recipe.title}</h2>
        <p className={cardStyles.desc}>{recipe.desc}</p>
        <div className={cardStyles.date}>
          <p className={cardStyles.uploadDate}>
            <i className="calendar alternate outline icon"></i>
            등록일: {uploadDate.slice(0, -14)}
          </p>
          <p className={cardStyles.updateDate}>
            {updateDate ? `(최종수정: ${updateDate.slice(0, -14)})` : null}
          </p>
        </div>
        <div className={cardStyles.hr}></div>
        <div className={cardStyles.infoWrapper}>
          <div className={cardStyles.infoTitle}>분량</div>
          <div className={cardStyles.infoTitle}>조리시간</div>
          <div className={cardStyles.infoTitle}>
            좋아요
            <br />
            (Click!)
          </div>
          <div className={cardStyles.qtt}>{recipe.qtt}인분</div>
          <div className={cardStyles.duration}>
            {renderSwitchDuration(recipe.duration)}
          </div>
          <div className={cardStyles.likesWrapper}>
            {recipeData.likes.includes(user.id) === true ? (
              <DislikeButtonCard
                setRecipeData={setRecipeData}
                token={user.token}
                user={user}
                recipe={recipeData}
              />
            ) : (
              <LikeButtonCard
                setRecipeData={setRecipeData}
                token={user.token}
                user={user}
                recipe={recipeData}
              />
            )}
            <div className={cardStyles.likesCount}>
              {recipeData.likes.length}개
            </div>
          </div>
        </div>
      </div>
      <div className={cardStyles.igrContainer}>
        <h3>레시피 재료</h3>
        {recipe.ingredients.map((value, index) => {
          return (
            <div className={cardStyles.igrWrapper} key={Math.random()}>
              <span>
                {index + 1}. {value.food.name}{" "}
              </span>
              <span>{value.quantity}</span>
              <span>{value.food.unit}</span>
              <span>
                {" "}
                / {value.food.mfr === "전국(대표)" ? "일반" : value.food.mfr}
              </span>
            </div>
          );
        })}
      </div>
      <div
        className={cardStyles.modalBtn}
        onClick={() => handleSetIsModalVisible(!isModalVisible)}
      >
        <div>영양정보 보기</div>
        <div>
          {isModalVisible ? (
            <i className="big caret up icon"></i>
          ) : (
            <i className="big caret down icon"></i>
          )}
        </div>
      </div>
      {isModalVisible && (
        <ModalNutrition
          totalQtt={totalQtt}
          setIsModalVisible={setIsModalVisible}
          nutritionData={recipe.nutrition}
        />
      )}
      <div className={cardStyles.stepsContainer}>
        <h3>만드는 방법</h3>
        {recipe.steps.map((value, index) => {
          return (
            <div className={cardStyles.stepWrapper} key={Math.random()}>
              <div className={cardStyles.stepNo}>Step {index + 1}</div>
              <p>{value.desc}</p>
              <div className={cardStyles.stepImg}>
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                    value.image_url +
                    "?date=" +
                    recipe.update_date
                  }
                  layout="fill"
                  alt="main image"
                  objectFit="cover"
                />
              </div>
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
      {
        $lookup: {
          from: "user",
          localField: "user_id",
          foreignField: "_id",
          as: "author",
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
