import React, { useState, useRef } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { postStaticAxios } from "../../../util/axios";
import ko from "date-fns/locale/ko";
// component
import ChallengeCondition from "../../challenge/Write/ChallengeCondition";
import ChallengeAddImage from "./ChallengeAddImage";
//css
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css";
import InputStyle from "../../../styles/challenge/Input.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { GoCalendar } from "react-icons/go";
import { useRouter } from "next/dist/client/router";
import ButtonStyles from "../../../styles/challenge/Button.module.css";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
registerLocale("ko", ko);

const ChallengeWrite = ({ user }) => {
  const ref = useRef();
  const title = useRef();
  const dailyCalorie = useRef();
  const dailyCalorieError = useRef();
  const uploadCount = useRef();
  const uploadCountError = useRef();
  const router = useRouter();
  const [challenge, setChallenge] = useState({
    title: "",
    startDate: null,
    endDate: null,
    dateDiff: 0,
    description: "",
    userId: user.id,
    type: "",
    image: null,
    imageBuffer: null,
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

  // 챌린지 작성 마법사 페이지
  const [wizardIndex, setWizardIndex] = useState(1);
  const button1 = () => {
    wizardIndex <= 4 ? setWizardIndex(wizardIndex + 1) : null;
  };
  const button2 = () => {
    wizardIndex > 1 ? setWizardIndex(wizardIndex - 1) : null;
  };
  function switchWizardForm(param) {
    switch (param) {
      case 1:
        return (
          <>
            <div className={ChallengeStyle.form}>
              <ChallengeAddImage
                challenge={challenge}
                setChallenge={setChallenge}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div style={{ padding: "1rem" }}>
              <div style={{ height: "10vh", marginTop: "1rem" }}>
                <h3 className={ChallengeStyle.h3}>챌린지 이름</h3>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    className={InputStyle.text}
                    type="text"
                    name="title"
                    placeholder="  챌린지의 이름을 입력해주세요"
                    value={challenge.title}
                    onChange={(e) => {
                      setChallenge({
                        ...challenge,
                        title: e.currentTarget.value,
                      });
                    }}
                    ref={title}
                  />
                </div>
              </div>
              <br />
              <div style={{ height: "30vh" }}>
                <div>
                  <h3
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      font: "normal 600 1.4rem/36px Noto Sans KR",
                    }}
                  >
                    챌린지의 간략한 설명
                  </h3>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <textarea
                    className={InputStyle.textArea}
                    name="description"
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
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <section style={{ padding: "1rem" }}>
              <div style={{ height: "5vh", marginTop: "10px" }}>
                <h3 className={ChallengeStyle.h3}>챌린지 기간</h3>
              </div>
              <div style={{ height: "10vh" }}>
                <h3 className={ChallengeStyle.h4T}>
                  챌린지 진행 기간을 선택해주세요
                </h3>
              </div>
              <h4 className={ChallengeStyle.h4}>챌린지 시작일</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  height: "10vh",
                  marginTop: "10px",
                  position: "relative",
                  right: "8px",
                }}
              >
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
                  customInput={<DateCustomImage />}
                  selectsStart
                  // minDate={new Date()}
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
              </div>
              <h4 className={ChallengeStyle.h4Mt}>챌린지 종료일</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  height: "10vh",
                  marginTop: "10px",
                  position: "relative",
                  right: "8px",
                }}
              >
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
                  customInput={<DateCustomImage />}
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
              </div>
            </section>
          </>
        );
      case 4:
        return (
          <>
            <ChallengeCondition
              challenge={challenge}
              setChallenge={setChallenge}
              dailyCalorie={dailyCalorie}
              dailyCalorieError={dailyCalorieError}
              uploadCount={uploadCount}
              uploadCountError={uploadCountError}
              className={ChallengeStyle.form}
            />
          </>
        );
    }
  }

  const handleSubmit = async () => {
    if (validateImageUpload()) return;
    if (!validateTitle()) return;
    if (challenge.startDate === null) {
      return;
    } else if (
      challenge.endDate === null ||
      challenge.endDate < challenge.startDate
    ) {
      return;
    } else {
    }

    try {
      const challengeForm = { ...challenge };
      delete challengeForm.imageBuffer;
      if (challenge.type === "diet") {
        if (!validateDailyCalorie()) return;
        delete challengeForm.recipe;
      } else {
        if (!validateUploadCount()) return;
        delete challengeForm.diet;
      }
      const formData = new FormData();
      Object.keys(challengeForm).forEach((key) => {
        formData.append(
          key,
          ["recipe", "diet"].includes(key)
            ? JSON.stringify(challengeForm[key])
            : challengeForm[key]
        );
      });

      const { data } = await postStaticAxios(
        "/api/challenge/create",
        user.token,
        formData
      );
      console.log(data);

      router.push("/challenge");
    } catch (error) {}
  };
  //커스텀 데이트 피커
  const DateCustomImage = ({ onClick, value }) => {
    return (
      <div className="customImage" onClick={onClick} value={value}>
        <GoCalendar size="3rem" />
        <h4
          style={{
            whiteSpace: "nowrap",
            position: "relative",
            right: "40px",
            bottom: "1rem",
          }}
        >
          {value}
        </h4>
      </div>
    );
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
  const validateTitle = () => {
    const titleRegex = /^([가-힣\w\d]+[\.\,]?\s?)+$/;

    if (!titleRegex.test(challenge.title)) {
      alert("챌린지 명을 반드시 입력해주세요");
      return false;
    } else {
      return true;
    }
  };
  const validateDailyCalorie = () => {
    const dailyCalorieRegex = /^\d{1,4}$/;
    console.log(dailyCalorie.current.value);
    if (!dailyCalorieRegex.test(challenge.diet.dailyCalorie)) {
      alert("하루 섭취량을 반드시 입력해주세요");
      return false;
    } else {
      return true;
    }
  };
  const validateUploadCount = () => {
    const uploadCountRegex = /^\d{1,2}$/;
    console.log(uploadCount.current.value);
    if (!uploadCountRegex.test(challenge.recipe.uploadCount)) {
      alert("업로드 횟수를 반드시 입력해주세요");
      return false;
    } else {
      return true;
    }
  };
  const validateImageUpload = () => {
    if (challenge.image === null) {
      alert("이미지를 반드시 업로드해주세요");
      return true;
    } else {
      return false;
    }
  };

  return (
    <form
      className="challengeForm"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {switchWizardForm(wizardIndex)}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: " 1rem",
        }}
      >
        {wizardIndex !== 4 && (
          <>
            <button
              className={ButtonStyles.button1}
              type="submit"
              onClick={button2}
            >
              이전
            </button>
            <button
              className={ButtonStyles.button2}
              type="submit"
              onClick={button1}
            >
              다음 ({wizardIndex}/4)
            </button>
          </>
        )}

        {wizardIndex == 4 && (
          <>
            <button
              className={ButtonStyles.button1}
              type="submit"
              onClick={button2}
            >
              이전
            </button>
            <button
              className={ButtonStyles.button2}
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              작성
            </button>
          </>
        )}
      </div>
    </form>
  );
};
export default ChallengeWrite;
