import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, } from 'react-router-dom';

import SelectDate from './components/SelectDate';
import Breakfast from './components/meal/Breakfast';
import Lunch from './components/meal/Lunch';
import Dinner from './components/meal/Dinner';
import Snack from './components/meal/Snack';
import ReviewPage from './components/review/ReviewPage';
import AddFood from './AddFood';

import './App.css';

function App() {
  const [showMeal, setShowMeal] = useState(false);

  return (
    <Router>
      <div className="App">
        <SelectDate /><br />

        <button onClick={() => {setShowMeal(!showMeal)}}>{showMeal? "ShowMeal" : "ShowReview"}</button>
        {showMeal ?
          <ReviewPage />
         : 
         <>
          <div style={{width:'100px', height:'100px', background: 'pink'}}>아침<Breakfast /></div>
          <div style={{width:'100px', height:'100px', background: 'orange'}}>점심<Lunch /></div>
          <div style={{width:'100px', height:'100px', background: 'skyblue'}}>저녁<Dinner /></div>
          <div style={{width:'100px', height:'100px', background: 'yellow'}}>간식<Snack /></div>
        </>
        }
      </div>
      
      <Switch>
        <AddFood />
      </Switch>

    </Router>
  );
}

export default App;
