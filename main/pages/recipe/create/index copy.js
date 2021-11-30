import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { getUserOrRedirect } from "../../../util/auth";
import { postStaticAxios } from "../../../util/axios";

import MeasuringModal from "../../../components/recipe/create/food/MeasuringModal";
import MeasuringModalBlackout from "../../../components/recipe/create/food/MeasuringModalBlackout";
import AddFoodModalBlackout from "../../../components/recipe/create/food/AddFoodModalBlackout";

import GoBackward from "../../../components/GoBackward";
import FoodForm from "../../../components/recipe/create/food/FoodForm";
import StepForm from "../../../components/recipe/create/step/StepForm";

//CSS
import createStyles from "../../../styles/recipe/Create.module.css";

//  작성폼
export const Index = ({ user }) => {
  //  계량 팁 Modal, 렌더링 로직
  const [isMeasuringModalVisible, setIsMeasuringModalVisible] = useState(true);
  const [indexMeasuringModal, setIndexMeasuringModal] = useState(0);
  const handleSetIsMeasuringModalVisible = (active) => {
    setIsMeasuringModalVisible(active);
  };

  //  음식 추가 Modal, 렌더링 로직
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleSetIsModalVisible = (active) => {
    setIsModalVisible(active);
  };
  const router = useRouter();

  const [foodData, setFoodData] = useState([]); //  재료 데이터
  const [stepData, setStepData] = useState([]); //  요리순서 데이터
  const [nutritionData, setNutritionData] = useState({
    //  영양정보 데이터
    kcal: 0,
    carbs: 0,
    sugars: 0,
    prot: 0,
    fat: 0,
    stdfat: 0,
    trnfat: 0,
    chole: 0,
    sodium: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitBtnClick = async (data) => {
    if (foodData.length === 0) {
      alert("재료를 입력해주세요");
    } else if (stepData.length === 0) {
      alert("조리 순서를 최소 1개 이상 등록해주세요.");
    } else {
      const date = new Date();

      let finalRecipeData = {
        upload_date: date,
        update_date: date,
        title: data.title,
        desc: data.desc,
        hit: 0,
        category: data.category,
        qtt: Number(data.qtt),
        totalNutrition: JSON.stringify(nutritionData), //  레시피 칼로리 총합
        duration: data.duration,
        igr_array: foodData.map((food) => {
          return `${food.foodObj.no}/${food.quantity}`;
        }), //  음식(재료) 객체의 배열
        stepData: JSON.stringify(
          stepData.map((step) => {
            return { desc: step.stepDesc };
          })
        ),
      };

      const formData = new FormData();
      for (let key in finalRecipeData) {
        formData.append(key, finalRecipeData[key]);
      }
      stepData.forEach((step, index) => {
        formData.append(`step_img_${index + 1}`, step.stepImageFile);
      });
      try {
        const { data } = await postStaticAxios(
          "/api/recipe/create",
          user.token,
          formData
        );
        console.log(data);
        router.push(`/recipe/card/${data.status}`);
      } catch (error) {
        alert(error);
      }
    }
  };
  return (
    <div className={createStyles.container}>
      {isMeasuringModalVisible && (
        <>
          <MeasuringModal
            indexMeasuringModal={indexMeasuringModal}
            setIndexMeasuringModal={setIndexMeasuringModal}
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
      <h2>레시피 등록하기</h2>
      <h3>레시피 정보 입력</h3>
      <form onSubmit={handleSubmit(submitBtnClick)}>
        <label htmlFor="title">요리명</label>
        <input
          autoFocus={true}
          id="title"
          type="text"
          placeholder=" ex) 소고기 미역국"
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
        <select {...register("category")}>
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
        <select {...register("qtt")}>
          <option value="1">1인분</option>
          <option value="2">2인분</option>
          <option value="3">3인분</option>
          <option value="4">4인분</option>
          <option value="5">5인분 이상</option>
        </select>
        <br />

        <label>시간</label>
        <select {...register("duration")}>
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

        <div className={createStyles.submits}>
          <button type="submit">글쓰기</button>
          <GoBackward />
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);
  return { props: { user } };
};

export default Index;
