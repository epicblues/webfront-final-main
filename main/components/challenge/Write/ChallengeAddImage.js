import { React, useState } from "react";
//css
import { Icon } from "semantic-ui-react";
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css";
const ChallengeAddImage = ({ challenge, setChallenge }) => {
  const [error, setError] = useState(false);
  //이미지 업로드
  const handleImageUpload = (e) => {
    setError(false);
    if (!e.target.files) {
      setChallenge((challenge) => {
        const newChallenge = { ...challenge };
        newChallenge.image = null;
        newChallenge.imageBuffer = null;
        return newChallenge;
      });
      return;
    }
    // 이미지 파일 미리보기
    const selected = e.currentTarget.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setChallenge((challenge) => {
          const newChallenge = { ...challenge };
          newChallenge.image = selected;
          newChallenge.imageBuffer = reader.result;
          return newChallenge;
        });
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };
  // FontAwesome 아이콘

  return (
    <div
      className="ui rounded image"
      style={{
        height: "auto",
        marginTop: "5px",
        marginBottom: "0px",
      }}
    >
      <div className="container" style={{ width: "100%", height: "50%" }}>
        {error && (
          <p
            className="errorMsg"
            style={{
              font: 'normal 400 1rem "Noto Sans KR"',
              color: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            지원하지 않는 파일 형식입니다.
            <i className="frown outline icon"></i>
          </p>
        )}
        <h3 className={ChallengeStyle.h2}>챌린지를 설명할 사진 추가</h3>

        <div
          className="imagePreview ui rounded image"
          style={{
            background:
              challenge.imageBuffer || challenge.image
                ? `url("${
                    challenge.imageBuffer ||
                    process.env.NEXT_PUBLIC_STATIC_SERVER_URL + challenge.image
                  }") no-repeat center/cover`
                : null,
            width: "100%",
            height: "20vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            margin: "20px 0",
            borderRadius: "0.3rem",
            boxShadow: "1px 1px 3px 1px #dadce0",
          }}
        >
          {challenge.image === null && (
            <>
              <label
                className="customfileUpload"
                style={{ cursor: "pointer", marginBottom: 4 }}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <Icon name="camera" size="big" color="black" />
              </label>
              <span className={ChallengeStyle.span}>사진 추가</span>
            </>
          )}
          {!challenge.image || (
            <div style={{ textAlign: "right", marginBottom: "16px" }}>
              <i
                className="huge trash alternate icon"
                onClick={handleImageUpload}
              ></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeAddImage;
