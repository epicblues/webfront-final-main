import { React } from "react";
import { Header, Icon, Popup } from "semantic-ui-react";
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css";
import ButtonStyles from "../../../styles/challenge/Radio.module.css";
import InputStyles from "../../../styles/challenge/Input.module.css";
import { FLEXBOX_NORMAL } from "../../../constants";
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
          {i}일
        </option>
      );
    }
    return newDateDiff;
  };

  return (
    <div className="challengeCondition">
      <h3 className={ChallengeStyle.h3}>챌린지 조건</h3>
      <div className={ChallengeStyle.causion}>
        주의!
        <Popup
          style={{ display: "flex", justifyContent: "space-around" }}
          header="챌린지 조건"
          content="다이어트 챌린지 조건은 아침,점심,저녁,간식을 모두 작성해야만 조건이 성립합니다."
          trigger={<Icon name="info circle" size="large" color="grey"></Icon>}
        />
      </div>
      <br />

      <div className="challengeKind">
        <h4 className={ChallengeStyle.h4}>챌린지의 종류</h4>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className={ButtonStyles.radiowrap}>
            <label>
              <input
                type="radio"
                id="1"
                name="type"
                value="diet"
                checked={challenge.type === "diet"}
                onChange={handleChange}
              />
              다이어트
            </label>
            <br />
            <label>
              <input
                type="radio"
                id="2"
                name="type"
                value="recipe"
                checked={challenge.type === "recipe"}
                onChange={handleChange}
              />
              레시피
            </label>
          </div>
        </div>
        {challenge.type === "diet" && (
          <>
            <div>
              <h4 className={ChallengeStyle.h4}>다이어트 종류</h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={ButtonStyles.radiowrap}>
                  <input
                    type="radio"
                    name="kind"
                    value="plusKcal"
                    checked={challenge.diet.kind === "plusKcal"}
                    onChange={handleDiet}
                  />
                  <label>체중증가 다이어트</label>
                  <br />
                  <input
                    type="radio"
                    name="kind"
                    value="minusKcal"
                    checked={challenge.diet.kind === "minusKcal"}
                    onChange={handleDiet}
                  />
                  <label>체중감량 다이어트</label>
                </div>
              </div>
            </div>
          </>
        )}{" "}
        {challenge.type === "recipe" && (
          <>
            <h4 className={ChallengeStyle.h4Mt}>레시피 종류</h4>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="recipeCategory">
                <select
                  style={{
                    width: "100px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                  name="category"
                  value={challenge.recipe.category}
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
            </div>
          </>
        )}
      </div>
      {challenge.type === "diet" ? (
        <>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <h4 className={ChallengeStyle.h4}>
              다이어트 조건 ( 기준: 하루, Kcal)
            </h4>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <div className="dietCondition1">
              <input
                className={InputStyles.text}
                type="number"
                name="dailyCalorie"
                placeholder="       하루 섭취량을 적어주세요"
                value={challenge.diet.dailyCalorie}
                onChange={handleDiet}
                ref={dailyCalorie}
              />
            </div>
          </div>
        </>
      ) : null}
      {challenge.type === "diet" && (
        <>
          <h4 className={ChallengeStyle.h4Mt}>다이어트 완료 일수</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <div className="dietCondition">
              <select
                style={{
                  width: "60px",
                  marginTop: "10px",
                  textAlign: "center",
                }}
                name="condition"
                value={challenge.diet.condition}
                onChange={handleDiet}
              >
                {repeatOption()}
              </select>
            </div>
          </div>
        </>
      )}
      {challenge.type === "recipe" && (
        <>
          <h4 className={ChallengeStyle.h4Mt}>레시피 업로드 횟수(단위: 회)</h4>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="recipeUploadCount">
              <input
                className={InputStyles.text}
                type="number"
                name="uploadCount"
                placeholder="업로드 횟수를 적어주세요"
                value={challenge.recipe.uploadCount}
                onChange={handleRecipe}
                ref={uploadCount}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChallengeCondition;
