import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import IngredientForm from '../../../components/recipe/createRecipe/IngredientForm'
import StepForm from '../../../components/recipe/createRecipe/StepForm'

//  작성폼 초기값
const initialValues = {
    post_id: "", //  post_id
    user_id: "", //  인증 받아오기
    upload_date: "",    //  현재 시간 받아오기 (SUBMIT), 최신 list에 사용
    title: "",  //  요리명
    desc: "",   //  요리소개
    category: "",   //  카테고리
    qtt: "",    //  인원
    duration: "",   //  소요시간
    igr_array: [],  //  재료 배열
}

//  user_id 받아오는 StaticProps

//  igr_array에 food.name 값 검색하는 쿼리문 예시
//  db.getCollection('food').find({"name" : { $regex: "^귀리" } })

//  작성폼
export const index = () => {
    const [stepData, setStepData] = useState([]);
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        let recipeData = initialValues
        recipeData = {
            ...initialValues,
            title: data.title,
            desc: data.desc,
            category: data.category,
            qtt: data.qtt,
            duration: data.duration,
        }
        console.log(recipeData)
    }
    return (
        <div>
            <h2>레시피 등록하기</h2>
            <h3>레시피 정보 입력</h3>
            <form onSubmit ={handleSubmit(onSubmit)}>
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
                <input type="submit" value="1단계 작성완료"/>
            </form>

            <h3>재료 입력</h3>
            {/* <IngredientForm /> */}

            <h3>요리 순서</h3>

            <StepForm stepData={stepData} setStepData={setStepData} />
        </div>
    )
}

export default index
