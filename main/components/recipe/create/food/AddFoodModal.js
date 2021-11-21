import React, { useState } from "react";
import axios from "axios";
import modalStyles from "../../../../styles/Modal.module.css";
import SelectedFoodMap from "./SelectedFoodMap";
import { debounce } from "../../../../util/axios";

const AddFoodModal = ({
  foodData,
  setFoodData,
  setIsModalVisible,
  nutritionData,
  setNutritionData,
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
    <div className={modalStyles.modal}>
      <div>
        <h3>재료 검색하기</h3>
        <input
          autoFocus={true}
          type="text"
          placeholder="음식/제품명 검색하기"
          onChange={(event) => handleSearch(event)}
        />
        {!isDataSelected && (
          <div>
            {filteredData.map((value, index) => {
              return (
                //  검색 리스트 출력
                <div className={modalStyles.products} key={Math.random()}>
                  <div>
                    <span key={Math.random()}>{value.name}</span>/
                    <span>{value.mfr}</span>
                    <button type="button" onClick={() => onSelectBtn(value)}>
                      선택
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <SelectedFoodMap
          foodData={foodData}
          setFoodData={setFoodData}
          selectedData={selectedData}
          setIsModalVisible={setIsModalVisible}
          isDataSelected={isDataSelected}
          nutritionData={nutritionData}
          setNutritionData={setNutritionData}
        />
      </div>
      <div>
        <button type="button" onClick={() => onCancelBtn(false)}>
          취소
        </button>
      </div>
    </div>
  );
};

export default AddFoodModal;
