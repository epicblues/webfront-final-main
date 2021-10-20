// component ReadRecipe.js

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/pageComponents/main/Home";
import ReadRecipe from "./components/pageComponents/recipeItem/ReadRecipe";

const RecipeRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route path="/card/:post_id" component={ReadRecipe} />
            </Switch>
        </BrowserRouter>
    )
}

export default RecipeRouter;