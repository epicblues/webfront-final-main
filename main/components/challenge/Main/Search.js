import React, { useState, useRef } from "react";
import Link from "next/dist/client/link";
import axios from "axios";
//css
import ButtonStyle from "../../../styles/challenge/Button.module.css";
import ChallengeStyles from "../../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../../styles/challenge/Input.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Icon, Modal, Image } from "semantic-ui-react";
import { useRouter } from "next/router";

const Search = () => {
  const [searchString, setSearchString] = useState("");
  const titleError = useRef();
  const title = useRef();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [searchedChallenges, setSearchedChallenges] = useState([]);
  const [challengeLists, setChallengeLists] = useState(searchedChallenges);
  const [challengeCounter, setChallengeCounter] = useState(
    challengeLists.length
  );
  //유효성 검사
  const validateTitle = () => {
    const titleRegex = /^([가-힣\w\d]+[\.\,]?\s?)+$/;

    if (!titleRegex.test(title.current.value)) {
      titleError.current.textContent = "챌린지 명을 정확히 적어주세요";
      titleError.current.style.color = "red";
      return false;
    } else {
      titleError.current.textContent = "";
      return true;
    }
  };

  const handleClick = async () => {
    const {
      data: { challenges },
    } = await axios.get("/api/challenge/search?title=" + searchString);
    console.log(challenges);
    setSearchedChallenges(challenges);
    title.current.value = "";
  };

  const handleReset = () => {
    setOpen(false), setSearchedChallenges([]);
  };

  return (
    <div>
      <Modal
        style={{ borderRadius: "0.7rem", minHeight: "90vh", height: "auto" }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className={ImageStyle.actions}
        trigger={
          <Icon name="search" size="large" className={ImageStyle.search} />
        }
        content={
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="container" style={{ margin: "10px 10px" }}>
                <div className={ImageStyle.textC}>
                  <input
                    className={ImageStyle.modalText}
                    type="text"
                    placeholder="챌린지를 검색해주세요"
                    value={searchString}
                    ref={title}
                    name="search"
                    onChange={(e) => {
                      setSearchString(e.currentTarget.value);
                    }}
                  />
                  <p ref={titleError}></p>
                  <Icon
                    name="search"
                    size="big"
                    className={ImageStyle.search2}
                    onClick={handleClick}
                  />
                  <Icon
                    name="angle double left"
                    size="big"
                    className={ImageStyle.modalBack}
                    onClick={handleReset}
                  />
                </div>
              </div>
              <div style={{ marginTop: "10px" }}>
                {searchedChallenges.length === 0 ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <h2>추천 챌린지</h2>
                    {searchedChallenges.map((challenge) => {
                      return (
                        <>
                          <div></div>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <InfiniteScroll
                      dataLength={challengeLists.length}
                      next={handleClick}
                      hasMore={hasMore}
                      loader={
                        <div className={ImageStyle.loader}>
                          <h3 className={ImageStyle.loaderText}>로딩중...</h3>
                          <Icon
                            size="big"
                            name="hourglass half"
                            className={ImageStyle.loaderImage}
                          />
                        </div>
                      }
                      endMessage={
                        <div className={ImageStyle.loader}>
                          <h3>모든 리스트를 다 불러왔습니다.</h3>
                        </div>
                      }
                    >
                      <div className={ChallengeStyles.modalContainer}>
                        {searchedChallenges.map((challenge) => (
                          <>
                            <div
                              style={{
                                margin: "1rem 1rem",
                              }}
                            >
                              <Link
                                passHref
                                href={"/challenge/list/" + challenge._id}
                              >
                                <div>
                                  <Image
                                    style={{
                                      zIndex: "0",
                                      borderRadius: "5%",
                                      height: "10vh",
                                      width: "80vw",
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                    src={
                                      process.env
                                        .NEXT_PUBLIC_STATIC_SERVER_URL +
                                      challenge.image
                                    }
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="top"
                                  />
                                </div>
                              </Link>
                              <Link
                                passHref
                                href={"/challenge/list/" + challenge._id}
                              >
                                <div
                                  key={challenge._id}
                                  style={{
                                    backgroundColor: "gray",
                                    width: "50px",
                                    textAlign: "right",
                                    zIndex: "1",
                                    color: "white",
                                    position: "relative",
                                    left: "25.5vw",
                                    bottom: "10vh",
                                  }}
                                >
                                  <Icon
                                    name="user"
                                    size="large"
                                    color="black"
                                    className={ImageStyle.modalImage}
                                  />
                                  {challenge.participants.length}명
                                </div>
                              </Link>
                              <Link
                                passHref
                                href={"/challenge/list/" + challenge._id}
                              >
                                <div key={challenge._id}>{challenge.title}</div>
                              </Link>
                              <Link
                                passHref
                                href={"/challenge/list/" + challenge._id}
                              >
                                <div key={challenge._id}>
                                  시작일:
                                  {new Date(challenge.startDate).getMonth() +
                                    1 +
                                    "월" +
                                    new Date(challenge.startDate).getDate() +
                                    "일"}
                                </div>
                              </Link>
                              <Link
                                passHref
                                href={"/challenge/list/" + challenge._id}
                              >
                                <div key={challenge._id}>
                                  종료일"
                                  {new Date(challenge.endDate).getMonth() +
                                    1 +
                                    "월" +
                                    new Date(challenge.endDate).getDate() +
                                    "일"}
                                </div>
                              </Link>
                              <Link
                                passHref
                                href={"/challenge/list/" + challenge._id}
                              >
                                <div key={challenge._id}>
                                  남은 일수:
                                  {Math.ceil(
                                    (new Date(challenge.endDate).getTime() -
                                      new Date().getTime()) /
                                      (1000 * 60 * 60 * 24)
                                  )}
                                  일
                                </div>
                              </Link>
                            </div>
                          </>
                        ))}
                      </div>
                    </InfiniteScroll>
                  </>
                )}
              </div>
            </form>
          </>
        }
      />
    </div>
  );
};

export default Search;
