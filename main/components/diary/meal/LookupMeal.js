import React, { useEffect } from "react";
import { PAGE_CART } from "./AddFood";

import List from "./List";

const PAGE_PRODUCTS = "products";

const LookupMeal = ({
  diary,
  setDiary,
  type,
  user,
  setWritingMode,
  setPage,
}) => {
  const cart = diary.meals[type].foods;
  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };
  const getTotalSum = (nutritionType) => {
    const reducer = (sum, foodOrRecipe) => {
      if (typeof foodOrRecipe._id === "number") {
        // Recipe다!
        return (
          sum + foodOrRecipe.nutrition[nutritionType] * foodOrRecipe.quantity
        );
      } else {
        // food다!
        return sum + foodOrRecipe[nutritionType] * foodOrRecipe.quantity;
      }
    };
    const result = cart.reduce(reducer, 0).toFixed(2);

    return result;
  };

  // 열량 kcal total

  const mealNutritionTotal = {
    kcal: getTotalSum("kcal"),
    prot: getTotalSum("prot"),
    carbs: getTotalSum("carbs"),
    fat: getTotalSum("fat"),
  };

  return (
    <div
      style={{
        border: "solid 2px lightgray",
        borderRadius: "5px",
        padding: "16px",
      }}
    >
      <div style={{ textAlign: "left", marginBottom: "16px" }}>
        <i
          className="reply large icon"
          onClick={(e) => {
            setWritingMode("DEFAULT");
          }}
        ></i>
        뒤로가기
      </div>

      <div style={{ width: "100%", height: "40vh" }}>
        <img
          src={
            diary.meals[type].imageBuffer || user.url + diary.meals[type].image
          }
          className="ui rounded image"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div
        className="ui large horizontal divided list"
        style={{ display: "flex" }}
      >
        <div className="item" style={{ width: "25%" }}>
          <div className="content" style={{ marginBottom: "8px" }}>
            칼로리
          </div>
          <div className="header">{mealNutritionTotal.kcal}kcal</div>
        </div>

        <div className="item" style={{ width: "25%" }}>
          <div className="content" style={{ marginBottom: "8px" }}>
            탄수화물
          </div>
          <div className="header">{mealNutritionTotal.carbs}g</div>
        </div>

        <div className="item" style={{ width: "25%" }}>
          <div className="content" style={{ marginBottom: "8px" }}>
            단백질
          </div>
          <div className="header">{mealNutritionTotal.prot}g</div>
        </div>

        <div className="item" style={{ width: "25%" }}>
          <div className="content" style={{ marginBottom: "8px" }}>
            지방
          </div>
          <div className="header">{mealNutritionTotal.fat}g</div>
        </div>
      </div>

      <div className="ui middle aligned selection list">
        {cart.map((product, index) => (
          <List product={product} index={index} key={index} />
        ))}
      </div>

      <button
        className="ui fluid button blue"
        onClick={() =>
          setDiary((diary) => {
            const newDiary = { ...diary };
            newDiary.meals[type].written = false;
            setPage(PAGE_CART);
            return newDiary;
          })
        }
      >
        편집 및 추가하기
      </button>
    </div>
  );
};

export default LookupMeal;
