import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { Dropdown, Button, Header, Form, Container } from "semantic-ui-react";
import ChallengeCondition from "../../challenge/Write/ChallengeCondition";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
registerLocale("ko", ko);

const ChallengeWrite = () => {
  const [checkedInputs, setCheckInputs] = useState(false);
  const [checkedInputs2, setCheckInputs2] = useState(false);
  const [checkedInputs3, setCheckInputs3] = useState(false);
  const [checkedInputs4, setCheckInputs4] = useState(false);
  const [checkedInputs5, setCheckInputs5] = useState(false);
  const [dropdown, setDropDown] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [challenge, setChallenge] = useState({
    title: "",
    startDate: "",
    endDate: "",

    checkedInputs: "",
    diet: {
      type: "",
      dailyCalorie: "",
      condition: "",
    },
    receipe: {
      kind: "",
      uploadCount: "",
    },
  });

  {
    /*챌린지 명 기능*/
  }
  const resetForm = () => {
    setMessage("");
    setEndDate("");
    setStartDate("");
    setCheckInputs(false);
    setCheckInputs2(false);
    setCheckInputs3(false);
    setCheckInputs4(false);
    setCheckInputs5(false);
    setDropDown("");
  };

  const onClick = (e) => {
    alert(message);
    e.preventDefault();
    console.log(message);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    resetForm();
    console.log(challenge);
  };

  return (
    <form
      className="challengeform"
      onSubmit={onSubmit}
      style={{
        backgroundColor: "#F6F6F6",
      }}
    >
      <Container textAlign="center">
        <h1
          style={{
            color: "#6B66FF",
            backgroundColor: "#EAEAEA",
          }}
        >
          챌린지 작성
        </h1>
        <div
          className="challengeName"
          style={{
            backgroundColor: "#EAEAEA",
          }}
        >
          <Header as="h3" inverted inverted color="blue">
            챌린지 이름
          </Header>
          <input
            style={{
              color: "#5CD1E5",
              fontWeight: "bold",
              border: "3px solid",
              width: "200px",
              borderRadius: "5px",
              borderColor: "#6B66FF",
            }}
            type="text"
            name="title"
            placeholder="챌린지의 이름을 입력해주세요"
            value={message}
            onChange={(e) => {
              setMessage(e.currentTarget.value),
                setChallenge({ title: message });
            }}
            onKeyPress={onKeyPress}
          />
          <div>
            <Button type="button" onClick={onClick} color={"twitter"}>
              완료
            </Button>
          </div>
        </div>

        <br />
        <section
          className="challengDate"
          style={{ backgroundColor: "#EAEAEA" }}
        >
          <Header as="h3" inverted color="blue" className="sectionTitle">
            챌린지 기간
          </Header>
          <Header as="h4" inverted color="blue" className="sectionInfo">
            챌린지 진행 기간을 선택해주세요
          </Header>
          <Header as="h4" inverted color="blue" className="challengeDatetitle">
            챌린지 시작일
          </Header>

          <ReactDatePicker
            name="startDate"
            locale="ko"
            dateFormat="yyyy년 MM월 dd일"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            withPortal
          />

          <Header as="h4" inverted color="blue" className="challengeDateTitle">
            챌린지 종료일
          </Header>

          <ReactDatePicker
            name="endDate"
            locale="ko"
            dateFormat="yyyy년 MM월 dd일"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            endDate={endDate}
            minDate={startDate}
            withPortal
          />
        </section>
        <ChallengeCondition challenge={challenge} setChallenge={setChallenge} />
        <Button type="submit" color="twitter">
          작성
        </Button>
      </Container>
    </form>
  );
};

export default ChallengeWrite;
