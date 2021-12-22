import React from "react";
import Link from "next/link";
import axios from "axios";
//css
import { Image } from "semantic-ui-react";
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css";
import ListStyle from "../../../styles/challenge/List.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ImageStyle from "../../../styles/challenge/Input.module.css";

const ChallengeMainList = ({ challenges }) => {
  return (
    <div className={ChallengeStyle.container}>
      {challenges.map((challenge) => {
        return (
          <div key={challenge._id}>
            <>
              <Link passHref href={"/challenge/list/" + challenge._id}>
                <>
                  <div className={ChallengeStyle.list}>
                    <div
                      className="image-wrap"
                      style={{
                        position: "relative",
                        borderRadius: "0.3rem",
                      }}
                    >
                      <div
                        key={challenge.id}
                        style={{
                          backgroundColor: "gray",
                          width: "50px",
                          right: "0",
                          position: "absolute",
                          textAlign: "right",
                          zIndex: "1",
                          color: "white",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          className={ImageStyle.image2}
                        />
                        {challenge.participants.length}명
                      </div>
                      <Image
                        style={{
                          zIndex: "0",
                          borderRadius: "5%",
                          height: "80px",
                          width: "45vw",
                        }}
                        src={
                          process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                          challenge.image
                        }
                        layout="fill"
                      />
                    </div>
                    <ul className={ListStyle.ul}>
                      <li className={ChallengeStyle.content} key={challenge.id}>
                        {challenge.title}
                      </li>

                      <li style={{ margin: "0 11px" }} key={challenge.id}>
                        시작일:
                        {new Date(challenge.startDate).getFullYear() +
                          "년" +
                          (new Date(challenge.startDate).getMonth() + 1) +
                          "월" +
                          new Date(challenge.startDate).getDate() +
                          "일"}
                        <br />
                        종료일:
                        {new Date(challenge.endDate).getFullYear() +
                          "년" +
                          (new Date(challenge.endDate).getMonth() + 1) +
                          "월" +
                          new Date(challenge.endDate).getDate() +
                          "일"}
                      </li>
                      {challenge.type === "diet" ? (
                        <li key={challenge.id}>챌린지 종류: 다이어트</li>
                      ) : (
                        <li key={challenge.id}>챌린지 종류: 레시피</li>
                      )}
                    </ul>
                  </div>
                </>
              </Link>
            </>
          </div>
        );
      })}
    </div>
  );
};

export default ChallengeMainList;
