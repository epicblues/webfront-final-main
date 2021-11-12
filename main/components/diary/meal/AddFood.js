import React from "react";
import { useState } from "react";

import Products from "./Products";
import Cart from "./Cart";
import LookupMeal from "./LookupMeal";
import { postStaticAxios } from "../../../util/axios";
import { getDateId } from "../../../util/date";

const mealType = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];
export const [PAGE_PRODUCTS, PAGE_CART] = ["products","cart"]
function AddFood({ type, setWritingMode, diary, setDiary, writingMode, user }) {
 
  // Page 이동
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const clearCart = () => {
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
  }

  // 추가 완료 Button
  const saveMeal = async () => {
    const formData = new FormData();
    const mealToUpdate = diary.meals[type];

    formData.append("type", type);

    for (const key in mealToUpdate) {
      formData.set(
        key,
        key === "foods" ? JSON.stringify(mealToUpdate[key]) : mealToUpdate[key]
      );
      formData.delete("imageBuffer");
    }

    formData.append("upload_date", diary.upload_date);

    const result = await postStaticAxios(
      user.url + "/api/diary/update",
      user.token,
      formData
    );

    // 수정해야함 diary의 state를 비동기적으로 변경하는 함수로
    setWritingMode("DEFAULT");
    setDiary((diary) => {
      const newDiary = { ...diary };
      newDiary.meals[type].written = true;
      return newDiary;
    });
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  // Count
  const getCartTotal = () => {
    return (
      diary.meals[type].foods.reduce((prev, current) => {
        return prev + current.quantity;
      }, 0) || 0
    );
  };

  return (
    <>
      {writingMode === type ? (
        diary.meals[type].written ? (
          <LookupMeal
            type={type}
            diary={diary}
            setDiary={setDiary}
            user={user}
            setWritingMode={setWritingMode}
            setPage={setPage}
          />
        ) : (
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

              <button className='ui red button'
                      onClick={(e) => {
                        setWritingMode("DEFAULT");
                        clearCart()
                      }}
              >
                취소
              </button>
              

              <div>
                <span>{mealType[type]}</span>
                <a
                  className="ui teal circular label"
                  onClick={() => navigateTo(PAGE_CART)}
                >
                  {getCartTotal()}
                </a>
              </div>
              
              <button className="yellow ui button"
              onClick={ () => { saveMeal(); }}
              disabled = {!(diary.meals[type].foods.length !== 0)}
              >
                완료
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
                page={page}
                setPage={setPage}
              />
            )}
          </div>
        )
      ) : null}
    </>
  );
}

export default AddFood;
