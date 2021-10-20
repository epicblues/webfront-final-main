import React, { useState } from 'react';

import './App.css';

import RecipeRouter from './RecipeRouter';
import Home from './components/pageComponents/main/Home';

function App() {
 
  return (
      <div className="container">
        <RecipeRouter>
          <Home/>
        </RecipeRouter>
      </div>
  )
}

export default App;