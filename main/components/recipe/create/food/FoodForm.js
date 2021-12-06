import React from "react";
import AddFoodModal from "./AddFoodModal";

import Image from "next/image";
import doge from "../../../../public/static/logos/doge.gif";
import createStyles from "../../../../styles/recipe/Create.module.css";

const FoodForm = ({
  foodData,
  setFoodData,
  isModalVisible,
  setIsModalVisible,
  nutritionData,
  setNutritionData,
}) => {
  const onModalBtn = (active) => {
    setIsModalVisible(active);
  };
  const removeFood = (food) => {
    const coefficient =
      foodData[foodData.indexOf(food)].quantity /
      foodData[foodData.indexOf(food)].foodObj.serve;
    const copiedNutritionData = Object.assign({}, nutritionData);
    for (let key in copiedNutritionData) {
      copiedNutritionData[key] -= Math.round(
        (isNaN(foodData[foodData.indexOf(food)].foodObj[key])
          ? 0
          : foodData[foodData.indexOf(food)].foodObj[key]) * coefficient
      );
    }
    for (let key in copiedNutritionData) {
      if (copiedNutritionData[key] < 0) {
        copiedNutritionData[key] = 0;
      }
    }
    setNutritionData(copiedNutritionData);
    setFoodData(foodData.filter((value) => value !== food));
  };
  return (
    <>
      <div className={createStyles.selectedFoodMapContainer}>
        {foodData.length === 0 ? (
          <>
            <Image objectFit="contain" src={doge}></Image>
            <p className={createStyles.emptyP}>🥕재료를 추가해주세요🥕</p>
          </>
        ) : (
          <>
            <div className={createStyles.selectedFoodMapHeader}>
              <span>이름</span>
              <span>제조사</span>
              <span>양</span>
              <span>단위</span>
              <span>-</span>
            </div>
            {foodData.map((value, index) => {
              return (
                <div className={createStyles.selectedFoodMapItems} key={index}>
                  <span>{value.foodObj.name} </span>
                  <span>{value.foodObj.mfr} </span>
                  <span>{value.quantity}</span>
                  <span>{value.foodObj.unit}</span>
                  <div
                    className={createStyles.btnAdd}
                    onClick={() => removeFood(value)}
                  >
                    <i class="minus circle icon"></i>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className={createStyles.onModalBtn}>
        <p onClick={() => onModalBtn(true)}>재료추가하기</p>
      </div>
      <div>
        {isModalVisible && (
          <AddFoodModal
            foodData={foodData}
            setFoodData={setFoodData}
            setIsModalVisible={setIsModalVisible}
            nutritionData={nutritionData}
            setNutritionData={setNutritionData}
          />
        )}
      </div>
    </>
  );
};

export default FoodForm;
