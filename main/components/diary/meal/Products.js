import React, { useState, useRef } from "react";
import axios from "axios";
import RecipeModal from "./RecipeModal";
import FoodModal from "./FoodModal";
import MealStyles from '../../../styles/diary/Meal.module.css';

import { debounce } from "../../../util/axios";

export default function Products({ diary, setDiary, type, }) {
  const inputRef = useRef();
  const [products] = useState([]);

  // Count Food
  const addToCart = (value) => {
    console.log(value);
    const prevMeal = diary.meals[type];
    const foodIndex = prevMeal.foods.findIndex(
      (originalFood) => originalFood.no === value.no
    );
    if (foodIndex !== -1) {
      prevMeal.foods[foodIndex].quantity += value.quantity;
    } else {
      prevMeal.foods.push(value);
    }
    const isRecipe = typeof value._id === "number";
    // Recipe다!
    prevMeal.calories +=
      (isRecipe ? value.nutrition.kcal : value.kcal) * value.quantity;
    prevMeal.fat +=
      (isRecipe ? value.nutrition.fat : value.fat) * value.quantity;
    prevMeal.carbs +=
      (isRecipe ? value.nutrition.carbs : value.carbs) * value.quantity;
    prevMeal.protein +=
      (isRecipe ? value.nutrition.prot : value.prot) * value.quantity;
    console.log(prevMeal);
    const currentMeals = diary.meals;
    currentMeals.splice(type, 1, prevMeal);
    setDiary({
      ...diary,
      meals: currentMeals,
    });
  };

  // Search Filter food + recipe Data
  // const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredRecipeData, setFilteredRecipeData] = useState([]);

  const handleSearch = debounce(async (event) => {
    const value = event.target.value;
    axios
      .all([axios.get("/api/food/" + value), axios.get("/api/recipe/" + value)])
      .then(
        axios.spread((res1, res2) => {
          console.log(res1, res2);
          setFilteredData(res1.data);
          setFilteredRecipeData(res2.data);
        })
      );
  }, 500);

  // Modal
  const modalInitialState = [];
  for (let i = 0; i < 15; i++) {
    modalInitialState.push(false);
  }
  const recipeModalInitialState = [];
  for (let i = 0; i < 5; i++) {
    recipeModalInitialState.push(false);
  }

  const [open, setOpen] = React.useState(modalInitialState);
  const [recipeOpen, setRecipeOpen] = React.useState(recipeModalInitialState);

  const handleModal = (index) =>
    setOpen((state) => {
      const newState = [...state];
      newState[index] = !newState[index];
      return newState;
    });

  const handleRecipeModal = (index) =>
    setRecipeOpen((state) => {
      const newState = [...state];
      newState[index] = !newState[index];
      return newState;
    });

  return (
    <>
      <div
        className="ui fluid icon input"
        style={{ boxShadow: "1px 1px 3px 1px #dadce0", borderRadius: "10px" }}
      >
        <input
          type="text"
          placeholder="음식을 검색하세요"
          onChange={(event) => handleSearch(event)}
          style={{borderRadius: '10px', height: '3rem'}}
        />
        <i className="search icon" style={{ right: "8px" }}></i>
      </div>

      <div className={MealStyles.ProductWrap}>
        <div className="ui middle aligned selection list">
          <i className="book icon"></i>레시피
          {filteredRecipeData.length !== 0 &&
            filteredRecipeData.map((value, index) => {
              return (
                // 레시피 검색 리스트 출력
                <RecipeModal
                  value={value}
                  index={index}
                  handleModal={handleRecipeModal}
                  addToCart={addToCart}
                  open={recipeOpen}
                  key={index}
                />
              );
            })}
        </div>
        <div className="ui middle aligned selection list">
          <i className="lemon icon"></i>음식 &amp; 재료
          {filteredData.length !== 0 &&
            filteredData.map((value, index) => {
              return (
                // 푸드 검색 리스트 출력
                <FoodModal
                  value={value}
                  index={index}
                  handleModal={handleModal}
                  addToCart={addToCart}
                  open={open}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
