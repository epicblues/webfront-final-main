import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ChallengeWrite = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const onChangeMessage = (e) => setMessage(e.target.message);

  const onClick = () => {
    alert(message);
    setMessage("");
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  return (
    <form className="challengeform">
      <div className="challengeName">
        <h1>챌린지 작성</h1>
        <h3>챌린지 이름:</h3>
        <input
          type="text"
          name="challengename"
          placeholder="챌린지의 이름을 입력해주세요"
          value={message}
          onChange={onChangeMessage}
          onKeyPress={onKeyPress}
        />
        <button onClick={onClick}>완료</button>
      </div>
      <div className="challengeKind">
        <h3>챌린지의 종류:</h3>
        <input type="radio" id="diet" name="challenge" value="diet" />
        <label for="diet">diet</label>
        <input type="radio" id="receipe" name="challenge" value="receipe" />
        <label for="receipe">receipe</label>
      </div>
      <section className="ChallengeDate">
        <sectionTitle>챌린지 기간</sectionTitle>
        <h3> 챌린지 기간</h3>
        <sectionInfo>챌린지 진행기간을 선택해주세요.</sectionInfo>
        <div>
          <challegeDateTitle>챌린지 시작일:</challegeDateTitle>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div>
          <challegeDateTitle>챌린지 종료일:</challegeDateTitle>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            endDate={endDate}
            minDate={startDate}
          />
        </div>
      </section>
      <button type="submit">작성</button>
    </form>
  );
};

export default ChallengeWrite;
