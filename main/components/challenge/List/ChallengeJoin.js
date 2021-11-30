import axios from "axios";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";

const ChallengeJoin = ({ challenge, setChallenge }) => {
  const handleJoin = async (e) => {
    if (confirm("참가하시겠습니까?")) {
      try {
        const { data } = await axios.post(
          "/api/challenge/join/" + challenge._id
        );
        console.log(data);
        alert("챌린지에 참가하셨습니다.");
        setChallenge({ ...challenge, ...data.challenge });
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("취소를 누르셨습니다");
    }
  };

  return (
    <Button type="submit" color="twitter" onClick={handleJoin}>
      참가하기
    </Button>
  );
};

export default ChallengeJoin;
