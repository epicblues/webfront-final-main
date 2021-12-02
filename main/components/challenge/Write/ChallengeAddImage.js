import { React, useState } from "react";

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
  return (
    <div className="ui rounded image" style={{ height: "auto" }}>
      <div className="container" style={{ width: "100%" }}>
        {error && (
          <p className="errorMsg" style={{ color: "red" }}>
            File not supported
            <i className="frown outline icon"></i>
          </p>
        )}
        <h4>챌린지를 설명할 사진 추가</h4>

        <div
          className="imagePreview ui rounded image"
          style={{
            background:
              challenge.imageBuffer || challenge.image
                ? `url("${
                    challenge.imageBuffer ||
                    process.env.NEXT_PUBLIC_STATIC_SERVER_URL + challenge.image
                  }") no-repeat center/cover`
                : 'url("/empty.jpg") no-repeat center/cover',
            width: "100%",
            height: "40vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            marginBottom: "16px",
            boxShadow: "1px 1px 3px 1px #dadce0",
          }}
        >
          {challenge.image === null && (
            <>
              <label
                htmlFor="fileUpload"
                className="customfileUpload"
                style={{ cursor: "pointer", marginBottom: 4 }}
              >
                <i className="huge images outline icon"></i>
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
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
