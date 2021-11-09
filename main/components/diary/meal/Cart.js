import React from "react";

import ImageUpload from "./ImageUpload";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

export default function Cart({
  diary,
  setDiary,
  setCart,
  page,
  setPage,
  type,
}) {
  const cart = diary.meals[type].foods;
  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const getTotalSum = () => {
    return cart.reduce((sum, { kcal, quantity }) => sum + kcal * quantity, 0);
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
    const newCart = [...cart];
    newCart.find((item) => item.name === product.name).quantity = total;
    setCart(newCart);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  return (
    <div style={{ padding: "0 16px 16px" }}>
      <ImageUpload />
      <div style={{ textAlign: "right" }}>
        {cart.length > 0 && (
          <i className="red large trash alternate icon" onClick={clearCart}></i>
        )}
      </div>
      <div className="ui middle aligned divided list">
        {cart.map((product, index) => (
          <div className="item" key={index} style={{ padding: "8px 0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "left",
              }}
            >
              <div className="header">
                {product.name}
                <div className="description">
                  {product.mfr} / {product.serve}{product.unit}
                </div>
              </div>
              <div className="ui input">
                <p style={{ margin: "8px 10px 0 0" }}>
                  {product.kcal}Kcal
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      padding: "0 0 0 8px",
                    }}
                  >
                    {" "}
                    x
                  </span>
                </p>
                <input
                  style={{ marginRight: 8 }}
                  type="text"
                  value={product.quantity}
                  onChange={(e) =>
                    setQuantity(product, parseInt(e.target.value))
                  }
                />
                <i
                  className="red large minus circle icon"
                  style={{ marginTop: 8 }}
                  onClick={() => removeFromCart(product)}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="ui fluid button blue"
        onClick={() => navigateTo(PAGE_PRODUCTS)}
      >
        더 추가하기
      </button>

      {/* {page === PAGE_CART && <Cart cart={cart} setCart={setCart} />} */}

      <div style={{ marginTop: "16px" }}>
        오늘 아침 섭취 열량은 {getTotalSum()} kcal 입니다
      </div>
    </div>
  );
}
