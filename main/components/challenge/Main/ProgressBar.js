import React from "react";
import ProgressStyle from "../../../styles/challenge/Progress.module.css";

const ProgressBar = ({ value, max }) => {
  const percent = `${((value / max) * 100).toFixed(0)}%`;

  return (
    <div>
      <progress className={ProgressStyle.div} value={value} max={max} />
      <span style={{ fontWeight: "600px", textAlign: "center" }}>
        {(value / max) * 100}%
      </span>
    </div>
  );
};

export default ProgressBar;
