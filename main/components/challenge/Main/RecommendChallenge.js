import React from "react";
import Link from "next/dist/client/link";
//css
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../../styles/challenge/Input.module.css";
import ListStyle from "../../../styles/challenge/List.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Image } from "semantic-ui-react";
import challenge from "../../../pages/api/user/like/challenge";
const RecommendChallenge = ({ challenges }) => {
  const [randomChallenge, setRandomChallenge] = useState([
    ...challenges,
    challenges.sort(
      () => Math.floor(Math.random() * (challenges.length - 1 + 1)) + 1
    ),
  ]);

  return (
    <div className={ChallengeStyle.container2}>
      {randomChallenge.map((challenge) => (
        <>
          <div
            className="image-wrap"
            style={{
              position: "relative",
              borderRadius: "0.3rem",
            }}
          >
            <div
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
              <FontAwesomeIcon icon={faUser} className={ImageStyle.image2} />
              {challenge.participants.length}명
            </div>
            <div>
              <Link passHref href={"/challenge/list/" + challenge._id}>
                <Image
                  style={{
                    zIndex: "0",
                    borderRadius: "5%",
                    height: "80px",
                    width: "250px",
                  }}
                  src={
                    process.env.NEXT_PUBLIC_STATIC_SERVER_URL + challenge.image
                  }
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                />
              </Link>
            </div>
          </div>
          <ul className={ListStyle.ul}>
            <li className={ListStyle.li}>
              <li className={ChallengeStyle.h2L} key={challenge._id}>
                챌린지 명:{challenge.title}
              </li>
              <li className={ChallengeStyle.li}>
                {new Date(challenge.endDate).getTime() - new Date().getTime ===
                0 ? (
                  <>
                    <div className={ChallengeStyle.title}>오늘부터 시작</div>
                  </>
                ) : (
                  <>
                    {Math.ceil(
                      (new Date(challenge.endDate).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                    일 뒤 시작
                  </>
                )}
              </li>
            </li>
          </ul>
        </>
      ))}
    </div>
  );
};

export default RecommendChallenge;
