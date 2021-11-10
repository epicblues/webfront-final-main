import React from 'react'

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
        
        <div style={{width: "100%", height: "40vh"}}>
          <img src={diary.meals[type].imageBuffer}
                className='ui rounded image'
                style={{objectFit: 'cover', width: '100%', height: '100%'}}
          />
        </div>

        <div
              className="ui large horizontal divided list"
              style={{display: 'flex'}}
        >
          <div className="item" style={{width: '25%'}}>
              <div className='content' style={{marginBottom: '8px'}}>칼로리</div>
              <div className="header">{getTotalSum()}kcal</div>
          </div>
          <div className="item" style={{width: '25%'}}>
              <div className='content' style={{marginBottom: '8px'}}>탄수화물</div>
              <div className="header">{carbsTotalSum()}g</div>
          </div>
          <div className="item" style={{width: '25%'}}>
              <div className='content' style={{marginBottom: '8px'}}>단백질</div>
              <div className="header">{protTotalSum()}g</div>
          </div>
          <div className="item" style={{width: '25%'}}>
              <div className='content' style={{marginBottom: '8px'}}>지방</div>
              <div className="header">{fatTotalSum()}g</div>
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
          onClick={() => setDiary(diary => {
            const newDiary = {...diary}
            newDiary.meals[type].written = false;
            return newDiary;
          })}
        >
          편집 및 추가하기
        </button>

    </div>
  )
}

export default LookupMeal
