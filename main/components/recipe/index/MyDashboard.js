import React from "react";
import myDashboardStyles from "../../../styles/recipe/MyDashboard.module.css";

const MyDashBoard = () => {
  return (
    <div className={myDashboardStyles.container}>
      <div className={myDashboardStyles.wrapper}>
        <div className={myDashboardStyles.innerWrapper}>MyRecipe</div>
        <div className={myDashboardStyles.innerWrapper}>dashboard1</div>
        <div className={myDashboardStyles.innerWrapper}>dashboard2</div>
      </div>
    </div>
  );
};

export default MyDashBoard;
