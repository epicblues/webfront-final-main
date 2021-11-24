import React, { useState, useRef } from "react";
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
  const title = useRef();
  const titleError = useRef();
  const dailyCalorie = useRef();
  const dailyCalorieError = useRef();
  const uploadCount = useRef();
  const uploadCountError = useRef();
  const startDateError = useRef();
  const endDateError = useRef();

  const [challenge, setChallenge] = useState({
    title: "",
    startDate: null,
    endDate: null,
    dateDiff: 0,
    description: "",
    userId: user.id,
    type: "",
    diet: {
      kind: "",
      dailyCalorie: "",
      condition: 0,
    },
    recipe: {
      category: "",
      uploadCount: "",
    },
  });

  const handleSubmit = async () => {
    if (!vaildateTitle()) return;
    if (challenge.startDate === null) {
      startDateError.current.textContent = "챌린지 시작일을 설정해주세요";
      startDateError.current.style.color = "red";
      return;
    } else if (
      challenge.endDate === null ||
      challenge.endDate < challenge.startDate
    ) {
      endDateError.current.textContent = "챌린지 종료일을 설정해주세요";
      endDateError.current.style.color = "red";
      return;
    } else {
      startDateError.current.textContent = "";
      endDateError.current.textContent = "";
    }

    try {
      const challengeForm = { ...challenge };

      if (challenge.type === "diet") {
        if (!vaildateDailyCalorie()) return;
        delete challengeForm.recipe;
      } else {
        if (!vaildateUploadCount()) return;
        delete challengeForm.diet;
      }

      const { data } = await axios.post("/api/challenge/create", challengeForm);
      console.log(data);

      router.push("/challenge");
    } catch (error) {
      alert(error);
    }
  };
  //날짜 차이 계산
  const getDiffDate = (endDate) => {
    const newDateDiff =
      (endDate.getTime() - new Date(challenge.startDate).getTime()) /
      (1000 * 60 * 60 * 24);
    return newDateDiff;
  };
  const getDiffDate2 = (startDate) => {
    const newDateDiff =
      (new Date(challenge.endDate).getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24);
    return newDateDiff;
  };
  //유효성 검사
  const vaildateTitle = () => {
    const titleRegex = /^([가-힣\w\d]+[\.\,]?\s?)+$/;

    if (!titleRegex.test(title.current.value)) {
      titleError.current.textContent = "챌린지 명을 다시 입력해주세요";
      titleError.current.style.color = "red";
      return false;
    } else {
      titleError.current.textContent = "";
      return true;
    }
  };
  const vaildateDailyCalorie = () => {
    const dailyCalorieRegex = /^\d{1,4}$/;
    console.log(dailyCalorie.current.value);
    if (!dailyCalorieRegex.test(dailyCalorie.current.value)) {
      dailyCalorieError.current.textContent = "하루 섭취량을 다시 입력해주세요";
      dailyCalorieError.current.style.color = "red";
      return false;
    } else {
      dailyCalorieError.current.textContent = "";
      return true;
    }
  };
  const vaildateUploadCount = () => {
    const uploadCountRegex = /^\d{1,2}$/;
    console.log(uploadCount.current.value);
    if (!uploadCountRegex.test(uploadCount.current.value)) {
      uploadCountError.current.textContent = " 업로드 횟수를 다시 입력해주세요";
      uploadCountError.current.style.color = "red";
      return false;
    } else {
      uploadCountError.current.textContent = "";
      return true;
    }
  };

  return (
    <form
      className="challengeform"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      style={{ border: "solid 2px lightgray", borderRadius: "5px" }}
    >
      <Container textAlign="center">
        <h1
          style={{
            color: "#fff",
            backgroundColor: "black",
            fontWeight: "1rem",
            fontFamily: "fantasy",
          }}
        >
          챌린지 작성
        </h1>
        <div className="challengeName" style={{}}>
          <Header
            as="h3"
            style={{
              color: "black",
              fontWeight: "1rem",
              fontFamily: "fantasy",
            }}
          >
            챌린지 이름
          </Header>
          <p ref={titleError}></p>
          <input
            style={{
              color: "#5CD1E5",
              fontWeight: "bold",
              width: "200px",
              border: "solid 2px lightgray",
              borderRadius: "5px",
            }}
            type="text"
            name="title"
            placeholder="챌린지의 이름을 입력해주세요"
            value={challenge.title}
            onChange={(e) => {
              setChallenge({ ...challenge, title: e.currentTarget.value });
            }}
            ref={title}
          />
        </div>

        <br />
        <div className="description">
          <h3
            style={{
              color: "black",
              fontWeight: "1rem",
              fontFamily: "fantasy",
            }}
          >
            챌린지의 간략한 설명
          </h3>
          <textarea
            name="description"
            style={{
              width: "300px",
              height: "75px",
              color: "#5CD1E5",
              fontWeight: "bold",
              border: "solid 2px lightgray",
              borderRadius: "5px",
            }}
            placeholder="나만의 챌린지에 대한 설명을 적어주세요!"
            value={challenge.description}
            onChange={(e) => {
              setChallenge({
                ...challenge,
                description: e.currentTarget.value,
              });
            }}
          ></textarea>
        </div>

        <br />
        <section
          className="challengDate"
          style={{ color: "black", fontWeight: "1rem", fontFamily: "fantasy" }}
        >
          <Header as="h3">챌린지 기간</Header>
          <Header as="h4">챌린지 진행 기간을 선택해주세요</Header>
          <Header as="h4">챌린지 시작일</Header>
          <h4 ref={startDateError}></h4>

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
<<<<<<< HEAD
            placeholderText="챌린지 시작일 선택"
            // minDate={new Date()}
=======
            minDate={new Date()}
>>>>>>> 2f089a5182bbbd111686af4504b3be18f3bc8aec
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

          <Header as="h4" className="challengeDateTitle">
            챌린지 종료일
          </Header>
          <h4 ref={endDateError}></h4>
          <ReactDatePicker
            locale="ko"
            dateFormat="yyyy년 MM월 dd일"
            selected={challenge.endDate}
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

        <br />
        <ChallengeCondition
          challenge={challenge}
          setChallenge={setChallenge}
          dailyCalorie={dailyCalorie}
          dailyCalorieError={dailyCalorieError}
          uploadCount={uploadCount}
          uploadCountError={uploadCountError}
        />
        <br />

        <Button
          type="submit"
          color="twitter"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          작성
        </Button>
      </Container>
    </form>
  );
};

export default ChallengeWrite;
