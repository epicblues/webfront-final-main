import React, { useState, useEffect } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { Button, Header, Container } from "semantic-ui-react";
import ChallengeCondition from "../../challenge/Write/ChallengeCondition";
import axios from "axios";
import { useRouter } from "next/dist/client/router";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
registerLocale("ko", ko);

const ChallengeWrite = ({ user }) => {
  const router = useRouter();

  const [challenge, setChallenge] = useState({
    title: "",
    startDate: null,
    endDate: null,
    dateDiff: 0,

    userId: user.id,
    type: "",
    diet: {
      kind: "",
      dailyCalorie: "",
      condition: 0,
    },
    recipe: {
      kind: "",
      uploadCount: "",
    },
  });

  const handleSubmit = async () => {
    try {
      const challengeForm = { ...challenge };
      if (challenge.type === "diet") {
        delete challengeForm.recipe;
      } else {
        delete challengeForm.diet;
      }
      const { data } = await axios.post("/api/challenge/create", challengeForm);
      console.log(data);

      router.push("/challenge");
    } catch (error) {
      alert(error);
    }
  };

  const onClick = (e) => {
    alert(challenge.title);
    e.preventDefault();
    e.currentTarget.disabled = true;
    console.log(challenge.title);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  const getDiffDate = (endDate) => {
    const newDateDiff =
      (endDate.getTime() - challenge.startDate.getTime()) /
      (1000 * 60 * 60 * 24);
    return newDateDiff;
  };
  const getDiffDate2 = (startDate) => {
    const newDateDiff =
      (challenge.endDate.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24);
    return newDateDiff;
  };
  return (
    <form
      className="challengeform"
      onSubmit={(e) => {
        e.preventDefault();
      }}
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
          <Header as="h3" inverted color="blue">
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
            value={challenge.title}
            onChange={(e) => {
              setChallenge({ ...challenge, title: e.currentTarget.value });
            }}
            onKeyPress={onKeyPress}
          />
          <div>
            <Button
              disabled=""
              type="button"
              onClick={onClick}
              color={"twitter"}
            >
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
            locale="ko"
            dateFormat="yyyy년 MM월 dd일"
            selected={challenge.startDate}
            onChange={(date) => {
              const newDateDiff = getDiffDate2(date);
              setChallenge({
                ...challenge,
                startDate: date,
                dateDiff: newDateDiff,
              });
            }}
            selectsStart
            placeholderText="챌린지 시작일 선택"
            minDate={new Date()}
            startDate={challenge.startDate}
            endDate={challenge.endDate}
            withPortal
            popperModifier={{
              //모바일 web환경에서 화면을 벗어나지 않도록 하는 설정
              preventOverflow: {
                enabled: true,
              },
            }}
            popperPlacement="auto" // 화면 중앙에 팝업
          />

          <Header as="h4" inverted color="blue" className="challengeDateTitle">
            챌린지 종료일
          </Header>

          <ReactDatePicker
            locale="ko"
            dateFormat="yyyy년 MM월 dd일"
            selected={challenge.endDate}
            placeholderText="챌린지 종료일 선택"
            onChange={(date) => {
              const newDateDiff = getDiffDate(date);
              setChallenge({
                ...challenge,
                endDate: date,
                dateDiff: newDateDiff,
              });
            }}
            selectsEnd
            endDate={challenge.endDate}
            minDate={challenge.startDate}
            withPortal
            popperModifier={{
              //모바일 web환경에서 화면을 벗어나지 않도록 하는 설정
              preventOverflow: {
                enabled: true,
              },
            }}
            popperPlacement="auto" // 화면 중앙에 팝업
          />
        </section>
        <ChallengeCondition challenge={challenge} setChallenge={setChallenge} />
        <Button type="submit" color="twitter" onClick={handleSubmit}>
          작성
        </Button>
      </Container>
    </form>
  );
};

export default ChallengeWrite;
