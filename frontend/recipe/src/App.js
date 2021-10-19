import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import './App.css';

import Categories from './components/pageComponents/main/Categories'
import Search from './components/pageComponents/main/Search';
import ShowLatestRecipe from './components/pageComponents/recipeList/ShowLatestRecipe';

import FoodData from './Data/FoodData';

function App() {
  const [showCategories, setShowCategories] = useState(false);
  const [foodData, setFoodData] = useState(FoodData);

  return (
    <BrowserRouter>
      <div className="container">
        {/* 홈 */}
        <Link exact to="/">
          <h1>Recipe Main</h1>
        </Link>

        {/* 카테고리 검색 */}
        <input type="button" value="카테고리 펼치기" 
          onClick={() => {setShowCategories( showCategories ? false : true)}}
        />
        {showCategories ? <Categories></Categories> : null}

        {/* 검색창 */}
        <Search></Search>

        {/* 인기 레시피 */}
        <h3>인기 레시피</h3>

        {/* 최신 레시피 */}
        <h3>최신 레시피</h3>
        <ShowLatestRecipe foodData={foodData}/>
      </div>
      <Switch>
      </Switch>
    </BrowserRouter>
  )
}

export default App;