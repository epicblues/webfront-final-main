import React from "react";
import Image from "next/dist/client/image";

//  CSS
import measuringModalStyles from "../../../../styles/recipe/MeasuringModal.module.css";

import tip00 from "../../../../public/static/recipe/images/components/measuringModal/tip00.png";
import tip01 from "../../../../public/static/recipe/images/components/measuringModal/tip01.jpg";
import tip02 from "../../../../public/static/recipe/images/components/measuringModal/tip02.jpg";
import tip03 from "../../../../public/static/recipe/images/components/measuringModal/tip03.jpg";
import tip04 from "../../../../public/static/recipe/images/components/measuringModal/tip04.jpg";
import tip05 from "../../../../public/static/recipe/images/components/measuringModal/tip05.jpg";
import tip06 from "../../../../public/static/recipe/images/components/measuringModal/tip06.jpg";
import tip07 from "../../../../public/static/recipe/images/components/measuringModal/tip07.jpg";
import tip08 from "../../../../public/static/recipe/images/components/measuringModal/tip08.jpg";
import tip09 from "../../../../public/static/recipe/images/components/measuringModal/tip09.jpg";
import tip10 from "../../../../public/static/recipe/images/components/measuringModal/tip10.jpg";
import tip11 from "../../../../public/static/recipe/images/components/measuringModal/tip11.jpg";
import tip12 from "../../../../public/static/recipe/images/components/measuringModal/tip12.jpg";

const MeasuringModal = ({
  indexMeasuringModal,
  setIndexMeasuringModal,
  setIsMeasuringModalVisible,
}) => {
  function switchMeasuringModal(param) {
    switch (param) {
      case 0:
        return (
          <>
            <div className={measuringModalStyles.contentHeader}>
              <div className={measuringModalStyles.headerImg}>
                <Image src={tip00} alt="tip00.png" />
              </div>
            </div>
            <div className={measuringModalStyles.contentBody}>
              <h1>계량을 도와드릴까요?</h1>
              <p>
                계량 기구가 없다면
                <br /> 다른 도구를 사용하거나 사진 속 분량을 보고
                <br /> 눈대중으로 가늠할 수 있게 도와드릴게요.
              </p>
            </div>
            <div className={measuringModalStyles.contentFooter0}>
              <div
                className={measuringModalStyles.button2}
                onClick={() => onXBtn(false)}
              >
                괜찮아요
              </div>
              <div
                className={measuringModalStyles.button1}
                onClick={() => setIndexMeasuringModal(1)}
              >
                네,좋아요!
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className={measuringModalStyles.contentHeader}>
              <div className={measuringModalStyles.content1}>
                <div className={measuringModalStyles.itemDiv1}>
                  <Image src={tip01} alt="image tip01" />
                  <p>
                    1 테이블스푼 (1T)
                    <br /> = 15ml
                  </p>
                  <p>
                    밥숟가락 1 큰술
                    <br /> 정도의 양
                  </p>
                </div>
                <div className={measuringModalStyles.itemDiv1}>
                  <Image src={tip02} alt="image tip02" />
                  <p>
                    1 티스푼 (1t)
                    <br /> = 5ml
                  </p>
                  <p>
                    밥숟가락 1/3 큰술
                    <br /> 정도의 양
                  </p>
                </div>
              </div>
            </div>
            <div className={measuringModalStyles.contentBody}>
              <h1>계량팁 1</h1>
              <p>
                <strong>- 밥숟가락 계량 -</strong>
                <br />
                테이블스푼(T)과 티스푼(t)은 <br />
                성인용 밥숟가락으로 계량할 수 있어요.
              </p>
            </div>
            <div className={measuringModalStyles.contentFooter1}>
              <div
                className={measuringModalStyles.button2}
                onClick={() => onXBtn(false)}
              >
                그만볼래요
              </div>
              <div
                className={measuringModalStyles.button1}
                onClick={() => setIndexMeasuringModal(2)}
              >
                다음으로
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={measuringModalStyles.contentHeader}>
              <div className={measuringModalStyles.content2}>
                <div className={measuringModalStyles.itemDiv2}>
                  <Image src={tip03} alt="image tip03" />
                  <p>
                    액체 가득 1 컵 <br />= 약 180ml
                  </p>
                </div>
                <div className={measuringModalStyles.itemDiv2}>
                  <Image src={tip04} alt="image tip04" />
                  <p>
                    밀가루 1 컵 <br />= 약 100g
                  </p>
                </div>
              </div>
            </div>
            <div className={measuringModalStyles.contentBody}>
              <h1>계량팁 2</h1>
              <p>
                <strong>- 종이컵 계량 -</strong>
                <br />
                숟가락보다 더 많은 양은 <br />
                종이컵에 한 컵 가득 담아 가늠할 수 있어요.
              </p>
            </div>
            <div className={measuringModalStyles.contentFooter2}>
              {/* <button type="button" onClick={() => setIndexMeasuringModal(1)}>
                이전
              </button> */}
              <div
                className={measuringModalStyles.button2}
                onClick={() => onXBtn(false)}
              >
                그만볼래요
              </div>
              <div
                className={measuringModalStyles.button1}
                onClick={() => setIndexMeasuringModal(3)}
              >
                다음으로
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={measuringModalStyles.contentHeader}>
              <div className={measuringModalStyles.content3}>
                <div className={measuringModalStyles.itemDiv3}>
                  <Image src={tip05} alt="image tip05" />
                  <p>양파</p>
                  <p>(1/4개=50g)</p>
                </div>
                <div className={measuringModalStyles.itemDiv3}>
                  <Image src={tip10} alt="image tip10" />
                  <p>무</p>
                  <p>(1토막=약150g)</p>
                </div>
                <div className={measuringModalStyles.itemDiv3}>
                  <Image src={tip07} alt="image tip07" />
                  <p>생강</p>
                  <p>(1톨=약15g)</p>
                </div>
                <div className={measuringModalStyles.itemDiv3}>
                  <Image src={tip08} alt="image tip08" />
                  <p>대파</p>
                  <p>(1대=약15cm)</p>
                </div>
                <div className={measuringModalStyles.itemDiv3}>
                  <Image src={tip09} alt="image tip09" />
                  <p>당근</p>
                  <p>(1/2개=약100g)</p>
                </div>
                <div className={measuringModalStyles.itemDiv3}>
                  <Image src={tip06} alt="image tip06" />
                  <p>마늘</p>
                  <p>(1쪽=5g)</p>
                </div>
                <div className={measuringModalStyles.itemDiv3}>
                  <Image src={tip11} alt="image tip11" />
                  <p>애호박</p>
                  <p>(1/2개=약150g)</p>
                </div>
                <div className={measuringModalStyles.itemDiv3}>
                  <Image src={tip12} alt="image tip12" />
                  <p>돼지고기</p>
                  <p>(1토막=약200g)</p>
                </div>
              </div>
            </div>
            <div className={measuringModalStyles.contentBody}>
              <h1>계량팁 3</h1>
              <p>
                <strong>- 재료별 분량 -</strong>
                <br />
                자주 쓰는 재료들의 무게를 참고하여
                <br />
                눈대중으로 분량을 재어보세요
              </p>
            </div>
            <div className={measuringModalStyles.contentFooter3}>
              {/* <button type="button" onClick={() => setIndexMeasuringModal(2)}>
                이전
              </button> */}
              <div
                className={measuringModalStyles.button1}
                onClick={() => onXBtn(false)}
              >
                고마워요!
              </div>
            </div>
          </>
        );
    }
  }

  const onXBtn = () => {
    setIsMeasuringModalVisible(false);
  };
  return (
    <div className={measuringModalStyles.container}>
      {switchMeasuringModal(indexMeasuringModal)}
    </div>
  );
};

export default MeasuringModal;
