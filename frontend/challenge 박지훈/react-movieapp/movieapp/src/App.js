import React from "react";
import {   HashRouter, Route } from "react-router-dom"
import Navigation from "./components/Navigation";
import About from "./routes/About"
import Detail from "./routes/Detail"
import Home from "./routes/Home";

function App() {
  return (
  <HashRouter>
    <Navigation />

    <Route path="/" exact={true} component={Home} />
      
    <Route path="/about">
       <h1>About</h1>   
    </Route>
    <Route path="/movie/:id" component={Detail}/>
  </HashRouter>
  );  
}

export default App;