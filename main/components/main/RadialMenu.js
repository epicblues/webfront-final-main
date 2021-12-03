import React from "react";

const RadialMenu = () => {
  return (
    <div>
      <button className="cnButton">+</button>
      <div className="cnWrapper">
        <ul>
          <li>
            <a href="#">
              <span className="btn1"></span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="btn2"></span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="btn3"></span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="btn4"></span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="btn5"></span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="btn5"></span>
            </a>
          </li>
        </ul>
      </div>
      <div className="cnOverlay"></div>
    </div>
  );
};

export default RadialMenu;
