import React from "react";
import modalBlackoutStyles from "../../../../styles/ModalBlackout.module.css";

const AddFoodModalBlackout = ({ handleSetIsModalVisible }) => {
  return (
    <div
      className={modalBlackoutStyles.blackout}
      onClick={() => handleSetIsModalVisible(false)}
    ></div>
  );
};

export default AddFoodModalBlackout;
