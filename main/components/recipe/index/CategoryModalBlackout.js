// CategoryModalBlackout.js
// CategoryModalBlackout 활성화시 바깥 어두운 영역
// 영역 클릭하면 Modal 비활성화

import React from "react";
import modalBlackoutStyles from "../../../styles/recipe/ModalBlackout.module.css";

const CategoryModalBlackout = ({ handleSetIsCatModalVisible }) => {
  return (
    <div
      className={modalBlackoutStyles.blackout}
      onClick={() => handleSetIsCatModalVisible(false)}
    ></div>
  );
};

export default CategoryModalBlackout;
