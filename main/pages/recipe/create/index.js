import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getUserOrRedirect } from "../../api/auth";
import * as Yup from "yup";
import axios from "axios";

import IngredientForm from "../../../components/recipe/createRecipe/IngredientForm";
// Step(요리순서)
import StepForm from "../../../components/recipe/createRecipe/StepForm";

//  post_id 초기값 확인을 위한 logic(post 개수 확인)
//  처음에 초기값 받아 놓고, 마지막 submit할 때 post_id 겹치는지 한 번 더 확인 후,
//  겹치면 post_id + 1 해줄 것

//  작성폼 초기값
const initialValues = {};

//  작성폼
export const index = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [stepData, setStepData] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const date = new Date();

    let finalRecipeData = {
      ...initialValues,
      upload_date: date,
      title: data.title,
      desc: data.desc,
      category: data.category,
      qtt: data.qtt,
      duration: data.duration,
      igr_array: [],
      stepData: stepData.map((step) => step.stepDesc),
    };

    const formData = new FormData();
    for (let key in finalRecipeData) {
      formData.append(key, finalRecipeData[key]);
    }
    stepData.forEach((step, index) => {
      formData.append(`step_img_${index + 1}`, step.stepImageFile);
    });

    axios.put("/api/recipe/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  return (
    <div>
      <h2>레시피 등록하기</h2>
      <h3>레시피 정보 입력</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>요리명</label>
        <input
          type="text"
          placeholder=" ex) 소고기 미역국"
          {...register("title")}
        />
        <br />

        <label>요리소개</label>
        <textarea
          type="text"
          cols="40"
          rows="5"
          placeholder=" 레시피에 대한 설명을 적어주세요.
                    ex) 어머니로부터 배운 미역국 레시피를
                    아내의 입맛에 맞게 고안했습니다."
          {...register("desc")}
        />
        <br />

        <label>카테고리</label>
        <select {...register("category")}>
          <option value="grill">구이</option>
          <option value="soup">국/탕</option>
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

        <h3>요리 순서</h3>
        <StepForm stepData={stepData} setStepData={setStepData} />
        <button type="button">임시저장</button>
        <button type="submit">글쓰기</button>
      </form>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);
  return { props: user };
};

export default index;
