import React from "react";
import { useState } from "react";

import Products from "./Products";
import Cart from "./Cart";
import LookupMeal from "./LookupMeal";

const mealType = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];

function AddFood({ type, setWritingMode, diary, setDiary,writingMode }) {
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
    return (
      diary.meals[type].foods.reduce((prev, current) => {
        return prev + current.quantity;
      }, 0) || 0
    );
  };

  return (
    <>
    {writingMode === type ? (
       diary.meals[type].written ?  
           <LookupMeal type={type} diary={diary} setDiary={setDiary}/>
           : <div
           className="AddFood"
           style={{ border: "solid 2px lightgray", borderRadius: "5px" }}
         >
           <div
             style={{
               display: "flex",
               justifyContent: "space-between",
               padding: "16px"
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
                 setDiary(diary => {
                   const newDiary = {...diary}
                   newDiary.meals[type].written = true;
                   return newDiary
                 })
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
               page={page}
               setPage={setPage}
             />
           )}
         </div>
       
      ) : null}
    
    </>
  );
}

export default AddFood;
