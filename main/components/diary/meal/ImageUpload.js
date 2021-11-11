import React from "react";
import { useState } from "react";

const ImageUpload = ({ diary, setDiary, type }) => {
  const imgPreview = diary.meals[type].imageBuffer;
  const [error, setError] = useState(false);

  const handleImageChange = (e) => {
    setError(false);
    if (!e.target.files) {
      setDiary((diary) => {
        const newDiary = { ...diary };
        newDiary.meals[type].image = null;
        newDiary.meals[type].imageBuffer = null;
        return newDiary;
      });
      return;
    }
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setDiary((diary) => {
          const newDiary = { ...diary };
          newDiary.meals[type].image = selected;
          newDiary.meals[type].imageBuffer = reader.result;
          return newDiary;
        });
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };

  return (
    <div
      className="ui rounded image"
      style={{ display: "flex", height: "auto" }}
    >
      <div className="container" style={{ width: "100%" }}>
        {error && (
          <p className="errorMsg" style={{ color: "red" }}>
            File not supported
            <i className="frown outline icon"></i>
          </p>
        )}
        {imgPreview && (
          <div style={{textAlign: 'right', marginBottom: '16px'}}>
              <i className="red large trash alternate icon"
                  onClick={handleImageChange}
              >
              </i>
          </div>
        )}
        <div
          className="imgPreview ui rounded image"
          style={{
            background: imgPreview || diary.meals[type].image
              ? `url("${imgPreview || process.env.NEXT_PUBLIC_STATIC_SERVER_URL + diary.meals[type].image}") no-repeat center/cover`
              : "#9e9e9e",
            width: "100%",
            height: "40vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            marginBottom: '16px',
          }}
        >
          {!imgPreview && (
            <>
              <label
                htmlFor="fileUpload"
                className="customFileUpload"
                style={{ cursor: "pointer", marginBottom: 4 }}
              >
                <i className="images outline huge icon"></i>
              </label>
              <input
                type="file"
                id="fileUpload"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <span>
                사진 추가
                <br />
                jpg / jpeg / png
              </span>
            </>
          )}
        </div>


      </div>
    </div>
  );
};

export default ImageUpload;
