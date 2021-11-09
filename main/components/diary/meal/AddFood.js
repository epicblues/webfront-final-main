import React from "react";
import { useState } from "react";

import Products from "./Products";
import Cart from "./Cart";

const mealType = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];

function AddFood({ type, setWritingMode, diary, setDiary }) {
  const PAGE_PRODUCTS = "products";
  const PAGE_CART = "cart";
  // Page 이동
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  // Count
  const getCartTotal = () => {
    return diary.meals[type]?.foods.length || 0;
  };

  return (
    <div
      className="AddFood"
      style={{ border: "solid 2px lightgray", borderRadius: "5px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <div>
          <span>{mealType[type]}</span>
          <a
            className="ui teal circular label"
            onClick={() => navigateTo(PAGE_CART)}
          >
            {getCartTotal()}
          </a>
        </div>

        <button
          className="yellow ui button"
          onClick={() => {
            setWritingMode("DEFAULT");
          }}
        >
          추가 완료
        </button>
      </div>

      {page === PAGE_PRODUCTS && (
        <Products
          type={type}
          cart={cart}
          setCart={setCart}
          diary={diary}
          setDiary={setDiary}
        />
      )}
      {page === PAGE_CART && (
        <Cart
          type={type}
          diary={diary}
          setDiary={setDiary}
          cart={cart}
          setCart={setCart}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default AddFood;
