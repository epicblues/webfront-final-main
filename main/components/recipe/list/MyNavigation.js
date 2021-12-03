import React from "react";
import navigationStyles from "../../../styles/recipe/Navigation.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faImages } from "@fortawesome/free-regular-svg-icons";

const MyNavigation = () => {
  return (
    <div className={navigationStyles.container}>
      <div className={navigationStyles.tab}>
        <p>카드</p>
      </div>
      <div className={navigationStyles.tab}>
        <p>리스트</p>
      </div>
    </div>
  );
};

export default MyNavigation;
