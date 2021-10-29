import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  const [checkedInputs, setCheckInputs] = useState([]);
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
  const onChangeChecked = (checkedInputs) => {
    if (checkedInputs === "receipe") {
      return (radio.name = "receipeKind");
    } else {
      return (raido.name = "dietKind");
    }
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
      <Header as="h3" inverted color="orange" className="challengeContent">
        챌린지 조건
      </Header>
      <div className="challengeKind">
        <Header as="h4" inverted color="orange">
          챌린지의 종류
        </Header>
        <input
          type="radio"
          id="1"
          name="challenge"
          value="diet"
          onChange={(e) => {
            handleChange(e.currentTarget.checked, "diet");
          }}
          checked={checkedInputs.includes("diet") ? true : false}
        />
        <label> diet</label>

        <input
          type="radio"
          id="2"
          name="challenge"
          value="receipe"
          onChange={(e) => {
            handleChange(e.currentTarget.checked, "receipe");
          }}
          checked={checkedInputs.includes("receipe") ? true : false}
        />
        <label>receipe</label>
      </div>
      <Header as="h4" inverted color="orange">
        레시피 종류
      </Header>
      <div className="receipeKind">
        <input
          type="radio"
          id="3"
          name="ReceipeKind"
          value="korean"
          onChange={(e) => {
            handleChange(e.currentTarget.checked, "korean");
          }}
          checked={checkedInputs.includes("korean") ? true : false}
          {...register("checkedReceipe")}
        />
        <label>한식</label>

        <input
          type="radio"
          id="4"
          name="ReceipeKind"
          value="western"
          onChange={(e) => {
            handleChange(e.currentTarget.checked, "western");
          }}
          checked={checkedInputs.includes("western") ? true : false}
          {...register("checkedReceipe")}
        />
        <label>양식</label>

        <input
          type="radio"
          id="5"
          name="ReceipeKind"
          value="chinese"
          onChange={(e) => {
            handleChange(e.currentTarget.checked, "chinese");
          }}
          checked={checkedInputs.includes("chinese") ? true : false}
          {...register("checkedReceipe")}
        />
        <label>중식</label>
        <input
          type="radio"
          id="6"
          name="ReceipeKind"
          value="japanese"
          onChange={(e) => {
            handleChange(e.currentTarget.checked, "japanese");
          }}
          checked={checkedInputs.includes("japanese") ? true : false}
          {...register("checkedReceipe")}
        />
        <label>일식</label>
      </div>
      <Header as="h4" inverted color="orange">
        다이어트 종류
      </Header>
      <div className="dietKind">
        <input
          type="radio"
          id="7"
          name="DietKind"
          value="plusKcal"
          onChange={(e) => {
            handleChange(e.currentTarget.checked, "plusKcal");
          }}
          checked={checkedInputs.includes("plusKcal") ? true : false}
          {...register("checkedDiet")}
        />
        <label>살 찌우는 다이어트</label>
        <input
          type="radio"
          id="8"
          name="DietKind"
          value="minusKcal"
          onChange={(e) => {
            handleChange(e.currentTarget.checked, "minusKcal");
          }}
          checked={checkedInputs.includes("minusKcal") ? true : false}
          {...register("checkedDiet")}
        />
        <label>살 빼는 다이어트</label>
      </div>
      <Button type="submit">작성</Button>
    </form>
  );
};

export default ChallengeWrite;
