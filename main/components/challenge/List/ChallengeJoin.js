import React from "react";
import ButtonStyle from "../../../styles/challenge/Button.module.css";
import { postStaticAxios } from "../../../util/axios";

const ChallengeJoin = ({ challenge, setChallenge, user }) => {
  const handleJoin = async (e) => {
    if (confirm("참가하시겠습니까?")) {
      try {
        const { data } = await postStaticAxios(
          "/api/challenge/join?id=" + challenge._id,
          user.token
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
    <button type="submit" className={ButtonStyle.join} onClick={handleJoin}>
      참가하기
    </button>
  );
};

export default ChallengeJoin;
