import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { NextApiResponse, NextApiRequest } from 'next'

const initialValues = {
    igr_array: []
}

async function getFoodDataByNameWithin() {
    try {
        const res = await axios.get(`api/food?name=${foodName}`);
        console.log(res)
    } catch (error) {
        console.error(error);
    }
}

// 동기처리 버전
// const getFoodDataByName = (foodName) => {
//     axios.get(`api/food?name=${foodName}`)
//     .then(function(res) {
//         console.log(res)
//     })
//     .catch(function(error) {
//         console.log(error)
//     })

const IngredientForm = () => {
    const { register, watch } = useForm();
    let searchVal = watch();
    console.log(searchVal);


    
    //  axios JSON 요청 및 응답 받아와서 리스트 배열 뿌리기 로직 구현 필요
    // localhost/3000/api/recipe/food?searchVal=value

    //  로컬스토리지 개념 이해 및 테스트

    //  igr_array에 food.name 값 검색하는 쿼리문 예시
    //  db.getCollection('food').find({"name" : { $regex: "^귀리" } })

    return (
        <div>
            <form>
                <label>재료</label>
                <input 
                    type="text"
                    placeholder="예)양파"
                    {...register("name")}
                />

                <label>양</label>
                <input type="text" placeholder="예)100" />

                <label>단위</label>
                <select>
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                </select>
                <button type="button">추가</button>
            </form>
        </div>
    )
}

export default IngredientForm
