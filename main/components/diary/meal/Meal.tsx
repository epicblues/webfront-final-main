import React from 'react'
import { BiPlusCircle } from "react-icons/bi";

const Meal = ({ diary, type, setWritingMode, user }: any) => {
  const typeName = ["아침", "점심", "저녁", "간식"]
  const typeImages = [
                  "/serving.png",
                  "/snack.png",
                  "/bread.png",
                  "/breakfast.png",
                  "/sandwich.png"
                ]
  const typeImage = typeImages[Math.floor(Math.random() * typeImages.length)];
  return (
    <div
        className="meal item"
        onClick={(e) => {
          e.preventDefault();
          setWritingMode(type);
        }}
    >
      <img
          src={diary.meals[type].imageBuffer || ((diary.meals[type].image !== null && process.env.NEXT_PUBLIC_STATIC_SERVER_URL + diary.meals[type].image) || typeImage)}
          alt="식단 이미지"
      />

      <span className="meal-type-label">
        {typeName[type]}
      </span>

      <BiPlusCircle
                    className='icon'
                    style={{
                      display: diary.meals[type].foods.length === 0 && !diary.meals[type].imageBuffer ? 'block' : 'none'
                    }}
      />
    </div>
  )
}

export default Meal
