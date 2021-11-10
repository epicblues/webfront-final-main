import React from 'react'

import ImageUpload from "./ImageUpload";
import List from "./List";

const PAGE_PRODUCTS = "products";

const LookupMeal = ({ diary, setDiary, type }) => { 
  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const cart = diary.meals[type].foods;
  // 열량 kcal total
  const getTotalSum = () => {
    return cart.reduce((sum, { kcal, quantity }) => sum + kcal * quantity, 0);
  };
  // 탄수화물 carbs total
  const carbsTotalSum = () => {
    return cart.reduce((sum, { carbs, quantity }) => sum + carbs * quantity, 0);
  }
  // 단백질 protein total
  const protTotalSum =  () => {
    return cart.reduce((sum, { prot, quantity }) => sum + prot * quantity, 0);
  }
  // 지방 fat total
  const fatTotalSum = () => {
    return cart.reduce((sum, { fat, quantity }) => sum + fat * quantity, 0);
  }
  
  return (
    <div style={{ padding: "0 16px 16px" }}>
        
        <ImageUpload />

        <div
              class="ui large horizontal divided list"
              style={{}}
        >
          <div class="item">
            칼로리
            <div class="content">
              <div class="header">{getTotalSum()}</div>
            </div>
          </div>
          <div class="item">
            탄수화물
            <div class="content">
              <div class="header">{carbsTotalSum()}</div>
            </div>
          </div>
          <div class="item">
            단백질
            <div class="content">
              <div class="header">{protTotalSum()}</div>
            </div>
          </div>
          <div class="item">
            지방
            <div class="content">
              <div class="header">{fatTotalSum()}</div>
            </div>
          </div>
        </div>

        <div className="ui middle aligned divided list">
        {cart.map((product, index) => (
          <List
            product={product}
            index={index}
            
          />
        ))}
        </div>

        <button
          className="ui fluid button blue"
          onClick={() => navigateTo(PAGE_PRODUCTS)}
        >
          편집 및 추가하기
        </button>

    </div>
  )
}

export default LookupMeal
