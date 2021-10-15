import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, } from 'react-router-dom';

import Date from './components/Date';
import Breakfast from './components/meal/Breakfast';
import Lunch from './components/meal/Lunch';
import Dinner from './components/meal/Dinner';
import Snack from './components/meal/Snack';
import AddFood from './AddFood'

import './App.css';

function App() {
  const [showMeal, setShowMeal] = useState(false);

  return (
    <Router>
      <div className="App">
        <Date />
        <button onClick={() => {setShowMeal(!showMeal)}}>{showMeal? "ShowReview" : "ShowMeal"}</button>
        {showMeal ?
        <>
          <div style={{width:'100px', height:'100px', background: 'pink'}}>아침<Breakfast /></div>
          <div style={{width:'100px', height:'100px', background: 'orange'}}>점심<Lunch /></div>
          <div style={{width:'100px', height:'100px', background: 'skyblue'}}>저녁<Dinner /></div>
          <div style={{width:'100px', height:'100px', background: 'yellow'}}>간식<Snack /></div>
        </>
         : ''}
                
  
        
        

        <switch>
          <Route path="/AddFood">
            <AddFood/>
          </Route>
         
          <Route path="/Breakfast">
            <Breakfast/>
          </Route>
          <Route path="/Lunch">
            <Lunch/>
          </Route>
          <Route path="/Dinner">
            <Dinner/>
          </Route>
          <Route path="/Snack">
            <Snack/>
          </Route>
          
        </switch>

      </div>
    </Router>
  );
}



export default App;
