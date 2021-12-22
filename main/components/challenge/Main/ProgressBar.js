import React from "react";
import ProgressStyle from "../../../styles/challenge/Progress.module.css";

const ProgressBar = ({ value, max }) => {
  const percent = `${((value / max) * 100).toFixed(0)}%`;

  return (
    <div>
      <progress className={ProgressStyle.progress} value={value} max={max} />
      <span
        style={{
          display: "flex",
          textAlign: "center",
          position: "relative",
          left: "15%",
        }}
      >
        {Number.isNaN(Math.round((value / max) * 100))
          ? 0
          : Math.round((value / max) * 100)}
      </span>
      <div></div>
    </div>
  );
};

export default ProgressBar;
