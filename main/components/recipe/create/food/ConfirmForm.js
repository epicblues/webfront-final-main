import React from "react";
import Image from "next/image";
import createStyles from "../../../../styles/recipe/Create.module.css";

const ConfirmForm = ({ stepData }) => {
  return (
    <div className={createStyles.submits}>
      <p>대표이미지</p>
      <div className={createStyles.repImgWrapper}>
        {stepData.length > 0 ? (
          <Image
            className={createStyles.repImg}
            src={stepData[stepData.length - 1].stepImageData}
            translate="yes"
            layout="fill"
            objectFit="contain"
            alt={"Representative Image"}
          ></Image>
        ) : (
          <p>조리순서를 추가해주세요</p>
        )}
      </div>
      {stepData.length > 0 ? (
        <p>🎉작성 완료! 아래의 글쓰기 버튼을 눌러주세요!🎉</p>
      ) : null}
    </div>
  );
};

export default ConfirmForm;
