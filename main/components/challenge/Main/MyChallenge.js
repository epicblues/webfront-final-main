import React, { useState } from "react";
import { Button, Progress } from "semantic-ui-react";

const MyChallenge = ({ challenges, user }) => {
  const [percent, setPercent] = useState(55);

  const challengeProgress = () => {
    if ((diet = success)) {
      checkdiet;
    } else {
      diet = false;
    }
  };
  const challengeToggle = (challenge) => {
    setPercent(() => ({
      percent: challenge.percent === 0 ? 100 : 0,
    }));
  };

  return (
    <div>
      <div>
        <Progress
          percent={percent}
          autoSuccess
          inverted
          color="blue"
          size="medium"
        />
        <Button onClick={challengeToggle}>챌린지 달성율</Button>
      </div>
      <div
        style={{
          margin: 0,
          backgroundColor: "#EAEAEA",
          width: "100%",
          textAlign: "center",
        }}
      >
        <ul style={{ listStyle: "none" }}>
          <li>나의 챌린지1</li>
          <li>나의 챌린지2</li>
          <li>나의 챌린지3</li>
        </ul>
      </div>
    </div>
  );
};

export default MyChallenge;
