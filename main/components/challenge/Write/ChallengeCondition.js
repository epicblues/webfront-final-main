import { React, useState, useRef } from "react";
import { Header } from "semantic-ui-react";

const ChallengeCondition = ({
  challenge,
  setChallenge,
  dailyCalorie,
  dailyCalorieError,
  uploadCount,
  uploadCountError,
}) => {
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
  const repeatOption = () => {
    const newDateDiff = [];
    for (let i = 1; i <= challenge.dateDiff + 1; i++) {
      newDateDiff.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return newDateDiff;
  };

  return (
    <div className="challengeCondition">
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
                  국/탕/찌개
                </option>
                <option key="no" value="noodle">
                  면/파스타
                </option>
                <option key="de" value="dessert">
                  디저트
                </option>
                <option key="ri" value="rice">
                  밥/볶음밥
                </option>
                <option key="ki" value="kimchi">
                  김치
                </option>
                <option key="gr" value="grill">
                  구이
                </option>
                <option key="si" value="sideDish">
                  반찬
                </option>
                <option key="et" value="etc">
                  기타
                </option>
              </select>
            </div>
          </>
        )}
      </div>
      {challenge.type === "diet" ? (
        <>
          <Header as="h4" inverted color="blue">
            다이어트 조건 ( 기준: 하루, Kcal)
          </Header>
          <h3 ref={dailyCalorieError}></h3>
          <div className="dietCondition1">
            <input
              style={{
                color: "#5CD1E5",
                fontWeight: "bold",
                border: "3px solid",
                width: "180px",
                borderRadius: "5px",
                borderColor: "#6B66FF",
              }}
              type="number"
              name="dailyCalorie"
              placeholder="하루 섭취량을 적어주세요"
              value={challenge.diet.dailyCalorie}
              onChange={handleDiet}
              ref={dailyCalorie}
            />
          </div>
        </>
      ) : null}
      {challenge.type === "diet" && (
        <>
          <Header as="h4" inverted color="blue">
            다이어트 완료 일수
          </Header>
          <div className="dietCondition">
            <select
              name="condition"
              value={challenge.diet.condition}
              onChange={handleDiet}
            >
              {repeatOption()}
            </select>
          </div>
        </>
      )}
      {challenge.type === "recipe" && (
        <>
          <Header as="h4" inverted color="blue">
            레시피 업로드 횟수(단위: 회)
          </Header>
          <h4 ref={uploadCountError}></h4>
          <div className="recipeUploadCount">
            <input
              style={{
                color: "#5CD1E5",
                fontWeight: "bold",
                border: "3px solid",
                width: "180px",
                borderRadius: "5px",
                borderColor: "#6B66FF",
              }}
              type="number"
              name="uploadCount"
              placeholder="업로드 횟수를 적어주세요"
              value={challenge.recipe.uploadCount}
              onChange={handleRecipe}
              ref={uploadCount}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChallengeCondition;
