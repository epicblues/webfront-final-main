import React from "react";
import cn from "classnames";

//  CSS
import formNavigatorStyles from "../../../styles/recipe/FormNavigator.module.css";

const FormNavigator = ({ wizardIndex, setWizardIndex }) => {
  function switchNavigation(param) {
    switch (param) {
      case 1:
        return (
          <div
            className={cn({
              [formNavigatorStyles.stepState]: true,
              [formNavigatorStyles.step1]: true,
            })}
          >
            <ul>
              <li>
                <p>
                  1단계<span>기본정보</span>
                </p>
              </li>
              <li>
                <p>
                  2단계<span>재료추가</span>
                </p>
              </li>
              <li>
                <p>
                  3단계<span>조리방법</span>
                </p>
              </li>
              <li>
                <p>완료</p>
              </li>
            </ul>
          </div>
        );
      case 2:
        return (
          <div
            className={cn({
              [formNavigatorStyles.stepState]: true,
              [formNavigatorStyles.step2]: true,
            })}
          >
            <ul>
              <li>
                <p>
                  1단계<span>기본정보</span>
                </p>
              </li>
              <li>
                <p>
                  2단계<span>재료추가</span>
                </p>
              </li>
              <li>
                <p>
                  3단계<span>조리방법</span>
                </p>
              </li>
              <li>
                <p>완료</p>
              </li>
            </ul>
          </div>
        );
      case 3:
        return (
          <div
            className={cn({
              [formNavigatorStyles.stepState]: true,
              [formNavigatorStyles.step3]: true,
            })}
          >
            <ul>
              <li>
                <p>
                  1단계<span>기본정보</span>
                </p>
              </li>
              <li>
                <p>
                  2단계<span>재료추가</span>
                </p>
              </li>
              <li>
                <p>
                  3단계<span>조리방법</span>
                </p>
              </li>
              <li>
                <p>완료</p>
              </li>
            </ul>
          </div>
        );
      case 4:
        return (
          <div
            className={cn({
              [formNavigatorStyles.stepState]: true,
              [formNavigatorStyles.step4]: true,
            })}
          >
            <ul>
              <li>
                <p>
                  1단계<span>기본정보</span>
                </p>
              </li>
              <li>
                <p>
                  2단계<span>재료추가</span>
                </p>
              </li>
              <li>
                <p>
                  3단계<span>조리방법</span>
                </p>
              </li>
              <li>
                <p>완료</p>
              </li>
            </ul>
          </div>
        );
    }
  }
  return (
    <div className={formNavigatorStyles.stepBox}>
      {switchNavigation(wizardIndex)}
    </div>
  );
};

export default FormNavigator;
