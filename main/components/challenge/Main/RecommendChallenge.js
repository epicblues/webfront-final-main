import React, { useEffect, useState } from "react";
import Link from "next/dist/client/link";
//css
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../../styles/challenge/Input.module.css";
import ListStyle from "../../../styles/challenge/List.module.css";
import ModalStyle from "../../../styles/challenge/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Image } from "semantic-ui-react";
import { Swiper, SwiperSlide, user } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Navigation } from "swiper/core";

const RecommendChallenge = ({ challenges }) => {
  const [recChallenges, setRecChallenges] = useState([]);
  useEffect(() => {
    if (challenges.length <= 5) return setRecChallenges(challenges);

    const copiedChallenges = [...challenges];
    const selectedChallenges = [];

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * copiedChallenges.length);
      selectedChallenges.push(...copiedChallenges.splice(randomIndex, 1));
    }
    setRecChallenges(selectedChallenges);
  }, []);

  return (
    <Swiper
      spaceBetween={10}
      className="swiper-container"
      slidesPerView={2}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {recChallenges.map((challenge) => (
        <>
          <SwiperSlide>
            <div className={ModalStyle.recContainer}>
              <div key={challenge._id}>
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
                      width: "54px",
                      height: "20px",
                      top: "5%",
                      right: "2%",
                      position: "absolute",
                      textAlign: "right",
                      zIndex: "1",
                      color: "white",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className={ModalStyle.recImage}
                    />
                    {challenge.participants.length}명
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <Link passHref href={"/challenge/list/" + challenge._id}>
                      <Image
                        style={{
                          zIndex: "0",
                          borderRadius: "5%",
                          width: "45vw",
                        }}
                        src={
                          process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                          challenge.image
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
                    <li className={ModalStyle.recTitle}>{challenge.title}</li>
                    <li className={ChallengeStyle.li}>
                      {new Date(challenge.endDate).getTime() -
                        new Date().getTime ===
                      0 ? (
                        <>
                          <div className={ModalStyle.recTime}>
                            오늘부터 시작
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={ModalStyle.recTime}>
                            {Math.ceil(
                              (new Date(challenge.endDate).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}
                            일 뒤 시작
                          </div>
                        </>
                      )}
                    </li>
                  </li>
                </ul>
              </div>
            </div>
          </SwiperSlide>
        </>
      ))}
    </Swiper>
  );
};

export default RecommendChallenge;
