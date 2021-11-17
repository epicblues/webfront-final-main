import React from "react";
import { Button } from "semantic-ui-react";

const ChallengeCancel = () => {
  const handleCancel = (e) => {
    if (confirm("취소하시겠습니까?")) {
      alert("취소하셨습니다");
    } else {
      alert("그만두셨습니다");
    }
  };
  return (
    <Button type="submit" color="twitter" onClick={handleCancel}>
      취소하기
    </Button>
  );
};

export default ChallengeCancel;
