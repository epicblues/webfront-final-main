import React from "react";
import Router from "next/router";

const GoBackward = () => {
  return (
    <div>
      <button onClick={() => Router.back()}>뒤로가기</button>
    </div>
  );
};

export default GoBackward;
