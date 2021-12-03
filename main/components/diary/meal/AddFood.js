import React from "react";
import { useState } from "react";
import { postStaticAxios } from "../../../util/axios";
import { getDateId } from "../../../util/date";

import Products from "./Products";
import Cart from "./Cart";
import LookupMeal from "./LookupMeal";
import MultiBtn from "../meal/MultiBtn";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const mealType = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];
export const [PAGE_PRODUCTS, PAGE_CART] = ["products", "cart"];

function AddFood({ type, setWritingMode, diary, setDiary, writingMode, user }) {
  // Page 이동
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  // Count
  const getCartTotal = () => {
    return (
      diary.meals[type].foods.length
    );
  };

  // 취소<->완료 멀티 버튼
  const showAdd =
    diary.meals[type].foods.length === 0 && !diary.meals[type].imageBuffer;
  const multiBtn = async (e) => {
    if (!showAdd) {
      await saveMeal();
    } else {
      return saveMeal();
    }
  };

  // 취소버튼 - Count 0으로
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
  };

  // 완료 버튼
  const saveMeal = async () => {
    const formData = new FormData();
    const mealToUpdate = diary.meals[type];
    const isWritten = !(mealToUpdate.foods.length === 0 && !mealToUpdate.imageBuffer)
    mealToUpdate.written = isWritten;
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
      "/api/diary/update",
      user.token,
      formData
    );
    console.log(result);

    // 수정해야함 diary의 state를 비동기적으로 변경하는 함수로
    setWritingMode("DEFAULT");
    setDiary((diary) => {
      const newDiary = { ...diary };
      newDiary.meals[type].written = isWritten
      return newDiary;
    });
  };

  return (
    <div>
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
          <div className="add-food-wrap">
            <div className='add-food-header'>
              <MultiBtn
                        color={showAdd ? "#a0a0a0" : "#02b0b0"}
                        text={showAdd ? "취소" : "완료"}
                        onClick={multiBtn}
              />
              <span>{mealType[type]}</span>
              <FontAwesomeIcon
                              icon={faList}
                              className='icon'
                              onClick={() => navigateTo(PAGE_CART)}
              />
              <a>{getCartTotal()}</a>
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
    </div>
  );
}

export default AddFood;
