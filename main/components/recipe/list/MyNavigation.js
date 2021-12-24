import React from "react";
import navigationStyles from "../../../styles/recipe/Navigation.module.css";

const MyNavigation = ({ activeIndex, onTabBtn }) => {
  return (
    <div className={navigationStyles.container}>
      <div className={navigationStyles.tab}>
        <p
          className={activeIndex === 0 ? navigationStyles.activated : ""}
          onClick={() => onTabBtn(0)}
        >
          카드
        </p>
      </div>
      <div className={navigationStyles.tab}>
        <p
          className={activeIndex === 1 ? navigationStyles.activated : ""}
          onClick={() => onTabBtn(1)}
        >
          리스트
        </p>
      </div>
    </div>
  );
};

export default MyNavigation;
