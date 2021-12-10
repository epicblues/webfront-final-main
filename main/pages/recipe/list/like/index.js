import React, { useState } from "react";
import Navigation from "../../../../components/recipe/index/Navigation";

const Index = () => {
  const [currentURL, setCurrentURL] = useState("/recipe/list/like");
  return (
    <div>
      <Navigation currentURL={currentURL}></Navigation>
    </div>
  );
};

export default Index;
