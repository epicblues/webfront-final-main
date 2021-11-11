import React, { useRef } from "react";

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
        <div>
          <h4>선택한 음식</h4>
          {selectedData.map((value, index) => {
            return (
              <div key={Math.random()}>
                <span>{value.name}</span>/<span>{value.mfr}</span>
                <br />
                <input //  음식 중량 입력
                  autoFocus={true}
                  ref={inputRef}
                  type="number"
                  placeholder="선택한 음식의 양"
                />
                <span>단위:({value.unit})</span>
                <button type="button" onClick={() => onAddBtn(value)}>
                  확인
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SelectedFoodMap;
