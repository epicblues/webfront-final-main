import "./App.css";
import React, { useState } from "react";
import { Route } from "react-router-dom";
import ChallengeListPage from "./Pages/ChallegeListPage";
import ChallengePage from "./Pages/ChallengePage";
import ChallengeWritePage from "./Pages/ChallengeWritePage";
import ChallengeListItem from "./Components/ChallengeList/ChallengeListItem";
import ChallengeData from "./Data/ChallengeData";
const App = () => {
  const [challenges, setChallegnes] = useState(ChallengeData);
  return (
    <>
      <Route component={ChallengeListPage} path="/challengeList" />
      <Route component={ChallengePage} path="/challenge" />
      <Route component={ChallengeWritePage} path="/write" />
    </>
  );
};

export default App;
