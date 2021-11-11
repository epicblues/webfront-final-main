import React, { useState } from "react";

const ModalNutrition = ({ setIsModalVisible, nutritionData }) => {
  const onModalBtn = (val) => {
    setIsModalVisible(val);
  };
  return (
    <div>
      식품정보 Modal
      <button type="button" onClick={() => onModalBtn(false)}>
        X
      </button>
      <div>
        <ul>
          <li>칼로리: {nutritionData.kcal} (kcal)</li>
          <li>탄수화물: {nutritionData.carbs} (g)</li>
          <li> 당류: {nutritionData.sugars} (g)</li>
          <li>단백질: {nutritionData.prot} (g)</li>
          <li>지방: {nutritionData.fat} (g)</li>
          <li> 포화지방: {nutritionData.stdfat} (g)</li>
          <li> 트랜스지방: {nutritionData.trnfat} (g)</li>
          <li>콜레스테롤: {nutritionData.chole} (㎎)</li>
          <li>나트륨: {nutritionData.sodium} (㎎)</li>
        </ul>
      </div>
    </div>
  );
};

export default ModalNutrition;
