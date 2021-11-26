import React from "react";

const ProgressBar = ({ value, max }) => {
  const percent = `${((value / max) * 100).toFixed(0)}%`;
  return (
    <>
      <div style={{ opacity: 1, width: percent }}>
        <progress
          value={value}
          max={max}
          style={{
            backgroundColor: "white",
            color: "#B2EBF4",
            borderRadius: "5px",
            border: "0",
          }}
        />
        <span style={{ fontWeight: "600px", textAlign: "center" }}>
          {(value / max) * 100}%
        </span>
      </div>
    </>
  );
};

export default ProgressBar;
