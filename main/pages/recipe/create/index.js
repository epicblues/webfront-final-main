import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { getUserOrRedirect } from "../../../util/auth";
import { postStaticAxios } from "../../../util/axios";
import Head from "next/head";

// --- Component ---
// 계량팁 Modal
import MeasuringModal from "../../../components/recipe/create/food/MeasuringModal";
import MeasuringModalBlackout from "../../../components/recipe/create/food/MeasuringModalBlackout";

// 화면 상단 내비게이터
import FormNavigator from "../../../components/recipe/create/FormNavigator";

// 등록 마법사 Component
// wizard 1
// 따로 분리하지 않음, react-hook-form으로 기본 정보 처리와
// 페이지 내에서 하위 컴포넌트의 Props 종합하여 FormData 전송하는 역할
// wizard 2
import FoodForm from "../../../components/recipe/create/food/FoodForm";
import AddFoodModalBlackout from "../../../components/recipe/create/food/AddFoodModalBlackout";
// wizard 3
import StepForm from "../../../components/recipe/create/step/StepForm";
// wizard 4
import ConfirmForm from "../../../components/recipe/create/food/ConfirmForm";

//CSS
import createStyles from "../../../styles/recipe/Create.module.css";

//  작성폼
export const Index = ({ user }) => {
  // wizard1 및 최상위 Form의 react-hook-form 함수
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 라우터
  const router = useRouter();

  //  계량 팁 Modal, index에 따른 렌더링 함수
  const [isMeasuringModalVisible, setIsMeasuringModalVisible] = useState(true);
  const [indexMeasuringModal, setIndexMeasuringModal] = useState(0);
  const handleSetIsMeasuringModalVisible = (active) => {
    setIndexMeasuringModal(0);
    setIsMeasuringModalVisible(active);
  };

  // Wizard2의 FoodForm의 재료추가하기 Modal, 렌더링 로직
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleSetIsModalVisible = (active) => {
    setIsModalVisible(active);
  };

  // 레시피 등록 마법사 페이지 카운터 및 이동 버튼
  const [wizardIndex, setWizardIndex] = useState(1);
  const button1 = () => {
    wizardIndex < 4 ? setWizardIndex(wizardIndex + 1) : null;
  };
  const button2 = () => {
    wizardIndex > 1 ? setWizardIndex(wizardIndex - 1) : null;
  };

  // 레시피 마법사 조건부 렌더링 wizard 1~4
  function switchWizardForm(param) {
    switch (param) {
      case 1:
        return (
          <div className={createStyles.wizard1}>
            <div className={createStyles.label}>
              <label htmlFor="title">요리명</label>
            </div>
            <div className={createStyles.input}>
              <input
                id="title"
                type="text"
                placeholder=" ex) 소고기 미역국"
                {...register("title", { required: true, maxLength: 15 })}
              />
              {errors.title && errors.title.type === "required" && (
                <span>제목을 입력해주세요.</span>
              )}
              {errors.title && errors.title.type === "maxLength" && (
                <span>제목은 15글자 이내로 입력해주세요.</span>
              )}
              <br />
            </div>
            <div className={createStyles.label}>
              <label>요리소개</label>
            </div>
            <div className={createStyles.input}>
              <textarea
                id="desc"
                type="text"
                cols="40"
                rows="5"
                placeholder="레시피에 대한 설명을 적어주세요. &#13;&#10;ex) 어머니로부터 배운 미역국 레시피를아내의 입맛에 맞게 고안했습니다."
                {...register("desc", { required: true, maxLength: 200 })}
              />
              {errors.desc && errors.desc.type === "required" && (
                <span>요리소개를 입력해주세요.</span>
              )}
              {errors.desc && errors.desc.type === "maxLength" && (
                <span>제목은 200글자 이내로 입력해주세요.</span>
              )}
              <br />
            </div>
            <div className={createStyles.label}>
              <label>카테고리</label>
            </div>
            <div className={createStyles.input}>
              <select {...register("category")}>
                <option value="soup">국/탕/찌개</option>
                <option value="grill">구이</option>
                <option value="noodle">면/파스타</option>
                <option value="rice">밥/볶음밥</option>
                <option value="side">반찬</option>
                <option value="kimchi">김치</option>
                <option value="dessert">디저트</option>
                <option value="etc">기타</option>
              </select>
              <br />
            </div>
            <div className={createStyles.label}>
              <label>인원</label>
            </div>
            <div className={createStyles.input}>
              <select {...register("qtt")}>
                <option value="1">1인분</option>
                <option value="2">2인분</option>
                <option value="3">3인분</option>
                <option value="4">4인분</option>
                <option value="5">5인분 이상</option>
              </select>
              <br />
            </div>
            <div className={createStyles.label}>
              <label>시간</label>
            </div>
            <div className={createStyles.input}>
              <select {...register("duration")}>
                <option value="1">10분 이내</option>
                <option value="2">10분 ~ 30분</option>
                <option value="3">30분 ~ 1시간</option>
                <option value="4">1시간 ~ 2시간</option>
                <option value="5">2시간 이상</option>
              </select>
              <br />
            </div>
          </div>
        );
      case 2:
        return (
          <FoodForm
            foodData={foodData}
            setFoodData={setFoodData}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            nutritionData={nutritionData}
            setNutritionData={setNutritionData}
            handleSetIsMeasuringModalVisible={handleSetIsMeasuringModalVisible}
          />
        );
      case 3:
        return <StepForm stepData={stepData} setStepData={setStepData} />;
      case 4:
        return <ConfirmForm stepData={stepData} />;
    }
  }

  // 데이터
  const [foodData, setFoodData] = useState([]); //  재료
  const [stepData, setStepData] = useState([]); //  요리순서
  const [nutritionData, setNutritionData] = useState({
    //  영양정보
    kcal: 0,
    carbs: 0,
    sugars: 0,
    prot: 0,
    fat: 0,
    stdfat: 0,
    trnfat: 0,
    chole: 0,
    sodium: 0,
  });

  // react-hook-form의 <form>의 최종 Submit 핸들링
  const submitBtnClick = async (data) => {
    if (foodData.length === 0) {
      alert("재료를 입력해주세요");
    } else if (stepData.length === 0) {
      alert("조리 순서를 최소 1개 이상 등록해주세요.");
    } else {
      const date = new Date();

      // react-hook-form와
      // 각 컴포넌트에서 모인 데이터들 json형태로 종합
      let finalRecipeData = {
        upload_date: date,
        update_date: date,
        title: data.title,
        desc: data.desc,
        hit: 0,
        category: data.category,
        qtt: Number(data.qtt),
        totalNutrition: JSON.stringify(nutritionData), //  레시피 칼로리 총합
        duration: data.duration,
        igr_array: foodData.map((food) => {
          return `${food.foodObj.no}/${food.quantity}`;
        }), //  음식(재료) 객체의 배열
        stepData: JSON.stringify(
          stepData.map((step) => {
            return { desc: step.stepDesc };
          })
        ), // 조리순서 객체 배열
      };

      // FormData 인스턴스 생성 및 데이터 추가
      const formData = new FormData();
      for (let key in finalRecipeData) {
        formData.append(key, finalRecipeData[key]);
      }
      // 파일명과 stepImageFile (type = file)
      stepData.forEach((step, index) => {
        formData.append(`step_img_${index + 1}`, step.stepImageFile);
      });
      // API 요청
      try {
        const { data } = await postStaticAxios(
          "/api/recipe/create",
          user.token,
          formData
        );
        console.log(data);
        router.push(`/recipe/card/${data.status}`);
      } catch (error) {
        alert(error);
      }
    }
  };
  return (
    <div className={createStyles.container}>
      {/* SEO를 위한 Head */}
      <Head>
        <title>요건 다 내꺼! - 레시피 작성하기</title>
      </Head>
      {isMeasuringModalVisible && (
        <>
          <MeasuringModal
            indexMeasuringModal={indexMeasuringModal}
            setIndexMeasuringModal={setIndexMeasuringModal}
            setIsMeasuringModalVisible={setIsMeasuringModalVisible}
          />
          <MeasuringModalBlackout
            handleSetIsMeasuringModalVisible={handleSetIsMeasuringModalVisible}
          />
        </>
      )}
      {isModalVisible && (
        <AddFoodModalBlackout
          handleSetIsModalVisible={handleSetIsModalVisible}
        />
      )}
      <div className={createStyles.header}>
        <div className={createStyles.h1}>레시피 등록하기</div>
      </div>
      {/* 상단 내비게이션 */}
      <FormNavigator
        wizardIndex={wizardIndex}
        setWizardIndex={setWizardIndex}
      />
      {/* react-hook-form */}
      <div className={createStyles.wizardContainer}>
        <form onSubmit={handleSubmit(submitBtnClick)}>
          {switchWizardForm(wizardIndex)}
        </form>
        {/* footer */}
        <div className={createStyles.footer}>
          <button
            className={createStyles.button2}
            type="button"
            onClick={button2}
          >
            이전
          </button>
          {wizardIndex !== 4 && (
            <>
              <button
                className={createStyles.button1}
                type="button"
                onClick={button1}
              >
                다음
              </button>
            </>
          )}
          {/* react-hook-form 최종 Submit */}
          {wizardIndex == 4 && (
            <button
              className={createStyles.button1}
              onClick={handleSubmit(submitBtnClick)}
            >
              글쓰기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);
  return { props: { user } };
};

export default Index;
