import React, { useContext } from "react";
// components
import { ImageContext } from "../../../pages/diary";
import { PAGE_CART } from "./AddFood";
import List from "./List";
// react-icons
import { BiChevronLeft } from "react-icons/bi";
import { AiOutlineForm } from "react-icons/ai";
// css
import MealStyles from "../../../styles/diary/Meal.module.css";

const PAGE_PRODUCTS = "products";
const mealType = ["아침", "점심", "저녁", "간식"];

const LookupMeal = ({
  diary,
  setDiary,
  type,
  user,
  setWritingMode,
  setPage,
}) => {
  const { typeImages, typeImage } = useContext(ImageContext);
  const cart = diary.meals[type].foods;
  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };
  const getTotalSum = (nutritionType) => {
    const toNumberCheck = (input) => {
      return input === "-" ? 0 : input;
    };
    const reducer = (sum, foodOrRecipe) => {
      if (typeof foodOrRecipe._id === "number") {
        // Recipe다!
        return (
          sum +
          toNumberCheck(foodOrRecipe.nutrition[nutritionType]) *
            foodOrRecipe.quantity
        );
      } else {
        // food다!
        return (
          sum +
          toNumberCheck(foodOrRecipe[nutritionType]) * foodOrRecipe.quantity
        );
      }
    };
    const result = cart.reduce(reducer, 0).toFixed(0);

    return result;
  };

  const mealNutritionTotal = {
    kcal: getTotalSum("kcal"),
    prot: getTotalSum("prot"),
    carbs: getTotalSum("carbs"),
    fat: getTotalSum("fat"),
  };

  return (
    <div className={MealStyles.lookupMealWrap}>
      <div className={MealStyles.lookupMealHeader}>
        <BiChevronLeft
          size="2rem"
          onClick={(e) => {
            setWritingMode("DEFAULT");
          }}
        />

        <span>{mealType[type]}</span>

        <AiOutlineForm
          size="2rem"
          onClick={() =>
            setDiary((diary) => {
              const newDiary = { ...diary };
              newDiary.meals[type].written = false;
              setPage(PAGE_CART);
              return newDiary;
            })
          }
        />
      </div>

      <div className={MealStyles.lookupMealImg}>
        <img
          src={
            diary.meals[type].imageBuffer ||
            (diary.meals[type].image !== null
              ? process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                diary.meals[type].image
              : typeImage())
          }
        />
      </div>

      <div className={MealStyles.lookupMealList}>
        <div>
          <div>칼로리</div>
          <div>{mealNutritionTotal.kcal}kcal</div>
        </div>

        <div>
          <div>탄수화물</div>
          <div>{mealNutritionTotal.carbs}g</div>
        </div>

        <div>
          <div>단백질</div>
          <div>{mealNutritionTotal.prot}g</div>
        </div>

        <div>
          <div>지방</div>
          <div>{mealNutritionTotal.fat}g</div>
        </div>
      </div>

      <div className="ui middle aligned selection list">
        {cart.map((product, index) => (
          <List product={product} index={index} key={index} />
        ))}
      </div>

      <button
        onClick={() =>
          setDiary((diary) => {
            const newDiary = { ...diary };
            newDiary.meals[type].written = false;
            setPage(PAGE_PRODUCTS);
            return newDiary;
          })
        }
      >
        더 추가하기
      </button>
    </div>
  );
};

export default LookupMeal;
