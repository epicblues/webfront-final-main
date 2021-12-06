import React, { useState, useRef, forwardRef } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import Link from "next/link";
import { postStaticAxios } from "../../../util/axios";
import ko from "date-fns/locale/ko";
// component
import ChallengeCondition from "../../challenge/Write/ChallengeCondition";
import ChallengeAddImage from "./ChallengeAddImage";
import Modal from "../Write/Modal";
//css
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css";
import InputStyle from "../../../styles/challenge/Input.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button, GridRow, Header } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/dist/client/router";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
registerLocale("ko", ko);

const ChallengeWrite = ({ user }) => {
  const title = useRef();
  const titleError = useRef();
  const dailyCalorie = useRef();
  const dailyCalorieError = useRef();
  const uploadCount = useRef();
  const uploadCountError = useRef();
  const startDateError = useRef();
  const endDateError = useRef();
  const imageError = useRef();
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
  //모달 상태 변경
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

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
            <div>
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
            <div className={ChallengeStyle.h3}>
              <h3>챌린지 이름</h3>
              <input
                className={InputStyle.text}
                type="text"
                name="title"
                placeholder="      챌린지의 이름을 입력해주세요"
                value={challenge.title}
                onChange={(e) => {
                  setChallenge({ ...challenge, title: e.currentTarget.value });
                }}
                ref={title}
              />
            </div>
            <br />
            <div className="description">
              <h3 className={ChallengeStyle.h3}>챌린지의 간략한 설명</h3>
              <textarea
                name="description"
                style={{
                  width: "300px",
                  height: "75px",
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
          </>
        );
      case 3:
        return (
          <>
            <section className="challengDate">
              <h3 className={ChallengeStyle.h3}>챌린지 기간</h3>
              <h3 className={ChallengeStyle.h3}>
                챌린지 진행 기간을 선택해주세요
              </h3>
              <h4 className={ChallengeStyle.h4}>챌린지 시작일</h4>
              <label>
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
              </label>
              <h4 className={ChallengeStyle.h4Mt}>챌린지 종료일</h4>
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
            />
          </>
        );
    }
  }

  const handleSubmit = async () => {
    if (vaildateImageUpload()) return;
    if (!vaildateTitle()) return;
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
        if (!vaildateDailyCalorie()) return;
        delete challengeForm.recipe;
      } else {
        if (!vaildateUploadCount()) return;
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
        <FontAwesomeIcon
          icon={faCalendarAlt}
          size="2x"
          className={InputStyle.image}
        />
        <h4 style={{ whiteSpace: "nowrap" }}>{value}</h4>
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
  const vaildateTitle = () => {
    const titleRegex = /^([가-힣\w\d]+[\.\,]?\s?)+$/;

    if (!titleRegex.test(challenge.title)) {
      alert("챌린지 명을 반드시 입력해주세요");
      return false;
    } else {
      return true;
    }
  };
  const vaildateDailyCalorie = () => {
    const dailyCalorieRegex = /^\d{1,4}$/;
    console.log(dailyCalorie.current.value);
    if (!dailyCalorieRegex.test(challenge.diet.dailyCalorie)) {
      alert("하루 섭취량을 반드시 입력해주세요");
      return false;
    } else {
      return true;
    }
  };
  const vaildateUploadCount = () => {
    const uploadCountRegex = /^\d{1,2}$/;
    console.log(uploadCount.current.value);
    if (!uploadCountRegex.test(challenge.recipe.uploadCount)) {
      alert("업로드 횟수를 반드시 입력해주세요");
      return false;
    } else {
      return true;
    }
  };
  const vaildateImageUpload = () => {
    if (challenge.image === null) {
      alert("이미지를 반드시 업로드해주세요");
      return true;
    } else {
      return false;
    }
  };

  return (
    <form
      className="challengeform"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <header>
        {wizardIndex > 1 ? (
          <>
            <div>
              <Link passHref href="/challenge">
                <p>취소</p>
              </Link>
              <div onClick={button2}>
                <FontAwesomeIcon
                  className={InputStyle.image}
                  icon={faAngleDoubleLeft}
                />
              </div>
            </div>
          </>
        ) : (
          <div>
            <Link passHref href="/challenge">
              <p>취소</p>
            </Link>
          </div>
        )}
      </header>

      {switchWizardForm(wizardIndex)}
      {wizardIndex !== 4 && (
        <Button type="submit" color="twitter" onClick={button1}>
          다음 ({wizardIndex}/4)
        </Button>
      )}
      {wizardIndex == 4 && (
        <>
          <Button
            type="submit"
            color="twitter"
            onClick={
              ((e) => {
                handleSubmit(e);
              },
              openModal)
            }
          >
            작성
          </Button>
          <Modal
            class
            open={modalOpen}
            close={closeModal}
            header="경고창"
          ></Modal>
        </>
      )}
    </form>
  );
};
export default ChallengeWrite;
