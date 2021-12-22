// AddFoodModalBlackout.js
// AddFoodModal 활성화시 바깥 어두운 영역
// 영역 클릭하면 Modal 비활성화

import React from "react";
import modalBlackoutStyles from "../../../../styles/recipe/ModalBlackout.module.css";

const AddFoodModalBlackout = ({ handleSetIsModalVisible }) => {
  return (
    <div
      className={modalBlackoutStyles.blackout}
      onClick={() => handleSetIsModalVisible(false)}
    ></div>
  );
};

export default AddFoodModalBlackout;
