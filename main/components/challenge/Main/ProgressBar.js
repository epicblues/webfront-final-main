import React from "react";

const ProgressBar = () => {
  const [percent, setPercent] = useState("");

  const changeProgress = (e) => {
    setPercent(e.currentTarget.value);
  };

  return (
    <div className="progress-bar">
      <div className="value">
        <div>
          <span></span>
        </div>
      </div>
      <div className="scale">
        <div>
          <span></span>
        </div>
      </div>
      <div className="bar">
        <div></div>
        <div></div>
      </div>
      <div className="legend">
        <div>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
