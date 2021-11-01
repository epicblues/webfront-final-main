import { ServerDescriptionChangedEvent } from "mongodb";
import { React, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Input, Button, Header } from "semantic-ui-react";

const ChallengeCondition = () => {
  const [checkedInputs, setCheckInputs] = useState(false);
  const [checkedInputs2, setCheckInputs2] = useState(false);
  const [checkedInputs3, setCheckInputs3] = useState(false);
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
                id="7"
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
                id="8"
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
              <input
                type="radio"
                id="3"
                name="ReceipeKind"
                value="korean"
                checked={checkedInputs3 === "한식"}
                onChange={(e) => {
                  setCheckInputs3(e.target.value);
                }}
              />
              <label>한식</label>

              <input
                type="radio"
                id="4"
                name="ReceipeKind"
                value="western"
                checked={checkedInputs3 === "양식"}
                onChange={(e) => {
                  setCheckInputs3(e.target.value);
                }}
              />
              <label>양식</label>

              <input
                type="radio"
                id="5"
                name="ReceipeKind"
                value="chinese"
                checked={checkedInputs3 === "중식"}
                onChange={(e) => {
                  setCheckInputs3(e.target.value);
                }}
              />
              <label>중식</label>
              <input
                type="radio"
                id="6"
                name="ReceipeKind"
                value="japanese"
                checked={checkedInputs3 === "일식"}
                onChange={(e) => {
                  setCheckInputs3(e.target.value);
                }}
              />
              <label>일식</label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChallengeCondition;
