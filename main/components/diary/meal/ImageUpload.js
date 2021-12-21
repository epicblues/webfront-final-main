import React, { useState, useContext } from "react";
// components
import { ImageContext } from '../../../pages/diary';
// react-icons
import { BiSad } from "react-icons/bi";
import { AiOutlinePicture, AiOutlineDelete } from "react-icons/ai";

const ImageUpload = ({ diary, setDiary, type, }) => {
  const {typeImages, typeImage} = useContext(ImageContext);

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
      <div className="container" style={{ width: "100%"}}>
        {error && (
          <p className="errorMsg"
              style={{
                font: 'normal 400 1rem "Noto Sans KR"',
                color: 'red',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
          >
            지원하지 않는 파일 형식입니다
            <BiSad size='1.2rem'/>
          </p>
        )}
        <div
          className="imgPreview ui rounded image"
          style={{
            background:
              imgPreview || diary.meals[type].image
                ? `url("${
                    imgPreview ||
                    process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                      diary.meals[type].image
                  }") no-repeat center/cover`
                : `url(${typeImage()})  no-repeat center/cover`,
            width: "100%",
            height: "40vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            marginBottom: "1rem",
            boxShadow: "1px 1px 3px 1px #dadce0",
          }}
        >
          {!imgPreview && (
            <>
              <label
                htmlFor="fileUpload"
                className="customFileUpload"
                style={{ cursor: "pointer", marginBottom: 4 }}
              >
                <AiOutlinePicture size='3rem'/>
              </label>
              <input
                type="file"
                id="fileUpload"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </>
          )}
          {!diary.meals[type].image || (
            <div style={{ textAlign: "right", marginBottom: "16px" }}>
              <AiOutlineDelete onClick={handleImageChange} size='3rem' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
