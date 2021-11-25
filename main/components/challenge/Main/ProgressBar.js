import React from "react";

const ProgressBar = ({ value, max }) => {
  const percent = `${((value / max) * 100).toFixed(0)}%`;
  return (
    <>
      <div style={{ opacity: 1, width: percent }}>
        <progress value={value} max={max} />
        <span style={{ fontWeight: "600px", textAlign: "center" }}>
          {(value / max) * 100}%
        </span>
      </div>
    </>
  );
};

export default ProgressBar;
