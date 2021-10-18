import React, { useState, useCallback } from "react";
import { Route } from "react-router";
import NewsPage from "./Pages/NewsPage";
const App = () => {
  return <Route path="/:categotry?" component={NewsPage} />;
};

export default App;
