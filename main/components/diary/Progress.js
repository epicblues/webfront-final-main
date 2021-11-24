import React from "react";

const Progress = () => {
  const example = {
    name: "challenge",
    value: 30,
    color: "blue",
  };
  return (
    <div className="progress-bar">
      <div className="value">
        <div style={{ color: "blue", width: "30+%" }}>
          <span>{example.value}%</span>
        </div>
      </div>
      <div className="scale"></div>
      <div className="bar"></div>
      <div className="legend"></div>
    </div>
  );
};

export default Progress;
