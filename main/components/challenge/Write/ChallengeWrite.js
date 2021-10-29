import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ChallengeCondition from "../../challenge/Write/ChallengeCondition";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { Input, Button, Header, Form, Container } from "semantic-ui-react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
registerLocale("ko", ko);
const ChallengeWrite = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [message, setMessage] = useState("");

  const {
    Controller,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    formState,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onChangeMessage = (e) => setMessage(e.target.value);

  {
    /*챌린지 명 기능*/
  }

  const onClick = (e) => {
    alert(message);
    setMessage("");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  console.log(watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="challengeform">
      <Header as="h1" inverted color="yellow">
        챌린지 작성
      </Header>
      <div className="challengeName">
        <Header as="h3" inverted inverted color="orange">
          챌린지 이름:
        </Header>
        <input
          type="text"
          name="challengename"
          placeholder="챌린지의 이름을 입력해주세요"
          defaultValue={message}
          onChange={onChangeMessage}
          onKeyPress={onKeyPress}
          {...register("challengename")}
        />
        <Form.Button onClick={onClick}>완료</Form.Button>
      </div>

      <br />
      <section className="challengDate">
        <Header as="h3" inverted color="orange" className="sectionTitle">
          챌린지 기간
        </Header>
        <Header as="h4" inverted color="orange" className="sectionInfo">
          챌린지 진행 기간을 선택해주세요
        </Header>
        <Header as="h4" inverted color="orange" className="challengeDatetitle">
          챌린지 시작일
        </Header>
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
        <Header as="h4" inverted color="orange" className="challengeDateTitle">
          챌린지 종료일:
        </Header>
        <ReactDatePicker
          locale="ko"
          dateFormat="yyyy년 MM월 dd일"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          endDate={endDate}
          minDate={startDate}
        />
      </section>
      <ChallengeCondition></ChallengeCondition>
      <Button type="submit">작성</Button>
    </form>
  );
};

export default ChallengeWrite;
