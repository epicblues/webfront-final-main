import React from "react";

const DietCondition2 = ({ value, checked, onChange }) => {
  return (
    <>
      <input
        type="radio"
        name="condition"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label>{`${value}일`}</label>
    </>
  );
};

export default DietCondition2;
