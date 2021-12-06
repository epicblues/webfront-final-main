import React, { useRef } from "react";
import modalAddFoodStyles from "../../../../styles/recipe/ModalAddFood.module.css";

const SelectedFoodMap = ({
  foodData,
  setFoodData,
  selectedData,
  setIsModalVisible,
  isDataSelected,
  nutritionData,
  setNutritionData,
}) => {
  const inputRef = useRef();
  const onAddBtn = (foodObj) => {
    if (inputRef.current.value === "") {
      alert("중량을 입력해주세요");
    } else {
      setIsModalVisible(false);
      let foodDataToSubmit = [
        ...foodData,
        { foodObj, quantity: inputRef.current.value },
      ];
      setFoodData(foodDataToSubmit);
      const coefficient = inputRef.current.value / foodObj.serve;
      const copiedNutritionData = Object.assign({}, nutritionData);
      for (let key in copiedNutritionData) {
        copiedNutritionData[key] += Math.round(
          (isNaN(foodObj[key]) ? 0 : foodObj[key]) * coefficient
        );
      }
      setNutritionData(copiedNutritionData);
    }
  };
  return (
    <>
      {isDataSelected && (
        <>
          <div className={modalAddFoodStyles.resultHeader}>
            <span>이름</span>
            <span>제조사</span>
          </div>
          {selectedData.map((value, index) => {
            return (
              <>
                <div
                  className={modalAddFoodStyles.itemWrapper}
                  key={Math.random()}
                >
                  <span className={modalAddFoodStyles.name}>{value.name}</span>
                  <span className={modalAddFoodStyles.mfr}>{value.mfr}</span>
                </div>
                <div className={modalAddFoodStyles.inputWrapper}>
                  <input //  음식 중량 입력
                    autoFocus={true}
                    ref={inputRef}
                    type="number"
                    placeholder={`음식의 양, 단위(${value.unit})`}
                  />
                  <div onClick={() => onAddBtn(value)}>
                    <p>확인</p>
                  </div>
                </div>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default SelectedFoodMap;
