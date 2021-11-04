import React, { useState } from "react";
import Link from "next/link";
import ChallengeCondition from "../../challenge/Write/ChallengeCondition";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { Button, Header, Form, Container } from "semantic-ui-react";
import axios from "axios";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
registerLocale("ko", ko);
const ChallengeWrite = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const onChangeMessage = (e) => setMessage(e.target.value);

  {
    /*챌린지 명 기능*/
  }

  const onClick = (e) => {
    alert(message);
    setMessage("");
    console.log([message]);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  const onSubmit = (e) => {
    axios.post("url", {
      startDate: "",
      endDate: "",
      message: "",
    });
  };

  return (
    <form
      className="challengeform"
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
            name="challengename"
            placeholder="챌린지의 이름을 입력해주세요"
            defaultValue={message}
            onChange={onChangeMessage}
            onKeyPress={onKeyPress}
          />
          <div>
            <Form.Button type="button" onClick={onClick} color={"twitter"}>
              완료
            </Form.Button>
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
            locale="ko"
            dateFormat="yyyy년 MM월 dd일"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            onSelect={console.log([startDate])}
            withPortal
          />

          <Header as="h4" inverted color="blue" className="challengeDateTitle">
            챌린지 종료일
          </Header>

          <ReactDatePicker
            locale="ko"
            dateFormat="yyyy년 MM월 dd일"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            endDate={endDate}
            minDate={startDate}
            onSelect={console.log([endDate])}
            withPortal
          />
        </section>
        <ChallengeCondition></ChallengeCondition>
        <Link href="/challenge/list">
          <Button type="submit" value="submit" color="twitter">
            작성
          </Button>
        </Link>
      </Container>
    </form>
  );
};

export default ChallengeWrite;
