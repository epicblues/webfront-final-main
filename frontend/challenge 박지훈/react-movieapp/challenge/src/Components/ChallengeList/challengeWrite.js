import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "./ChallengeWrite.css";

const ChallengeWrite = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const { inputStatus, setInputStatus } = useState("");

  const onChangeMessage = (e) => setMessage(e.target.message);

  const changeRadioType1 = (e) => {
    setInputStatus(e.target.value);
  };

  const changeRadioType2 = (e) => {
    setInputStatus(e.target.value);
  };

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
        <button>완료</button>
      </div>
      <div className="challengeKind">
        <h3>챌린지의 종류:</h3>
        <input
          type="radio"
          id="diet"
          name="challenge"
          value="diet"
          checked={inputStatus === " diet"}
          onChange={changeRadioType1}
        />
        <label htmlfor="diet">diet</label>
        <input
          type="radio"
          id="receipe"
          name="challenge"
          value="receipe"
          checked={inputStatus === "reciepe"}
          onChange={changeRadioType2}
        />
        <label htmlfor="receipe">receipe</label>
      </div>
      <section className="ChallengeDate">
        <sectionTitle>챌린지 기간</sectionTitle>
        <br />
        <sectionInfo>챌린지 진행기간을 선택해주세요.</sectionInfo>
        <div>
          <challengeDateTitle>챌린지 시작일:</challengeDateTitle>
          <DatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            mindate={new Date()}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div>
          <challengeDateTitle>챌린지 종료일:</challengeDateTitle>
          <DatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            endDate={endDate}
            minDate={startDate}
          />
        </div>
      </section>
      <div className="ChallengeContent">
        <h3>다이어트,레시피 챌린지 조건</h3>
        <input type="radio" id="diet" name="challenge" value="diet" />
        <label htmlFor="diet">pluskcal</label>
        <input type="radio" id="diet" name="challenge" value="diet" />
        <label htmlFor="receipe">minuskcal</label>
        <br />
        <input type="radio" id="diet" name="challenge" value="diet" />
        <label htmlFor="diet">2000kcal</label>
        <input type="radio" id="diet" name="challenge" value="diet" />
        <label htmlFor="receipe">3000kcal</label>
      </div>
      <button type="submit">작성</button>
    </form>
  );
};

export default ChallengeWrite;
