import React, { cloneElement, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "./ChallengeWrite.css";
import { post } from "axios";

const ChallengeWrite = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [checkedInputs, setCheckedInputs] = useState([]);

  const onChangeMessage = (e) => setMessage(e.target.value);

  const handleChange = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const Challenge = { message, startDate, endDate, checkedInputs };

    console.log(Challenge);
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
    <form onSubmit={handleSubmit} className="challengeform">
      <div className="challengeName">
        <h1>챌린지 작성</h1>
        <h3>챌린지 이름:</h3>
        <input
          type="text"
          name="challengename"
          placeholder="챌린지의 이름을 입력해주세요"
          defaultValue={message}
          onChange={onChangeMessage}
          onKeyPress={onKeyPress}
        />
        <button onClick={onClick}>완료</button>
      </div>
      <div className="challengeKind">
        <h3>챌린지의 종류:</h3>
        <input
          type="radio"
          id="diet"
          name="challenge"
          value="diet"
          onChange={(e) => {
            handleChange(e.currentTarget.checked, "diet");
          }}
          checked={checkedInputs.includes("diet") ? true : false}
        />
        <label htmlfor="diet">diet</label>
        <input
          type="radio"
          id="receipe"
          name="challenge"
          value="receipe"
          onChange={(e) => {
            handleChange(e.currentTarget.checked, "receipe");
          }}
          checked={checkedInputs.includes("receipe") ? true : false}
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
        <input type="radio" id="diet" name="challenge2" value="diet" />
        <label htmlFor="diet">pluskcal</label>
        <input type="radio" id="diet" name="challenge2" value="diet" />
        <label htmlFor="receipe">minuskcal</label>
        <br />
        <input type="radio" id="diet" name="challenge3" value="diet" />
        <label htmlFor="diet">2000kcal</label>
        <input type="radio" id="diet" name="challenge3" value="diet" />
        <label htmlFor="receipe">3000kcal</label>
      </div>
      <button type="submit" value="challenge">
        작성
      </button>
    </form>
  );
};

export default ChallengeWrite;
