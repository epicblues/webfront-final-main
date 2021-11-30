import React, { useEffect } from "react";
import { PAGE_CART } from "./AddFood";
import List from "./List";

const PAGE_PRODUCTS = "products";
const mealType = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];

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
    
    <div style={{padding: '0 1rem 1rem 1rem'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "16px"}}>
        <i
          className="angle left icon"
          onClick={(e) => {
            setWritingMode("DEFAULT");
          }}
          style={{fontSize: '1.6rem', marginTop: 6}}
        ></i>

        <span style={{font:"normal 600 1.2rem 'Noto Sans KR'"}}>
          {mealType[type]}
        </span>

        <i
          className="edit icon"
          style={{fontSize: '1.4rem', marginTop: 6}}
          onClick={() =>
            setDiary((diary) => {
              const newDiary = { ...diary };
              newDiary.meals[type].written = false;
              setPage(PAGE_CART);
              return newDiary;
            })
          }
        >
        </i>
      </div>

      <div style={{ width: "100%", height: "40vh", boxShadow: '1px 1px 3px 1px #dadce0', borderRadius: '20px'}}>
        <img
          src={
            diary.meals[type].imageBuffer ||
            process.env.NEXT_PUBLIC_STATIC_SERVER_URL + diary.meals[type].image
          }
          style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: '20px' }}
        />
      </div>

      <div
        className="ui large horizontal divided list"
        style={{ display: "flex", textAlign: 'center', boxShadow: '1px 1px 3px 1px #dadce0', borderRadius: '20px', padding: '1.6rem 0'}}
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
        className="ui fluid button teal"
        style={{boxShadow: '1px 1px 3px 1px #dadce0', borderRadius: '20px'}}
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
