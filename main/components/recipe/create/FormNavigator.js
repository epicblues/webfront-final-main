import React from "react";
import cn from "classnames";
import Image from "next/dist/client/image";

//  CSS
import formNavigatorStyles from "../../../styles/recipe/FormNavigator.module.css";

//  ICON
import Icon from "../../../public/static/logos/App_Icon_144x144.png";

const FormNavigator = ({ wizardIndex, setWizardIndex }) => {
  const completed = wizardIndex;
  function switchFilter(param) {
    switch (param) {
      case 1:
        return <div className={formNavigatorStyles.filter1}></div>;
      case 2:
        return <div className={formNavigatorStyles.filter2}></div>;
      case 3:
        return <div className={formNavigatorStyles.filter3}></div>;
      case 4:
        return <div className={formNavigatorStyles.filter4}></div>;
    }
  }

  return (
    <div className={formNavigatorStyles.container}>
      <div className={formNavigatorStyles.bar}>{switchFilter(wizardIndex)}</div>
      <div className={formNavigatorStyles.labelContainer}>
        <p>
          1<br />
          요리정보
        </p>
      </div>
      <div className={formNavigatorStyles.labelContainer}>
        <p>
          2<br />
          재료추가
        </p>
      </div>
      <div className={formNavigatorStyles.labelContainer}>
        <p>
          3<br />
          요리순서
        </p>
      </div>
      <div className={formNavigatorStyles.labelContainer}>
        <p>
          4<br />
          완료
        </p>
      </div>
    </div>
  );
};

export default FormNavigator;
