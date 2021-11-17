import { React, useState } from "react";
import { Header } from "semantic-ui-react";

import RecipeUploadCount from "./RecipeUploadCount";
import DietCondition from "./DietCondition";
import DietCondition2 from "./DietCondition2";
const ChallengeCondition = ({ challenge, setChallenge }) => {
  const handleChange = (e) => {
    setChallenge({
      ...challenge,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleDiet = (e) => {
    const newDiet = {
      ...challenge.diet,
      [e.currentTarget.name]: e.currentTarget.value,
    };

    setChallenge({
      ...challenge,
      diet: newDiet,
    });
  };

  const handleRecipe = (e) => {
    const newRecipe = {
      ...challenge.recipe,
      [e.currentTarget.name]: e.currentTarget.value,
    };

    setChallenge({
      ...challenge,
      recipe: newRecipe,
    });
  };

  return (
    <div className="challengeCondition" style={{ backgroundColor: "#EAEAEA" }}>
      <Header as="h3" inverted color="blue" className="challengeContent">
        챌린지 조건
      </Header>
      <div className="challengeKind">
        <Header as="h4" inverted color="blue">
          챌린지의 종류
        </Header>
        <input
          type="radio"
          id="1"
          name="type"
          value="diet"
          checked={challenge.type === "diet"}
          onChange={handleChange}
        />
        <label> 다이어트</label>
        <input
          type="radio"
          id="2"
          name="type"
          value="recipe"
          checked={challenge.type === "recipe"}
          onChange={handleChange}
        />
        <label>레시피</label>
        {challenge.type === "diet" && (
          <>
            <Header as="h4" inverted color="blue">
              다이어트 종류
            </Header>
            <div className="dietKind">
              <input
                type="radio"
                name="kind"
                value="plusKcal"
                checked={challenge.diet.kind === "plusKcal"}
                onChange={handleDiet}
              />
              <label>체중증가 다이어트</label>
              <input
                type="radio"
                name="kind"
                value="minusKcal"
                checked={challenge.diet.kind === "minusKcal"}
                onChange={handleDiet}
              />
              <label>체중감량 다이어트</label>
            </div>
          </>
        )}{" "}
        {challenge.type === "recipe" && (
          <>
            <Header as="h4" inverted color="blue">
              레시피 종류
            </Header>
            <div className="recipeKind">
              <select
                name="kind"
                value={challenge.recipe.kind}
                onChange={handleRecipe}
              >
                <option key="so" value="soup">
                  Soup
                </option>
                <option key="no" value="noodle">
                  Noodle
                </option>
                <option key="de" value="dessert">
                  Dessert
                </option>
                <option key="ri" value="rice">
                  Rice
                </option>
                <option key="ki" value="kimchi">
                  Kimchi
                </option>
                <option key="gr" value="grill">
                  Grill
                </option>
                <option key="et" value="etc">
                  Etc
                </option>
              </select>
            </div>
          </>
        )}
      </div>
      {challenge.type === "diet" ? (
        <>
          <Header as="h4" inverted color="blue">
            다이어트 조건 ( 기준: 하루 섭취량)
          </Header>
          <div className="dietCondition1">
            {["1500", "2000", "2500", "3000"].map((value) => {
              console.log(challenge);
              return (
                <DietCondition
                  key={value}
                  value={value}
                  checked={challenge.diet.dailyCalorie === value}
                  onChange={handleDiet}
                />
              );
            })}
          </div>
        </>
      ) : null}
      {challenge.type === "diet" && (
        <>
          <Header as="h4" inverted color="blue">
            다이어트 완료 일수
          </Header>
          <div className="dietCondition2">
            {["3", "5", "10"].map((value) => {
              return (
                <DietCondition2
                  key={value}
                  value={value}
                  checked={challenge.diet.condition === value}
                  onChange={handleDiet}
                />
              );
            })}
          </div>
        </>
      )}
      {challenge.type === "recipe" && (
        <>
          <Header as="h4" inverted color="blue">
            레시피 업로드 횟수
          </Header>
          <div className="recipeUploadCount">
            {["3", "5", "7", "9"].map((value) => {
              return (
                <RecipeUploadCount
                  key={value}
                  value={value}
                  checked={challenge.recipe.uploadCount === value}
                  onChange={handleRecipe}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ChallengeCondition;
