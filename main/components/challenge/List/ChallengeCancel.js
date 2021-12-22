import React from "react";
import { Button } from "semantic-ui-react";
import axios from "axios";
import { Router, useRouter } from "next/dist/client/router";
import ButtonStyle from "../../../styles/challenge/Button.module.css";
const ChallengeCancel = ({ challenge, setChallenge }) => {
  const router = useRouter();
  const handleCancel = async (e) => {
    if (confirm("취소하시겠습니까?")) {
      try {
        const { data } = await axios.post(
          "/api/challenge/withdraw/" + challenge._id
        );
        console.log(data);
        alert("취소하셨습니다");
        setChallenge({ ...challenge, ...data.challenge });
        router.push("/challenge");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("그만두셨습니다");
    }
  };
  return (
    <button
      type="submit"
      className={ButtonStyle.button2}
      onClick={handleCancel}
    >
      취소하기
    </button>
  );
};

export default ChallengeCancel;
