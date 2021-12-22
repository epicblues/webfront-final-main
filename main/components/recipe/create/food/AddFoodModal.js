// AddFoodModal.js
// 재료 추가하기 Modal Component

import React, { useState } from "react";
import axios from "axios";
import modalAddFoodStyles from "../../../../styles/recipe/ModalAddFood.module.css";
import SelectedFoodMap from "./SelectedFoodMap";
import { debounce } from "../../../../util/axios";

const AddFoodModal = ({
  foodData,
  setFoodData,
  setIsModalVisible,
  nutritionData,
  setNutritionData,
  handleSetIsMeasuringModalVisible,
}) => {
  //  검색필터
  const [filteredData, setFilteredData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [isDataSelected, setIsDataSelected] = useState(false);

  const handleSearch = debounce(async (event) => {
    const value = event.target.value;
    const { data } = await axios.get("/api/food/" + value);
    setFilteredData(data);
  }, 500);
  const onCancelBtn = () => {
    setIsModalVisible(false);
  };
  const onSelectBtn = (data) => {
    setSelectedData([data]);
    setIsDataSelected(true);
  };

  return (
    <div className={modalAddFoodStyles.container}>
      {selectedData.length === 0 ? (
        <div className={modalAddFoodStyles.searchWrapper}>
          <h3>재료 추가하기</h3>
          <input
            className={modalAddFoodStyles.searchInput}
            autoFocus={true}
            type="text"
            placeholder="음식/제품명 검색하기"
            onChange={(event) => handleSearch(event)}
          />
          <div className={modalAddFoodStyles.resultHeader}>
            <span>이름</span>
            <span>제조사</span>
          </div>
          <div className={modalAddFoodStyles.resultWrapper}>
            {!isDataSelected && (
              <>
                {filteredData.map((value, index) => {
                  return (
                    //  검색 리스트 출력
                    <div
                      className={modalAddFoodStyles.products}
                      key={Math.random()}
                    >
                      <span
                        className={modalAddFoodStyles.name}
                        key={Math.random()}
                      >
                        {value.name}
                      </span>
                      <span className={modalAddFoodStyles.mfr}>
                        {value.mfr}
                      </span>
                      <div
                        className={modalAddFoodStyles.btnAdd}
                        onClick={() => onSelectBtn(value)}
                      >
                        <i className="plus circle icon"></i>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={modalAddFoodStyles.cartWrapper}>
          <h3>추가할 재료</h3>
          <div className={modalAddFoodStyles.cartItems}>
            {selectedData.length === 0 ? null : (
              <>
                <SelectedFoodMap
                  foodData={foodData}
                  setFoodData={setFoodData}
                  selectedData={selectedData}
                  setIsModalVisible={setIsModalVisible}
                  isDataSelected={isDataSelected}
                  nutritionData={nutritionData}
                  setNutritionData={setNutritionData}
                  handleSetIsMeasuringModalVisible={
                    handleSetIsMeasuringModalVisible
                  }
                />
              </>
            )}
          </div>
        </div>
      )}

      <div
        className={modalAddFoodStyles.cancelBtn}
        onClick={() => onCancelBtn(false)}
      >
        <p>취소</p>
      </div>
    </div>
  );
};

export default AddFoodModal;
