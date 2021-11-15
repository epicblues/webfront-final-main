import React from "react";

const DietCondition = ({ value, checked, onChange }) => {
  return (
    <>
      <input
        type="radio"
        name="dailyCalorie"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label>{`${value}kcal`}</label>
    </>
  );
};

export default DietCondition;
