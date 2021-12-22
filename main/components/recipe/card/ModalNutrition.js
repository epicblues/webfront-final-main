// ModalNutrition.js
// recipe/card 상세페이지 내부 영양정보 확인 Modal

import React, { useState } from "react";

import modalNutritionStyles from "../../../styles/recipe/ModalNutrition.module.css";

const ModalNutrition = ({ setIsModalVisible, nutritionData, totalQtt }) => {
  const onModalBtn = (val) => {
    setIsModalVisible(val);
  };
  return (
    <div className={modalNutritionStyles.container}>
      <div className={modalNutritionStyles.header}>
        <div className={modalNutritionStyles.headerTitle}>영양정보</div>
        <div className={modalNutritionStyles.floatRight}>
          <div className={modalNutritionStyles.qtt}>총 내용량 {totalQtt}g</div>
          <div className={modalNutritionStyles.kcal}>
            {nutritionData.kcal}kcal
          </div>
        </div>
      </div>

      <div className={modalNutritionStyles.body}>
        <div className={modalNutritionStyles.bodyHeader}>
          <div>총 내용량당</div>
        </div>
        <ul>
          <div className={modalNutritionStyles.bodyContent}>
            <li>
              <div className={modalNutritionStyles.ntrName}>나트륨</div>
              <div>{nutritionData.sodium}㎎</div>
            </li>
          </div>
          <div className={modalNutritionStyles.bodyContent}>
            <li>
              <div className={modalNutritionStyles.ntrName}>탄수화물</div>
              <div>{nutritionData.carbs}g</div>
            </li>
            <li>
              <div className={modalNutritionStyles.transform}>당류</div>
              <div>{nutritionData.sugars}g</div>
            </li>
          </div>
          <div className={modalNutritionStyles.bodyContent}>
            <li>
              <div className={modalNutritionStyles.ntrName}>지방</div>
              <div>{nutritionData.fat}g</div>
            </li>
            <li>
              <div className={modalNutritionStyles.transform}>트랜스지방</div>
              <div>{nutritionData.trnfat}g</div>
            </li>
            <li>
              <div className={modalNutritionStyles.transform}>포화지방</div>
              <div>{nutritionData.stdfat}g</div>
            </li>
          </div>
          <div className={modalNutritionStyles.bodyContent}>
            <li>
              <div className={modalNutritionStyles.ntrName}>콜레스테롤</div>
              <div>{nutritionData.chole}㎎</div>
            </li>
          </div>
          <div className={modalNutritionStyles.bodyContent}>
            <li>
              <div className={modalNutritionStyles.ntrName}>단백질</div>
              <div>{nutritionData.prot}g</div>
            </li>
          </div>
        </ul>
      </div>
      <div className={modalNutritionStyles.footer}>
        <div
          className={modalNutritionStyles.xBtn}
          onClick={() => onModalBtn(false)}
        >
          닫기
        </div>
      </div>
    </div>
  );
};

export default ModalNutrition;
