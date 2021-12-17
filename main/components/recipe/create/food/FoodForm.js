import React from "react";
import AddFoodModal from "./AddFoodModal";

import Image from "next/image";
import doge from "../../../../public/doge.png";
import createStyles from "../../../../styles/recipe/Create.module.css";

import "animate.css";
import { BiBone, BiPlus } from "react-icons/bi";

const FoodForm = ({
  foodData,
  setFoodData,
  isModalVisible,
  setIsModalVisible,
  nutritionData,
  setNutritionData,
  handleSetIsMeasuringModalVisible,
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
    <div className={createStyles.wizard2}>
      {foodData.length === 0 ? (
        <div className={createStyles.dogeAndAdd}>
          <div className={createStyles.pleaseAdd}>
            아래에 있는 개껌을 눌러 <br />
            재료를 추가하세요.
          </div>
          <div className={createStyles.doge}>
            <Image layout="responsive" objectFit="contain" src={doge}></Image>
          </div>
        </div>
      ) : (
        <div className={createStyles.selectedFoodMapContainer}>
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
                    <i className="minus circle icon"></i>
                  </div>
                </div>
              );
            })}
          </>
        </div>
      )}

      <div className={createStyles.onModalBtn} onClick={() => onModalBtn(true)}>
        <BiPlus
          className="animate__animated animate__bounce"
          style={{ marginBottom: "0.5rem" }}
        />
        <BiBone className="animate__animated animate__bounce" size="2rem" />
      </div>

      <div>
        {isModalVisible && (
          <AddFoodModal
            foodData={foodData}
            setFoodData={setFoodData}
            setIsModalVisible={setIsModalVisible}
            nutritionData={nutritionData}
            setNutritionData={setNutritionData}
            handleSetIsMeasuringModalVisible={handleSetIsMeasuringModalVisible}
          />
        )}
      </div>
    </div>
  );
};

export default FoodForm;
