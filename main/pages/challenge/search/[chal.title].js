import React from "react";
import Search from "../../../components/challenge/Main/Search";
const SearchList = ({ filteredChallenge }) => {
  return (
    <>
      {filteredChallenge.map((challenge) => {
        return (
          <>
            <Link passHref href={"/challenge/list/" + challenge._id}>
              <div style={{ marginTop: "30px" }}>
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
                  <div>
                    <Image
                      style={{
                        zIndex: "0",
                        borderRadius: "5%",
                        height: "80px",
                        width: "250px",
                      }}
                      src={
                        process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                        challenge.image
                      }
                      layout="fill"
                      objectFit="cover"
                      objectPosition="top"
                    />
                  </div>
                </div>
                <ul className={ListStyle.ul}>
                  <li className={ListStyle.li}>
                    <li className={ChallengeStyle.h2L} key={challenge.id}>
                      챌린지 명:{challenge.title}
                    </li>

                    <li className={ChallengeStyle.li} key={challenge.id}>
                      시작일:
                      {new Date(challenge.startDate).getMonth() +
                        1 +
                        "월" +
                        new Date(challenge.startDate).getDate() +
                        "일"}
                    </li>
                    <li className={ChallengeStyle.li} key={challenge.id}>
                      종료일:
                      {new Date(challenge.endDate).getMonth() +
                        1 +
                        "월" +
                        new Date(challenge.endDate).getDate() +
                        "일"}
                    </li>
                    <li className={ChallengeStyle.li} key={challenge.id}>
                      남은 일수:
                      {Math.ceil(
                        (new Date(challenge.endDate).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}
                      일
                    </li>
                  </li>
                </ul>
              </div>
            </Link>
          </>
        );
      })}
    </>
  );
};

export default SearchList;
