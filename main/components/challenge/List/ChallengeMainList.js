import React from "react";
import Link from "next/link";
import axios from "axios";
import { Image } from "semantic-ui-react";
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css";
import ListStyle from "../../../styles/challenge/List.module.css";
const ChallengeMainList = ({ challenges, user }) => {
  return (
    <div className={ChallengeStyle.container}>
      {challenges.map((challenge) => {
        return (
          <>
            <div className={ChallengeStyle.list}>
              <div className="image">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STATIC_SERVER_URL + challenge.image
                  }
                  layout="fill"
                  objectPosition="top"
                  size="small"
                />
              </div>
              <ul className={ListStyle.ul}>
                <li className={ListStyle.li}>
                  <Link passHref href={"/challenge/list/" + challenge._id}>
                    <a>
                      {" "}
                      <li key={challenge.id}>{challenge.title}</li>
                    </a>
                  </Link>
                  <li key={challenge.id}>작성자:{challenge.author[0].name}</li>
                  <li key={challenge.id}>
                    참가자 수:{challenge.participants.length}명
                  </li>
                  <li key={challenge.id}>
                    챌린지 기한:
                    {new Date(challenge.startDate).toLocaleDateString()}~{" "}
                    {new Date(challenge.endDate).toLocaleDateString()}
                  </li>
                  {challenge.type === "diet" ? (
                    <li key={challenge.id}>챌린지 종류: 다이어트</li>
                  ) : (
                    <li key={challenge.id}>챌린지 종류: 레시피</li>
                  )}
                </li>
              </ul>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ChallengeMainList;
