import React, { useContext } from 'react'
import { ImageContext } from '../../../pages/diary';
// react-icons
import { BiPlusCircle } from "react-icons/bi";
// css
import MealStyles from '../../../styles/diary/Meal.module.css';

const Meal = ({ diary, type, setWritingMode, user }: any) => {
  const typeName = ["아침", "점심", "저녁", "간식"]
  const {typeImages, typeImage} = useContext(ImageContext);
  return (
    <div
        className={MealStyles.mealItem}
        onClick={(e) => {
          e.preventDefault();
          setWritingMode(type);
        }}
    >
      <img
          src={diary.meals[type].imageBuffer || ((diary.meals[type].image !== null && process.env.NEXT_PUBLIC_STATIC_SERVER_URL + diary.meals[type].image) || typeImage())}
          alt="식단 이미지"
      />

      <span className={MealStyles.mealTypeLabel}>
        {typeName[type]}
      </span>

      <BiPlusCircle
                    className={MealStyles.icon}
                    style={{
                      display: diary.meals[type].foods.length === 0 && !diary.meals[type].imageBuffer ? 'block' : 'none'
                    }}
      />
    </div>
  )
}

export default Meal
