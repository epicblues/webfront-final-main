import React from "react";
import Image from "next/dist/client/image";

//  CSS
import measuringModalStyles from "../../../../styles/MeasuringModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensilSpoon } from "@fortawesome/free-solid-svg-icons";

const MeasuringModal = ({
  indexMeasuringModal,
  setIndexMeasuringModal,
  setIsMeasuringModalVisible,
}) => {
  function switchMeasuringModal(param) {
    switch (param) {
      case 0:
        return (
          <div>
            <div>
              <h1>계량이 어려우신가요?</h1>
            </div>
            <div>
              <p>
                한 눈으로 살펴보는 간단한 계량팁을 준비했어요~ <br />
                요리를 하려는데 계량 기구가 없다면
                <br />
                다른 도구를 사용하거나 사진 속 분량을 보고 눈대중으로 헤아려서
                할 수 있어요!
              </p>
            </div>
            <div>
              <button type="button" onClick={() => setIndexMeasuringModal(1)}>
                네, 좋아요!
              </button>
              <button type="button" onClick={() => onXBtn(false)}>
                아뇨, 괜찮아요.
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <div>
              <h1>계량팁 1</h1>
            </div>
            <div>
              <div>
                <FontAwesomeIcon icon={faUtensilSpoon} size="2x" />
                <h4>밥숟가락 계량</h4>
                <p>테이블스푼(T)과 티스푼(t)은 어느 정도일까요?</p>
                <p>- 성인용 밥숟가락으로 계량해 볼 수 있어요.</p>
              </div>
              <div className={measuringModalStyles.Content1}>
                <Image
                  src="/static/recipe/images/components/measuringModal/tip01.jpg"
                  width={100}
                  height={100}
                  alt="image tip01"
                />
                <p>1 테이블스푼 (1T) = 15ml</p>
                <p>밥숟가락 1 큰술 정도의 양</p>
              </div>
              <div className={measuringModalStyles.Content2}>
                <Image
                  src="/static/recipe/images/components/measuringModal/tip02.jpg"
                  width={100}
                  height={100}
                  alt="image tip02"
                />
                <p>1 티스푼 (1t) = 5ml</p>
                <p>밥숟가락 1/3 큰술 정도의 양</p>
              </div>
            </div>
            <div>
              <button type="button" onClick={() => onXBtn(false)}>
                이제 그만볼래요
              </button>
              <button type="button" onClick={() => setIndexMeasuringModal(2)}>
                다음
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div>
              <h1>계량팁 2</h1>
            </div>
            <div>
              <div>
                <h4>종이컵 계량</h4>
                <p>밥숟가락 단위보다 더 많은 양은 어떻게 계량해야 할까요?</p>
                <p>
                  - 소형 종이컵에 한 컵 가득 담은 양을 참고하여 가늠해볼 수
                  있어요.
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/static/recipe/images/components/measuringModal/tip03.jpg"
                width={100}
                height={100}
                alt="image tip03"
              />
              <p>액체 가득 1 컵 = 약 180ml</p>
            </div>
            <div>
              <Image
                src="/static/recipe/images/components/measuringModal/tip04.jpg"
                width={100}
                height={100}
                alt="image tip04"
              />
              <p>윗면을 깎아낸 밀가루 1 컵 = 약 100g</p>
            </div>
            <div>
              <button type="button" onClick={() => setIndexMeasuringModal(1)}>
                이전
              </button>
              <button type="button" onClick={() => onXBtn(false)}>
                이제 그만볼래요
              </button>
              <button type="button" onClick={() => setIndexMeasuringModal(3)}>
                다음
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={measuringModalStyles.contentContainer}>
            <div className={measuringModalStyles.contentHeader}>
              <h1>계량팁 3</h1>
            </div>
            <div className={measuringModalStyles.contentBody}>
              <div className={measuringModalStyles.contentBody1}>
                <h4>재료별 분량</h4>
                <p>자주 쓰는 재료들의 무게가 궁금해요!</p>
                <p>
                  - 사진에 담긴 재료의 양을 참고하여 눈대중으로 분량을
                  재어봅시다.
                </p>
              </div>
              <div className={measuringModalStyles.contentBody2}>
                <div className={measuringModalStyles.ItemDiv}>
                  <Image
                    src="/static/recipe/images/components/measuringModal/tip05.jpg"
                    width={100}
                    height={100}
                    alt="image tip05"
                  />
                  <p>양파(1/4개=50g),</p>
                </div>
                <div className={measuringModalStyles.ItemDiv}>
                  <Image
                    src="/static/recipe/images/components/measuringModal/tip06.jpg"
                    width={100}
                    height={100}
                    alt="image tip06"
                  />
                  <p>마늘(1쪽=5g),</p>
                </div>
                <div className={measuringModalStyles.ItemDiv}>
                  <Image
                    src="/static/recipe/images/components/measuringModal/tip07.jpg"
                    width={100}
                    height={100}
                    alt="image tip07"
                  />
                  <p>생강(1톨 = 약 15g),</p>
                </div>
                <div className={measuringModalStyles.ItemDiv}>
                  <Image
                    src="/static/recipe/images/components/measuringModal/tip08.jpg"
                    width={100}
                    height={100}
                    alt="image tip08"
                  />
                  <p>생강(1톨 = 약 15g),</p>
                </div>
                <div className={measuringModalStyles.ItemDiv}>
                  <Image
                    src="/static/recipe/images/components/measuringModal/tip09.jpg"
                    width={100}
                    height={100}
                    alt="image tip09"
                  />
                  <p>당근(1/2개=약100g),</p>
                </div>
                <div className={measuringModalStyles.ItemDiv}>
                  <Image
                    src="/static/recipe/images/components/measuringModal/tip10.jpg"
                    width={100}
                    height={100}
                    alt="image tip10"
                  />
                  <p>무(1토막=약150g),</p>
                </div>
                <div className={measuringModalStyles.ItemDiv}>
                  <Image
                    src="/static/recipe/images/components/measuringModal/tip11.jpg"
                    width={100}
                    height={100}
                    alt="image tip11"
                  />
                  <p>애호박(1/2개=약150g),</p>
                </div>
                <div className={measuringModalStyles.ItemDiv}>
                  <Image
                    src="/static/recipe/images/components/measuringModal/tip12.jpg"
                    width={100}
                    height={100}
                    alt="image tip12"
                  />
                  <p>돼지고기(1토막=약200g)</p>
                </div>
              </div>
            </div>
            <div>
              <button type="button" onClick={() => setIndexMeasuringModal(2)}>
                이전
              </button>
              <button type="button" onClick={() => onXBtn(false)}>
                고마워요!
              </button>
            </div>
          </div>
        );
    }
  }

  const onXBtn = () => {
    setIsMeasuringModalVisible(false);
  };
  return (
    <div className={measuringModalStyles.container}>
      <div
        className={measuringModalStyles.close}
        onClick={() => onXBtn(false)}
      />
      <div>{switchMeasuringModal(indexMeasuringModal)}</div>
    </div>
  );
};

export default MeasuringModal;
