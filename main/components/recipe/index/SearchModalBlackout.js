import React from "react";
import modalBlackoutStyles from "../../../styles/recipe/ModalBlackout.module.css";

const SearchModalBlackout = ({ handleSetIsSearchModalVisible }) => {
  return (
    <div
      className={modalBlackoutStyles.blackout}
      onClick={() => handleSetIsSearchModalVisible(false)}
    ></div>
  );
};

export default SearchModalBlackout;
