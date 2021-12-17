import React, { useState, useRef } from "react";
import { BiImageAdd } from "react-icons/bi";
import createStyles from "../../../../styles/recipe/Create.module.css";
import Image from "next/image";

const AddStep = ({ stepData, setStepData }) => {
  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  // 이미지 파일 보관 state
  const inputRef = useRef();
  const imageRef = useRef();
  const handleSubmitStep = () => {
    if (inputRef.current.value.length === 0) {
      alert("순서 설명을 입력해주세요.");
    } else if (!imgPreview) {
      alert("순서 사진을 첨부해주세요");
    } else {
      if (stepData.length <= 10) {
        stepData = [
          ...stepData,
          {
            stepDesc: inputRef.current.value,
            stepImageData: imgPreview,
            stepImageFile: imageFile,
          },
        ];
        setStepData(stepData);
        setImgPreview(null);
        inputRef.current.value = "";
      } else {
        alert("순서를 더 이상 추가하실 수 없습니다.");
      }
    }
  };

  const handleImageChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    setImageFile(selected);
    // 이미지 파일 state 변경
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };

  return (
    <div className={createStyles.addContainer}>
      {error && (
        <p className={createStyles.errorMsg}>
          지원하지 않는 파일 형식입니다.
          <i className="frown outline icon"></i>
        </p>
      )}
      <div className={createStyles.addFormContainer}>
        <div className={createStyles.imgPreviewWrapper}>
          {imgPreview ? (
            <Image
              translate="yes"
              width="3000"
              height="3000"
              objectFit="cover"
              src={imgPreview}
              alt="step Image preview"
            />
          ) : (
            <div className={createStyles.imgAddButton}>
              <label
                htmlFor="fileUpload"
                className={createStyles.customFileUpload}
              >
                <BiImageAdd size="60%" />
                <span>jpg / jpeg / png</span>
              </label>
              <input
                type="file"
                id="fileUpload"
                style={{ display: "none" }}
                onChange={handleImageChange}
                ref={imageRef}
              />
            </div>
          )}
        </div>
        <textarea
          className={createStyles.stepDescTextarea}
          ref={inputRef}
          type="text"
          name="stepDesc"
          placeholder="순서에 대한 설명을 입력해 주세요"
        />
        <div className={createStyles.btnContainer}>
          <div
            className={createStyles.btnWrapperAdd}
            onClick={handleSubmitStep}
          >
            <i className="arrow alternate circle up icon" />
            <p>추가</p>
          </div>
          {imgPreview ? (
            <div
              className={createStyles.btnWrapperDel}
              onClick={() => setImgPreview(null)}
            >
              <i className="trash alternate outline icon" />
              <p>삭제</p>
            </div>
          ) : (
            <div className={createStyles.btnWrapperDel}>
              <i className="trash alternate outline icon" />
              <p>삭제</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStep;
