import React from "react";
import navigationStyles from "../../../styles/recipe/Navigation.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faImages } from "@fortawesome/free-regular-svg-icons";

const MyNavigation = ({ activeIndex, onTabBtn }) => {
  return (
    <div className={navigationStyles.container}>
      <div className={navigationStyles.tab}>
        <p
          className={activeIndex === 0 ? "activated" : ""}
          onClick={() => onTabBtn(0)}
        >
          카드
        </p>
      </div>
      <div
        className={activeIndex === 1 ? "activated" : ""}
        className={navigationStyles.tab}
      >
        <p onClick={() => onTabBtn(1)}>리스트</p>
      </div>
    </div>
  );
};

export default MyNavigation;
