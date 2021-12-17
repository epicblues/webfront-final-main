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
