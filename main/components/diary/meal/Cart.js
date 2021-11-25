import React from "react";
import ImageUpload from "./ImageUpload";
import Product from "./Product";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";
const mealType = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];

export default function Cart({ diary, setDiary, page, setPage, type }) {
  const cart = diary.meals[type].foods;

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const getTotalSum = () => {
    const reducer = (sum, foodOrRecipe) => {
      if (typeof foodOrRecipe._id === "number") {
        // Recipe다!
        return sum + foodOrRecipe.nutrition.kcal * foodOrRecipe.quantity;
      } else {
        // food다!
        return sum + foodOrRecipe.kcal * foodOrRecipe.quantity;
      }
    };
    return cart.reduce(reducer, 0).toFixed(2);
  };

  const clearCart = () => {
    console.log("clearCART");
    const fixedMeals = diary.meals;
    fixedMeals[type] = {
      ...fixedMeals[type],
      foods: [],
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
    };
    setDiary({ ...diary, meals: fixedMeals });
  };

  const setQuantity = (product, total) => {
    const newCart = [...diary.meals[type].foods];

    setDiary((originalDiary) => {
      const newDiary = { ...originalDiary };
      newDiary.meals[type].foods = newCart.map((item) => {
        if (item.no === product.no) {
          item.quantity = isNaN(total) ? 0 : total;
        }
        return item;
      });
      return newDiary;
    });
  };

  const removeFromCart = (productToRemove) => {
    const newDiary = { ...diary };
    newDiary.meals[type].foods = cart.filter(
      (product) => product.no !== productToRemove.no
    );
    setDiary(newDiary);
  };

  return (
    <div>
      <ImageUpload diary={diary} setDiary={setDiary} type={type} />
      <div style={{ display: "flex", justifyContent: "space-between"}}>
        <span style={{font:"normal 600 1rem/22.4px 'Noto Sans KR'"}}>추가한 리스트</span>
        {cart.length > 0 && (
          <i
            className="large trash alternate icon grey"
            onClick={clearCart}
          ></i>
        )}
      </div>
      <div className="ui middle aligned divided list" style={{margin: '8px 0'}}>
        {cart.map((product, index) => (
          <Product
            product={product}
            index={index}
            setQuantity={setQuantity}
            removeFromCart={removeFromCart}
            key={index}
          />
        ))}
      </div>

      <button
        className="ui fluid button teal"
        onClick={() => navigateTo(PAGE_PRODUCTS)}
        style={{ boxShadow: "1px 1px 3px 1px #dadce0" }}
      >
        음식 추가하기
      </button>

      {/* {page === PAGE_CART && <Cart cart={cart} setCart={setCart} />} */}

      <div style={{ marginTop: "16px", textAlign: "center" }}>
        오늘 {mealType[type]}의 총 섭취 칼로리는 <span style={{fontWeight: '600'}}>{getTotalSum()}</span> 입니다
      </div>
    </div>
  );
}
