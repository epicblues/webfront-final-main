import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import './App.css';
import Categories from './components/CategoryComponents/Categories'
import Search from './components/MainPageComponents/Search';
import ShowLatestRecipe from './components/listComponents/ShowLatestRecipe';

function App() {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <BrowserRouter>
      <div className="container">
        {/* 홈 */}
          <h1>Recipe Main</h1>  

        {/* 카테고리 검색 */}
        <input type="button" value="카테고리 펼치기" 
          onClick={() => {setShowCategories( showCategories ? false : true)}}
        />
        {showCategories ? <Categories></Categories> : null}

        {/* 검색창 */}
        <Search></Search>

        {/* 인기 레시피 */}
        <h3>인기 레시피</h3>
        <ShowLatestRecipe ></ShowLatestRecipe>
        <ShowLatestRecipe ></ShowLatestRecipe>

        {/* 최신 레시피 */}
        <h3>최신 레시피</h3>
        <ShowLatestRecipe ></ShowLatestRecipe>
        <ShowLatestRecipe ></ShowLatestRecipe>
      </div>
      <Switch>
      </Switch>
    </BrowserRouter>
  )
}

export default App;