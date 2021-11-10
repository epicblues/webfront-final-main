import React, {useState} from 'react'

const ModalNutrition = ({setIsModalVisible, nutritionData}) => {
    const onModalBtn = (val) => {
        setIsModalVisible(val)
    }
    return (
        <div>
            식품정보 Modal
            <button
                type='button'
                onClick={() => onModalBtn(false)}
            >
                X
            </button>
            <div>
                <ul>
                    <li>칼로리: {nutritionData.kcal}</li>
                    <li>탄수화물: {nutritionData.carbs}</li>
                    <li> 당류: {nutritionData.sugars}</li>
                    <li>단백질: {nutritionData.prot}</li>
                    <li>지방: {nutritionData.fat}</li>
                    <li> 포화지방: {nutritionData.stdfat}</li>
                    <li> 트랜스지방: {nutritionData.trnfat}</li>
                    <li>콜레스테롤: {nutritionData.chole}</li>
                    <li>나트륨: {nutritionData.sodium}</li>
                </ul>
            </div>
        </div>
    )
}

export default ModalNutrition
