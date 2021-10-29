import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Header } from "semantic-ui-react";

const ChallengeCondition = () => {
  const [checkedInputs, setCheckInputs] = useState([]);

  const handleChange = (checked, value, e) => {
    console.log(checked);
    if (checked) {
      setCheckInputs([...checkedInputs, value]);
      console.log(checkedInputs);
    } else {
      setCheckInputs(checkedInputs.filter((el) => el !== value));
      console.log(checkedInputs);
    }
  };

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
          checked={checkedInputs.includes("diet") ? true : false}
          onChange={(e) => {
            handleChange(e.currentTarget.checked, "diet");
          }}
        />
        <label> diet</label>
        <input
          type="radio"
          id="2"
          name="challenge"
          value="receipe"
          checked={checkedInputs.includes("receipe") ? true : false}
          onChange={(e) => {
            handleChange(e.currentTarget.checked, "receipe");
          }}
        />
        <label>receipe</label>
        {checkedInputs[0] ? <div>다이어트 종류</div> : <div>레시피 종류</div>}
      </div>
    </div>
  );
};

export default ChallengeCondition;
