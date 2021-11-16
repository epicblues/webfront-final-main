import React from "react";

const ChallengeListTable = ({ challenge }) => {
  return (
    <>
      (
      <>
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
          <thead>
            <tr>
              <th>챌린지명</th>
              <th>작성자</th>
              <th>시작일</th>
              <th>종료일</th>
              <th>참가자수</th>
            </tr>
          </thead>
          <tbody>
            <td>{challenge.title}</td>
            <td>{challenge.author[0].name}</td>
            <td>{new Date(challenge.startDate).toLocaleDateString()}</td>
            <td> {new Date(challenge.endDate).toLocaleDateString()}</td>
            <td>{challenge.participants.length}</td>
          </tbody>
        </table>

        <hr />
      </>
      )
    </>
  );
};

export default ChallengeListTable;
