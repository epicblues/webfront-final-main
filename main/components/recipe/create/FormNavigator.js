import React from "react";
import cn from "classnames";

//  CSS
import formNavigatorStyles from "../../../styles/recipe/FormNavigator.module.css";

const FormNavigator = ({ wizardIndex, setWizardIndex }) => {
  const completed = wizardIndex;
  function switchFilter(param) {
    switch (param) {
      case 1:
        return (
          <div className={formNavigatorStyles.filter1}>
            <span
              className={formNavigatorStyles.label}
            >{`${completed}단계`}</span>
          </div>
        );
      case 2:
        return (
          <div className={formNavigatorStyles.filter2}>
            <span
              className={formNavigatorStyles.label}
            >{`${completed}단계`}</span>
          </div>
        );
      case 3:
        return (
          <div className={formNavigatorStyles.filter3}>
            <span
              className={formNavigatorStyles.label}
            >{`${completed}단계`}</span>
          </div>
        );
      case 4:
        return (
          <div className={formNavigatorStyles.filter4}>
            <span
              className={formNavigatorStyles.label}
            >{`${completed}단계`}</span>
          </div>
        );
    }
  }

  return (
    <div className={formNavigatorStyles.container}>
      {switchFilter(wizardIndex)}
    </div>
  );
};

export default FormNavigator;
