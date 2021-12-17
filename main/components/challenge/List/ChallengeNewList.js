import { React } from "react";

import ListStyle from "../../../styles/challenge/List.module.css";
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../../styles/challenge/Input.module.css";
import { Image } from "semantic-ui-react";

const ChallengeNewList = () => {
  return (
    <div>
      <div>
        <h2 className={ChallengeStyle.h2C}>신규 챌린지</h2>
      </div>
      <div className={ChallengeStyle.container}>{ChallengeStyle.map(cha)}</div>
    </div>
  );
};

export default ChallengeNewList;
