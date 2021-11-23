import React, { useState } from "react";
import { Button, Progress } from "semantic-ui-react";
import Link from "next/dist/client/link";
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
    <>
      <div className="container">
        <Progress
          percent={percent}
          autoSuccess
          inverted
          color="blue"
          size="medium"
          style={{ margin: "0px" }}
        />
        <Button style={{ margin: "0px" }} onClick={challengeToggle}>
          챌린지 달성율
        </Button>
      </div>
      <div>
        {challenges.map((challenge) => {
          return (
            <>
              {challenge.author[0]._id === user.id ? (
                <ul
                  style={{
                    listStyle: "none",
                    border: "solid 2px lightgray",
                    borderRadius: "5px",
                  }}
                >
                  <li>작성자:{challenge.author[0].name}</li>
                  <li>참가인원:{challenge.participants.length}명</li>
                  <Link passHref href={"/challenge/list/" + challenge._id}>
                    <a>
                      {" "}
                      <li>챌린지명:{challenge.title}</li>
                    </a>
                  </Link>
                  <li>
                    챌린지 기한:
                    {new Date(challenge.startDate).toLocaleDateString()}~
                    {new Date(challenge.endDate).toLocaleDateString()}
                  </li>
                  <li>
                    남은 일수:
                    {Math.ceil(
                      (new Date(challenge.endDate).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                    일
                  </li>
                </ul>
              ) : null}
            </>
          );
        })}
      </div>
    </>
  );
};

export default MyChallenge;
