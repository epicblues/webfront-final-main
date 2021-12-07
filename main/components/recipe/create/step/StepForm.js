import React from "react";
import AddStep from "./AddStep";
import Image from "next/image";
import createStyles from "../../../../styles/recipe/Create.module.css";

const StepForm = ({ stepData, setStepData }) => {
  const removeStep = (step) => {
    setStepData(stepData.filter((value) => value !== step));
  };
  return (
    <div className={createStyles.wizard3}>
      <div className={createStyles.stepsWrapper}>
        {stepData.length === 0 ? (
          <p className={createStyles.stepEmpty}>요리순서를 입력해주세요</p>
        ) : (
          stepData.map((value, index) => {
            return (
              <div className={createStyles.stepItem} key={index}>
                <div className={createStyles.stepIndex}>
                  <p>{index + 1}</p>
                </div>
                <div>
                  <Image
                    src={
                      value.stepImageData ||
                      process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                        value.image_url
                    }
                    translate="yes"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    alt={"Step Image" + (index + 1)}
                  />
                </div>
                <div className={createStyles.stepDesc}>
                  <span>{value.desc || value.stepDesc}</span>
                </div>
                <div
                  className={createStyles.stepDel}
                  onClick={() => removeStep(value)}
                >
                  <i className="trash alternate outline icon" />
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* 스텝 입력 폼 */}
      <AddStep stepData={stepData} setStepData={setStepData} />
    </div>
  );
};

export default StepForm;
