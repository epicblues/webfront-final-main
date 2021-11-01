import { React, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Input, Button, Header } from "semantic-ui-react";

const ChallengeCondition = () => {
  const [checkedInputs, setCheckInputs] = useState(false);
  const [checkedInputs2, setCheckInputs2] = useState(false);
  const [checkedInputs3, setCheckInputs3] = useState(false);
  const [checkedInputs4, setCheckInputs4] = useState(false);
  const [dropdown, setDropDown] = useState("soup");
  return (
    <div className="challengeCondition">
      <Header as="h3" inverted color="orange" className="challengeContent">
        챌린지 조건
      </Header>
      <div className="challengeKind">
        <Header as="h4" inverted color="orange">
          챌린지의 종류
        </Header>
        <input
          type="radio"
          id="1"
          name="challenge"
          value="diet"
          checked={checkedInputs === "diet"}
          onChange={(e) => {
            setCheckInputs(e.target.value);
          }}
        />
        <label> diet</label>
        <input
          type="radio"
          id="2"
          name="challenge"
          value="receipe"
          checked={checkedInputs === "receipe"}
          onChange={(e) => {
            setCheckInputs(e.target.value);
          }}
        />
        <label>receipe</label>
        {checkedInputs === "diet" ? (
          <>
            <Header as="h4" inverted color="orange">
              다이어트 종류
            </Header>
            <div className="dietKind">
              <input
                type="radio"
                id="3"
                name="DietKind"
                value="plusKcal"
                checked={checkedInputs2 === "plusKcal"}
                onChange={(e) => {
                  setCheckInputs2(e.target.value);
                }}
              />
              <label>살 찌우는 다이어트</label>
              <input
                type="radio"
                id="4"
                name="DietKind"
                value="minusKcal"
                checked={checkedInputs2 === "minusKcal"}
                onChange={(e) => {
                  setCheckInputs2(e.target.value);
                }}
              />
              <label>살 빼는 다이어트</label>
            </div>
          </>
        ) : (
          <>
            <Header as="h4" inverted color="orange">
              레시피 종류
            </Header>
            <div className="receipeKind">
              <select
                value={dropdown}
                onChange={(e) => {
                  setDropDown(e.target.value);
                }}
              >
                <option value="soup">Soup</option>
                <option value="noodle">Noodle</option>
                <option value="dessert">Dessert</option>
                <option value="rice">Rice</option>
                <option value="kimchi">Kimchi</option>
                <option value="grill">Grill</option>
                <option value="etc">Etc</option>
              </select>
            </div>
          </>
        )}
      </div>
      {checkedInputs === "diet" ? (
        <>
          <Header as="h4" inverted color="orange">
            다이어트 조건 ( 기준 : 하루)
          </Header>
          <div className="dietCondition2">
            <input
              type="radio"
              id="5"
              name="DietCondition"
              value="proteinShake"
              checked={checkedInputs3 === "proteinShake"}
              onChange={(e) => {
                setCheckInputs3(e.target.value);
              }}
            />
            <label>단백질쉐이크 챙겨먹기</label>
            <input
              type="radio"
              id="6"
              name="DietCondition"
              value="everymeal"
              checked={checkedInputs3 === "everymeal"}
              onChange={(e) => {
                setCheckInputs3(e.target.value);
              }}
            />
            <label>아침,점심,저녁 다 챙겨먹기</label>
          </div>
        </>
      ) : (
        <>
          <Header as="h4" inverted color="orange">
            레시피 업로드 횟수
          </Header>
          <div className="receipeUploadCount">
            <input
              type="radio"
              id="7"
              name="receipeCount"
              value="3times"
              checked={checkedInputs4 === "3times"}
              onChange={(e) => {
                setCheckInputs4(e.target.value);
              }}
            />
            <label>3회</label>
            <input
              type="radio"
              id="8"
              name="receipeCount"
              value="5times"
              checked={checkedInputs4 === "5times"}
              onChange={(e) => {
                setCheckInputs4(e.target.value);
              }}
            />
            <label>3회</label>
            <input
              type="radio"
              id="9"
              name="receipeCount"
              value="7times"
              checked={checkedInputs4 === "7times"}
              onChange={(e) => {
                setCheckInputs4(e.target.value);
              }}
            />
            <label>3회</label>
            <input
              type="radio"
              id="10"
              name="receipeCount"
              value="9times"
              checked={checkedInputs4 === "9times"}
              onChange={(e) => {
                setCheckInputs4(e.target.value);
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
