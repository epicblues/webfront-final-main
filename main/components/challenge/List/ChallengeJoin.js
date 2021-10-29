import React, { useState } from "react";
import { Button } from "semantic-ui-react";

const ChallengeJoin = () => {
  const onClick = (e) => {
    if (confirm("참가하시겠습니가?")) {
      alert("챌린지에 참가하셨습니다.");
    } else {
      alert("취소를 누르셨습니다");
    }
  };
  const onSubmit = (e) => {
    console.log("submit");
  };
  return (
    <Button type="submit" onClick={onClick} onSubmit={onSubmit}>
      참가하기
    </Button>
  );
};

export default ChallengeJoin;
