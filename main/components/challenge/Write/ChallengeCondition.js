import { React, useState } from "react";
import { Header } from "semantic-ui-react";

import ChallengeWrite from "./ChallengeWrite";
import DietCondition from "./DietCondition";
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
          name="challengeType"
          value="diet"
          checked={challenge.challengeType === "diet"}
          onChange={handleChange}
        />
        <label> diet</label>
        <input
          type="radio"
          id="2"
          name="challengeType"
          value="recipe"
          checked={challenge.challengeType === "recipe"}
          onChange={handleChange}
        />
        <label>recipe</label>
        {challenge.challengeType === "diet" && (
          <>
            <Header as="h4" inverted color="blue">
              다이어트 종류
            </Header>
            <div className="dietKind">
              <input
                type="radio"
                id="3"
                name="type"
                value="plusKcal"
                checked={challenge.diet.type === "plusKcal"}
                onChange={handleDiet}
              />
              <label>체중증가 다이어트</label>
              <input
                type="radio"
                id="4"
                name="type"
                value="minusKcal"
                checked={challenge.diet.type === "minusKcal"}
                onChange={handleDiet}
              />
              <label>체중감량 다이어트</label>
            </div>
          </>
        )}{" "}
        {challenge.challengeType === "recipe" && (
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
      {challenge.challengeType === "diet" ? (
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
      {challenge.challengeType === "diet" && (
        <>
          <Header as="h4" inverted color="blue">
            다이어트 완료 일수
          </Header>
          <div className="dietCondition2">
            <input
              type="radio"
              id="9"
              name="condition"
              value="3"
              checked={challenge.diet.condition === "3"}
              onChange={handleDiet}
            />
            <label>3일</label>
            <input
              type="radio"
              id="10"
              name="condition"
              value="5"
              checked={challenge.diet.condition === "5"}
              onChange={handleDiet}
            />
            <label>5일</label>
            <input
              type="radio"
              id="11"
              name="condition"
              value="10"
              checked={challenge.diet.condition === "10"}
              onChange={handleDiet}
            />
            <label>10일</label>
          </div>
        </>
      )}
      {challenge.challengeType === "recipe" && (
        <>
          <Header as="h4" inverted color="blue">
            레시피 업로드 횟수
          </Header>
          <div className="recipeUploadCount">
            <input
              type="radio"
              id="12"
              name="uploadCount"
              value="3"
              checked={challenge.recipe.uploadCount === "3"}
              onChange={handleRecipe}
            />
            <label>3회</label>
            <input
              type="radio"
              id="13"
              name="uploadCount"
              value="5"
              checked={challenge.recipe.uploadCount === "5"}
              onChange={handleRecipe}
            />
            <label>5회</label>
            <input
              type="radio"
              id="14"
              name="uploadCount"
              value="7"
              checked={challenge.recipe.uploadCount === "7"}
              onChange={handleRecipe}
            />
            <label>7회</label>
            <input
              type="radio"
              id="15"
              name="uploadCount"
              value="9"
              checked={challenge.recipe.uploadCount === "9"}
              onChange={handleRecipe}
            />
            <label>9회</label>
          </div>
        </>
      )}
    </div>
  );
};

export default ChallengeCondition;
