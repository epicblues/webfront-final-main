import React from "react";

//css
import ImageStyle from "../../../styles/challenge/Input.module.css";
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css";
import { Icon } from "semantic-ui-react";

const Header = () => {
  return (
    <div>
      <div className={ChallengeStyle.header2}>
        <Icon
          name="angle double left"
          size="large"
          className={ImageStyle.back}
          onClick={() => router.back()}
        />
        <h2 className={ChallengeStyle.h2L}>참여중인 챌린지</h2>
      </div>
    </div>
  );
};

export default Header;
