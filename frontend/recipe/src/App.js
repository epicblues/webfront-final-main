import React, { useState } from 'react';

import './App.css';

import RcpData from './Data/RecipeData';
import Router from './Router';
import Home from './components/pageComponents/main/Home';

function App() {
  const [showCategories, setShowCategories] = useState(false);
  const [rcpData, setRcpData] = useState(RcpData);  

  return (
      <div className="container">
        <Router>
          <Home props={showCategories, rcpData}/>
        </Router>
      </div>
  )
}

export default App;