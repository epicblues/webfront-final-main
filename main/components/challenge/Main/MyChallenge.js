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
      {challenges.map((challenge) => {
        return (
          <table
            className="challenge"
            style={{
              width: "800px",
              textAlign: "center",
              margin: "auto",
              fontFamily: "fantasy",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            {challenge.author[0]._id === user.id ? (
              <>
                <thead>
                  <tr>
                    <th>작성자</th>
                    <th>참가자수</th>
                    <th>챌린지명</th>
                    <th>시작일</th>
                    <th>종료일</th>
                  </tr>
                </thead>

                <tbody>
                  <td>{challenge.author[0].name}</td>
                  <td>{challenge.participants.length}</td>
                  <Link passHref href={"/challenge/list/" + challenge._id}>
                    <a>
                      {" "}
                      <td>{challenge.title}</td>
                    </a>
                  </Link>
                  <td>{new Date(challenge.startDate).toLocaleDateString()}</td>
                  <td> {new Date(challenge.endDate).toLocaleDateString()}</td>
                </tbody>
              </>
            ) : null}
          </table>
        );
      })}
    </>
  );
};

export default MyChallenge;
