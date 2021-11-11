import React from 'react'
import AddFoodModal from './AddFoodModal'

const FoodForm = ({ foodData, setFoodData, isModalVisible, setIsModalVisible, nutritionData, setNutritionData }) => {
    const onModalBtn = (active) => {
        setIsModalVisible(active)

    }
    const removeFood = (food) => {
        const coefficient = 
            foodData[foodData.indexOf(food)].quantity / foodData[foodData.indexOf(food)].foodObj.serve
        const copiedNutritionData = Object.assign({}, nutritionData)
        for (let key in copiedNutritionData) {
            copiedNutritionData[key] -= 
                Math.round((isNaN(foodData[foodData.indexOf(food)].foodObj[key]) ? 
                    0 : foodData[foodData.indexOf(food)].foodObj[key]) * coefficient)
        }
        for (let key in copiedNutritionData) {
            if (copiedNutritionData[key] < 0) {
                copiedNutritionData[key] = 0
            }
        }
        setNutritionData(copiedNutritionData)
        setFoodData(
            foodData.filter((value) => value !== food)
        );
    }
    return (
        <div>
            <div>
                {foodData.length === 0 ? <p>재료를 추가해주세요</p>
                    :   foodData.map((value,index) => {
                        return (
                            <div key={index}>
                                <span>
                                    {value.foodObj.name}
                                    {" "}
                                </span>
                                <span>
                                    (제조사: {value.foodObj.mfr})
                                    {" "}
                                </span>
                                <span>
                                    {value.quantity}
                                </span>
                                <span>
                                    {value.foodObj.unit}
                                </span>
                                <button 
                                    type='button'
                                    onClick={() => removeFood(value)}
                                >
                                    삭제
                                </button>
                            </div>
                        );
                    })
                }
            </div>
            <button type='button' onClick={() => onModalBtn(true)}>
                재료추가하기
            </button>
            <div>
                {isModalVisible &&
                (
                    <AddFoodModal
                        foodData={foodData}
                        setFoodData={setFoodData}
                        setIsModalVisible={setIsModalVisible}
                        nutritionData={nutritionData}
                        setNutritionData={setNutritionData}
                    />
                )}
            </div>
        </div>
    )
}

export default FoodForm
