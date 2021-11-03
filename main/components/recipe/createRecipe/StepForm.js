import React from 'react'
import AddStep from './AddStep';

const StepForm = ({stepData, setStepData}) => {
    const getAddedStep = (receivedStepData) => {
        setStepData(receivedStepData);
    }

    return (
        <div>
            <div>
                {stepData.map((value, index) => {
                    return (
                        <div key={value.stepCount}>
                            {value.stepCount}
                            {value.stepDesc}
                            <img src={value.stepImageData} />
                            <button>삭제</button>
                        </div>
                    );
                })}
            </div>
            <div>
            {/* 스텝 입력 폼 */}
            <AddStep stepData={stepData} getAddedStep={getAddedStep} />
            </div>
        </div>
    )
}

export default StepForm
