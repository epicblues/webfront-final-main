import React, { useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { Input, Button, Segment, Header, Radio } from "semantic-ui-react";

registerLocale("ko", ko);
const ChallengeWrite = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [checkedInputs, setCheckInputs] = useState([]);

  const onChangeMessage = (e) => setMessage(e.target.value);

  {
    /*챌린지 명 기능*/
  }
  const handleChange = (checked, id) => {
    if (checked) {
      setCheckInputs([...checkedInputs, id]);
    } else {
      setCheckInputs(checkedInputs.filter((el) => el !== id));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const challenges = [message, startDate, endDate, checkedInputs];
    console.log(challenges);
  };
  const onClick = (e) => {
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
      <Segment basic padded="very" vertical>
        <Header as="h1">챌린지 작성</Header>
        <div className="challengeName">
          <Header as="h3">챌린지 이름:</Header>
          <Input
            focus
            type="text"
            name="challengename"
            placeholder="챌린지의 이름을 입력해주세요"
            defaultValue={message}
            onChange={onChangeMessage}
            onKeyPress={onKeyPress}
          />
          <Button onClick={onClick}>완료</Button>
        </div>
        <br />
        <div className="challengeKind">
          <Header as="h3">챌린지의 종류</Header>
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
          <label label htmlFor="diet">
            diet
          </label>
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
          <label htmlFor="receipe">receipe</label>
        </div>
        <section className="challenDate">
          <sectionTitle>챌린지 기간</sectionTitle>
          <br />
          <sectionInfo>챌린지 진행 기간을 선택해주세요</sectionInfo>
          <div>
            <challengeDatetitle>챌린지 시작일</challengeDatetitle>
            <ReactDatePicker
              locale="ko"
              dateFormat="yyyy년 MM월 dd일"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              minDate={new Date()}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div>
            <challengeDateTitle>챌린지 종료일:</challengeDateTitle>
            <ReactDatePicker
              locale="ko"
              dateFormat="yyyy년 MM월 dd일"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              endDate={endDate}
              minDate={startDate}
            />
          </div>
        </section>
        <button type="submit" value="challenges">
          작성
        </button>
      </Segment>
    </form>
  );
};

export default ChallengeWrite;
