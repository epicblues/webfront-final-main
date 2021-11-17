import React from "react";

const DietCondition = ({ value, onChange }) => {
  return (
    <>
      <select name="condition" value={value} onChange={onChange}>
        const
        <option>{`${value}`}`</option>
      </select>
    </>
  );
};

export default DietCondition;
