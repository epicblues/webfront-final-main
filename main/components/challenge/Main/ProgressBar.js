import React from "react";
import ProgressStyle from "../../../styles/challenge/Progress.module.css";

const ProgressBar = ({ value, max }) => {
  const percent = `${((value / max) * 100).toFixed(0)}%`;

  return (
    <div>
      <progress className={ProgressStyle.progress} value={value} max={max} />
      <span style={{ fontWeight: "600px", textAlign: "center" }}>
        {Math.round((value / max) * 100)}%%%%%%%%%
      </span>
    </div>
  );
};

export default ProgressBar;
