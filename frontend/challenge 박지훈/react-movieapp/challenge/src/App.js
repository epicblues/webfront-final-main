import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import ChallengeListPage from "./Pages/ChallegeListPage";
import ChallengePage from "./Pages/ChallengePage";
import WritePage from "./Pages/WritePage";

const App = () => {
  return (
    <>
      <Route component={ChallengeListPage} path="/challengeList" />
      <Route component={ChallengePage} path="/challenge" />
      <Route component={WritePage} path="/write" />
    </>
  );
};

export default App;
