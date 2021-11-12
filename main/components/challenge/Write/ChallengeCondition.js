import { React, useState } from "react";
import { Header } from "semantic-ui-react";

import ChallengeWrite from "./ChallengeWrite";
const ChallengeCondition = ({ challenge, setChallenge }) => {
  const handleChange = (e) => {
    setChallenge({
      ...challenge,
      challengeType: checkedInputs,
      diet: {
        type: checkedInputs2,
        dailyCalorie: checkedInputs3,
        condition: checkedInputs4,
      },
      recipe: {
        kind: dropdown,
        uploadCount: checkedInputs5,
      },
    });
  };
  const [checkedInputs, setCheckInputs] = useState(false);
  const [checkedInputs2, setCheckInputs2] = useState(false);
  const [checkedInputs3, setCheckInputs3] = useState(false);
  const [checkedInputs4, setCheckInputs4] = useState(false);
  const [checkedInputs5, setCheckInputs5] = useState(false);
  const [dropdown, setDropDown] = useState("");

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
          name="challenge"
          value="diet"
          checked={challenge.challengeType === "diet"}
          onChange={(e) => {
            setCheckInputs(e.currentTarget.value), handleChange();
          }}
        />
        <label> diet</label>
        <input
          type="radio"
          id="2"
          name="challenge"
          value="recipe"
          checked={challenge.challengeType === "recipe"}
          onChange={(e) => {
            setCheckInputs(e.currentTarget.value), handleChange();
          }}
        />
        <label>recipe</label>
        {checkedInputs === "diet" ? (
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
                onChange={(e) => {
                  setCheckInputs2(e.currentTarget.value), handleChange();
                }}
              />
              <label>살 찌우는 다이어트</label>
              <input
                type="radio"
                id="4"
                name="type"
                value="minusKcal"
                checked={challenge.diet.type === "minusKcal"}
                onChange={(e) => {
                  setCheckInputs2(e.currentTarget.value), handleChange();
                }}
              />
              <label>살 빼는 다이어트</label>
            </div>
          </>
        ) : (
          <>
            <Header as="h4" inverted color="blue">
              레시피 종류
            </Header>
            <div className="recipeKind">
              <select
                name="kind"
                value={challenge.recipe.kind}
                onChange={(e) => {
                  setDropDown(e.currentTarget.value), handleChange();
                }}
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
      {checkedInputs === "diet" ? (
        <>
          <Header as="h4" inverted color="blue">
            다이어트 조건 ( 기준: 하루 섭취량)
          </Header>
          <div className="dietCondition1">
            <input
              type="radio"
              id="5"
              name="dailyCalorie"
              value="1500kcal"
              checked={challenge.diet.dailyCalorie === "1500kcal"}
              onChange={(e) => {
                setCheckInputs3(e.currentTarget.value), handleChange();
              }}
            />
            <label>1500kcal</label>
            <input
              type="radio"
              id="6"
              name="dailyCalorie"
              value="2000kcal"
              checked={challenge.diet.dailyCalorie === "2000kcal"}
              onChange={(e) => {
                setCheckInputs3(e.currentTarget.value), handleChange();
              }}
            />
            <label>2000kcal</label>
            <input
              type="radio"
              id="7"
              name="dailyCalorie"
              value="2500kcal"
              checked={challenge.diet.dailyCalorie === "2500kcal"}
              onChange={(e) => {
                setCheckInputs3(e.currentTarget.value), handleChange();
              }}
            />
            <label>2500kcal</label>
            <input
              type="radio"
              id="8"
              name="dailyCalorie"
              value="3000kcal"
              checked={challenge.diet.dailyCalorie === "3000kcal"}
              onChange={(e) => {
                setCheckInputs3(e.currentTarget.value), handleChange();
              }}
            />
            <label>3000kcal</label>
          </div>
        </>
      ) : null}

      {checkedInputs === "diet" ? (
        <>
          <Header as="h4" inverted color="blue">
            다이어트 완료 일수
          </Header>
          <div className="dietCondition2">
            <input
              type="radio"
              id="9"
              name="condition"
              value="7days"
              checked={challenge.diet.condition === "7days"}
              onChange={(e) => {
                setCheckInputs4(e.currentTarget.value), handleChange();
              }}
            />
            <label>7일</label>
            <input
              type="radio"
              id="10"
              name="condition"
              value="15days"
              checked={challenge.diet.condition === "15days"}
              onChange={(e) => {
                setCheckInputs4(e.currentTarget.value), handleChange();
              }}
            />
            <label>15일</label>
            <input
              type="radio"
              id="11"
              name="condition"
              value="30days"
              checked={challenge.diet.condition === "30days"}
              onChange={(e) => {
                setCheckInputs4(e.currentTarget.value), handleChange();
              }}
            />
            <label>30일</label>
          </div>
        </>
      ) : (
        <>
          <Header as="h4" inverted color="blue">
            레시피 업로드 횟수
          </Header>
          <div className="recipeUploadCount">
            <input
              type="radio"
              id="12"
              name="recipeCount"
              value="3times"
              checked={challenge.recipe.uploadCount === "3times"}
              onChange={(e) => {
                setCheckInputs5(e.currentTarget.value), handleChange();
              }}
            />
            <label>3회</label>
            <input
              type="radio"
              id="13"
              name="receipeCount"
              value="5times"
              checked={challenge.recipe.uploadCount === "5times"}
              onChange={(e) => {
                setCheckInputs5(e.currentTarget.value), handleChange();
              }}
            />
            <label>5회</label>
            <input
              type="radio"
              id="14"
              name="receipeCount"
              value="7times"
              checked={challenge.recipe.uploadCount === "7times"}
              onChange={(e) => {
                setCheckInputs5(e.currentTarget.value), handleChange();
              }}
            />
            <label>7회</label>
            <input
              type="radio"
              id="15"
              name="receipeCount"
              value="9times"
              checked={challenge.recipe.uploadCount === "9times"}
              onChange={(e) => {
                setCheckInputs5(e.currentTarget.value), handleChange();
              }}
            />
            <label>9회</label>
          </div>
        </>
      )}
    </div>
  );
};

export default ChallengeCondition;
