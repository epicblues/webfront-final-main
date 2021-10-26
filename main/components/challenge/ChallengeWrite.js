import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { Input, Button, Segment, Header, Form, Radio } from "semantic-ui-react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
registerLocale("ko", ko);
const ChallengeWrite = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [checkedInputs, setCheckInputs] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

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
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="challengeform"
      widths="equal"
    >
      <Header as="h1" textAlign="center">
        챌린지 작성
      </Header>
      <div className="challengeName">
        <Header as="h3" textAlign="center">
          챌린지 이름:
        </Header>
        <Form.Input
          focus
          type="text"
          name="challengename"
          placeholder="챌린지의 이름을 입력해주세요"
          defaultValue={message}
          onChange={onChangeMessage}
          onKeyPress={onKeyPress}
        />
        <Form.Button onClick={onClick}>완료</Form.Button>
      </div>

      <br />
      <Form.Group inline>
        <div className="challengeKind">
          <Header as="h3" textAlign="center">
            챌린지의 종류
          </Header>
          <Form.Input
            label="diet"
            type="radio"
            id="diet"
            name="challenge"
            value="diet"
            onChange={(e) => {
              handleChange(e.currentTarget.checked, "diet");
            }}
            checked={checkedInputs.includes("diet") ? true : false}
          />

          <Form.Input
            label="receipe"
            type="radio"
            id="receipe"
            name="challenge"
            value="receipe"
            onChange={(e) => {
              handleChange(e.currentTarget.checked, "receipe");
            }}
            checked={checkedInputs.includes("receipe") ? true : false}
          />
        </div>
      </Form.Group>
      <section className="challengDate">
        <Header as="h3" className="sectionTitle" textAlign="center">
          챌린지 기간
        </Header>
        <Header as="h4" className="sectionInfo" textAlign="center">
          챌린지 진행 기간을 선택해주세요
        </Header>
        <Header as="h4" className="challengeDatetitle" textAlign="center">
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
        <Header as="h4" className="challengeDateTitle" textAlign="center">
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

      <Button type="submit" value="challenges">
        작성
      </Button>
    </Form>
  );
};

export default ChallengeWrite;
