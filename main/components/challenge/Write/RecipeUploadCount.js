import React from "react";

const RecipeUploadCount = ({ value, checked, onChange }) => {
  return (
    <>
      <input
        type="radio"
        name="uploadCount"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label>{`${value}회`}</label>
    </>
  );
};

export default RecipeUploadCount;
