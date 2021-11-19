import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { postStaticAxios } from "../../../../util/axios";
import clientPromise from "../../../../util/mongodb";
import { getUserOrRedirect } from "../../../../util/auth";

import MeasuringModal from "../../../../components/recipe/create/food/MeasuringModal";
import MeasuringModalBlackout from "../../../../components/recipe/create/food/MeasuringModalBlackout";
import AddFoodModalBlackout from "../../../../components/recipe/create/food/AddFoodModalBlackout";

import FoodForm from "../../../../components/recipe/create/food/FoodForm";
import StepForm from "../../../../components/recipe/create/step/StepForm";
import GoBackward from "../../../../components/GoBackward";

const Index = ({ user, recipe }) => {
  //  계량 팁 Modal, 렌더링 로직
  const [isMeasuringModalVisible, setIsMeasuringModalVisible] = useState(true);
  const handleSetIsMeasuringModalVisible = (active) => {
    setIsMeasuringModalVisible(active);
  };

  //  음식 추가 Modal, 렌더링 로직
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleSetIsModalVisible = (active) => {
    setIsModalVisible(active);
  };
  const router = useRouter();

  //  기존 데이터가 있다면 데이터 키를 변경 통일하여 정제 하는 로직
  const exFoodData = recipe.ingredients;
  const configuredExFoodData =
    exFoodData.length == 0
      ? []
      : exFoodData.map((value) => {
          return {
            foodObj: value.food,
            food_id: value.food_id,
            quantity: value.quantity,
          };
        });
  const [foodData, setFoodData] = useState(configuredExFoodData); //  재료 데이터
  const [stepData, setStepData] = useState(recipe.steps); //  요리순서 데이터

  const [nutritionData, setNutritionData] = useState(recipe.nutrition);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitBtnClick = async (data) => {
    if (foodData.length === 0) {
      alert("재료를 입력해주세요");
    } else if (stepData.length === 0) {
      alert("순서 사진을 최소 1개 이상 등록해주세요.");
    } else {
      const date = new Date();

      let finalRecipeData = {
        recipe_id: recipe._id,
        upload_date: recipe.upload_date,
        update_date: date,
        title: data.title,
        desc: data.desc,
        hit: recipe.hit,
        category: data.category,
        qtt: Number(data.qtt),
        totalNutrition: JSON.stringify(nutritionData), //  레시피 칼로리 총합
        duration: data.duration,
        igr_array: foodData.map((food) => {
          return `${food.foodObj.no}/${food.quantity}`;
        }), //  음식(재료) 객체의 배열
        stepData: JSON.stringify(
          stepData.map((step) => {
            return step.desc ? { desc: step.desc } : { desc: step.stepDesc };
          })
        ),
      };

      const formData = new FormData();
      for (let key in finalRecipeData) {
        formData.append(key, finalRecipeData[key]);
      }
      stepData.forEach((step, index) => {
        formData.append(
          `step_img_${index + 1}`,
          step.image_url ? step.image_url : step.stepImageFile
        );
      });
      // for (let key of formData.keys()) {
      //   console.log(key);
      // }
      // for (let value of formData.values()) {
      //   console.log(value);
      // }

      try {
        await postStaticAxios("/api/recipe/update", user.token, formData);
        router.push(`/recipe/card/${recipe._id}`);
      } catch (error) {
        alert(error);
      }
    }
  };
  return (
    <div>
      <GoBackward />
      {isMeasuringModalVisible && (
        <>
          <MeasuringModal
            setIsMeasuringModalVisible={setIsMeasuringModalVisible}
          />
          <MeasuringModalBlackout
            handleSetIsMeasuringModalVisible={handleSetIsMeasuringModalVisible}
          />
        </>
      )}
      {isModalVisible && (
        <AddFoodModalBlackout
          handleSetIsModalVisible={handleSetIsModalVisible}
        />
      )}
      <h2>레시피 수정하기</h2>
      <h3>레시피 정보 입력</h3>
      <form onSubmit={handleSubmit(submitBtnClick)}>
        <label htmlFor="title">요리명</label>
        <input
          autoFocus={true}
          id="title"
          type="text"
          placeholder=" ex) 소고기 미역국"
          defaultValue={recipe.title}
          {...register("title", { required: true, maxLength: 15 })}
        />
        {errors.title && errors.title.type === "required" && (
          <span>제목을 입력해주세요.</span>
        )}
        {errors.title && errors.title.type === "maxLength" && (
          <span>제목은 15글자 이내로 입력해주세요.</span>
        )}
        <br />

        <label>요리소개</label>
        <textarea
          id="desc"
          type="text"
          cols="40"
          rows="5"
          defaultValue={recipe.desc}
          placeholder=" 레시피에 대한 설명을 적어주세요.
                    ex) 어머니로부터 배운 미역국 레시피를
                    아내의 입맛에 맞게 고안했습니다."
          {...register("desc", { required: true, maxLength: 200 })}
        />
        {errors.desc && errors.desc.type === "required" && (
          <span>요리소개를 입력해주세요.</span>
        )}
        {errors.desc && errors.desc.type === "maxLength" && (
          <span>제목은 200글자 이내로 입력해주세요.</span>
        )}
        <br />

        <label>카테고리</label>
        <select defaultValue={recipe.category} {...register("category")}>
          <option value="soup">국/탕/찌개</option>
          <option value="grill">구이</option>
          <option value="noodle">면/파스타</option>
          <option value="rice">밥/볶음밥</option>
          <option value="side">반찬</option>
          <option value="kimchi">김치</option>
          <option value="dessert">디저트</option>
          <option value="etc">기타</option>
        </select>
        <br />

        <label>인원</label>
        <select defaultValue={recipe.qtt} {...register("qtt")}>
          <option value="1">1인분</option>
          <option value="2">2인분</option>
          <option value="3">3인분</option>
          <option value="4">4인분</option>
          <option value="5">5인분 이상</option>
        </select>
        <br />

        <label>시간</label>
        <select defaultValue={recipe.duration} {...register("duration")}>
          <option value="1">10분 이내</option>
          <option value="2">10분 ~ 30분</option>
          <option value="3">30분 ~ 1시간</option>
          <option value="4">1시간 ~ 2시간</option>
          <option value="5">2시간 이상</option>
        </select>
        <br />

        <h3>재료</h3>
        <FoodForm
          foodData={foodData}
          setFoodData={setFoodData}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          nutritionData={nutritionData}
          setNutritionData={setNutritionData}
        />

        <h3>요리 순서</h3>
        <StepForm stepData={stepData} setStepData={setStepData} />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // 유저 인증 로직
  const client = await clientPromise;
  const user = await getUserOrRedirect(ctx);
  const result = await client
    .db("webfront")
    .collection("recipe")
    .findOne({ user_id: user.id, _id: Number(ctx.query.post_no) });
  console.log(result);
  if (!result) {
    ctx.res.writeHead(302, {
      Location: "/recipe/list/my",
    });
    return ctx.res.end();
  }

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
