import React from "react";
import Link from "next/link";

const DetailList = ({ challenges, user }) => {
  return (
    <div className="DetailList">
      {challenges.map((challenge) => {
        return (
          <>
            <div
              className="challengeList"
              style={{
                fontFamily: "fantasy",
                fontSize: "15px",
                fontWeight: "bold",
              }}
              key={challenge.id}
            >
              <table
                className="challenge"
                style={{
                  width: "800px",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
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
              </table>
              <hr />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default DetailList;
