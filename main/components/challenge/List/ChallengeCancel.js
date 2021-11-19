import React from "react";
import { Button } from "semantic-ui-react";
import axios from "axios";

const ChallengeCancel = ({ challenge, setChallenge }) => {
  const handleCancel = async (e) => {
    if (confirm("취소하시겠습니까?")) {
      try {
        const { data } = await axios.post(
          "/api/challenge/withdraw/" + challenge._id
        );
        console.log(data);
        alert("취소하셨습니다");
        setChallenge({ ...challenge, ...data.challenge });
      } catch (error) {
        alert(error.message);
      }
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
