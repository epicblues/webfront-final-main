import React from "react";
import AddStep from "./AddStep";
import Image from "next/image";

const StepForm = ({ stepData, setStepData }) => {
  const removeStep = (step) => {
    setStepData(stepData.filter((value) => value !== step));
  };
  return (
    <div>
      <div>
        {stepData.length === 0 ? (
          <p>요리순서를 입력해주세요</p>
        ) : (
          stepData.map((value, index) => {
            return (
              <div key={index}>
                <div>Step. {index + 1}</div>
                <Image
                  src={
                    value.stepImageData ||
                    process.env.NEXT_PUBLIC_STATIC_SERVER_URL + value.image_url
                  }
                  width={100}
                  height={100}
                  alt={"Step Image" + (index + 1)}
                />
                <span>{value.desc || value.stepDesc}</span>
                <button type="button" onClick={() => removeStep(value)}>
                  삭제
                </button>
              </div>
            );
          })
        )}
      </div>
      <div>
        {/* 스텝 입력 폼 */}
        <AddStep stepData={stepData} setStepData={setStepData} />
      </div>
    </div>
  );
};

export default StepForm;
