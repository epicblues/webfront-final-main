import React, { useState } from "react";
import Link from "next/dist/client/link";
import axios from "axios";
//css
import ChallengeStyles from "../../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../../styles/challenge/Input.module.css";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";

const Search = ({ setSearch }) => {
  const [filteredChallenge, setFilteredChallenge] = useState([]);
  const [searchString, setSearchString] = useState("");
  const router = useRouter();
  const handleClick = async () => {
    const {
      data: { challenges },
    } = await axios.get("/api/challenge/search?title=" + searchString);
    setFilteredChallenge(challenges);
    console.log(challenges);
  };
  return (
    <div>
      <div className={ChallengeStyles.header2}>
        <Icon
          name="angle double left"
          size="large"
          className={ImageStyle.back}
          onClick={() => setSearch(false)}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            value={searchString}
            onChange={(e) => {
              setSearchString(e.currentTarget.value);
            }}
          />
          <Icon name="search" size="large" onClick={handleClick}></Icon>
        </form>
        {/* <div className={ChallengeStyles.header2}>
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
                        key={filteredChallenge.id}
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
                        {filteredChallenge.participants.length}명
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
                            filteredChallenge.image
                          }
                          layout="fill"
                          objectFit="cover"
                          objectPosition="top"
                        />
                      </div>
                    </div>
                    <ul className={ListStyle.ul}>
                      <li className={ListStyle.li}>
                        <li className={ChallengeStyles.h2C} key={challenge.id}>
                          챌린지 명:{filteredChallenge.title}
                        </li>

                        <li className={ChallengeStyles.li} key={challenge.id}>
                          시작일:
                          {new Date(filteredChallenge.startDate).getMonth() +
                            1 +
                            "월" +
                            new Date(filteredChallenge.startDate).getDate() +
                            "일"}
                        </li>
                        <li className={ChallengeStyles.li} key={challenge.id}>
                          종료일:
                          {new Date(filteredChallenge.endDate).getMonth() +
                            1 +
                            "월" +
                            new Date(filteredChallenge.endDate).getDate() +
                            "일"}
                        </li>
                        <li className={ChallengeStyles.li} key={challenge.id}>
                          남은 일수:
                          {Math.ceil(
                            (new Date(filteredChallenge.endDate).getTime() -
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
        </div> */}
      </div>
    </div>
  );
};

export default Search;
