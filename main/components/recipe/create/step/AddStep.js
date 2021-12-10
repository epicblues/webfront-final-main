import React, { useState, useRef } from "react";
import createStyles from "../../../../styles/recipe/Create.module.css";

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
        <div
          className={createStyles.imgPreview}
          style={{
            background: imgPreview
              ? `url("${imgPreview}") no-repeat center/cover`
              : "#9e9e9e",
          }}
        >
          {!imgPreview && (
            <>
              <label
                htmlFor="fileUpload"
                className={createStyles.customFileUpload}
              >
                <i
                  className="plus square outline big icon"
                  style={{ margin: "0" }}
                ></i>
              </label>
              <input
                type="file"
                id="fileUpload"
                style={{ display: "none" }}
                onChange={handleImageChange}
                ref={imageRef}
              />
              <span>
                사진 추가
                <br /> jpg / jpeg / png
              </span>
            </>
          )}
        </div>
        <textarea
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
