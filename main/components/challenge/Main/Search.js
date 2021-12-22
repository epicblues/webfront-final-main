import React, { useState, useRef, useEffect } from "react";
import Link from "next/dist/client/link";
import axios from "axios";
//component
import RecommendChallenge from "../Main/RecommendChallenge";
//css

import ModalStyle from "../../../styles/challenge/Modal.module.css";
import { Icon, Modal, Image } from "semantic-ui-react";
import { useRouter } from "next/router";

const Search = () => {
  const [searchString, setSearchString] = useState("");
  const titleError = useRef();
  const title = useRef();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [challenges, setChallenges] = useState([]);
  const [searchedChallenges, setSearchedChallenges] = useState([]);

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

  useEffect(() => {
    (async function () {
      const {
        data: { challenges: fetchedChallenges },
      } = await axios.get("/api/challenge/search");
      setChallenges(fetchedChallenges);
    })();
  }, []);

  const handleClick = async () => {
    const searchString = title.current.value;
    const filteredChallenges = challenges.filter((challenge) =>
      new RegExp(`${searchString}`).test(challenge.title)
    );
    setSearchedChallenges(filteredChallenges);
    title.current.value = "";
  };

  const handleReset = () => {
    setOpen(false), setSearchedChallenges([]);
  };

  return (
    <div>
      <Modal
        style={{
          borderRadius: "0.7rem",
          minHeight: "70vh",
          height: "auto",
        }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className={ModalStyle.actions}
        trigger={
          <Icon name="search" size="large" className={ModalStyle.search} />
        }
        content={
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="container" style={{ margin: "10px 10px" }}>
                <div className={ModalStyle.textC}>
                  <input
                    className={ModalStyle.modalText}
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
                    className={ModalStyle.search2}
                    onClick={handleClick}
                  />
                  <Icon
                    name="angle double left"
                    size="big"
                    className={ModalStyle.modalBack}
                    onClick={handleReset}
                  />
                </div>
              </div>
              <div style={{ marginTop: "10px" }}>
                {searchedChallenges.length === 0 && searchString === "" ? (
                  <>
                    <div className={ModalStyle.modalFont}>검색해 주세요</div>
                  </>
                ) : (
                  <>
                    {!(searchedChallenges.length === 0) ? (
                      <div className={ModalStyle.modalContainer}>
                        {searchedChallenges.map((challenge) => (
                          <>
                            <div
                              style={{
                                margin: "1rem 1rem",
                              }}
                              key={challenge._id}
                              onScroll="scroll"
                            >
                              <Link
                                passHref
                                href={"/challenge/list/" + challenge._id}
                              >
                                <div>
                                  <Image
                                    className={ModalStyle.modalImageDiv}
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
                                  className={ModalStyle.participant}
                                >
                                  <Icon
                                    name="user"
                                    size="large"
                                    color="black"
                                    className={ModalStyle.modalImage}
                                  />
                                  {challenge.participants.length}명
                                </div>
                              </Link>
                              <Link
                                passHref
                                href={"/challenge/list/" + challenge._id}
                              >
                                <div
                                  className={ModalStyle.title}
                                  key={challenge._id}
                                >
                                  {challenge.title}
                                </div>
                              </Link>
                              <Link
                                passHref
                                href={"/challenge/list/" + challenge._id}
                              >
                                <div
                                  key={challenge._id}
                                  className={ModalStyle.content}
                                >
                                  시작일 :
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
                                <div
                                  key={challenge._id}
                                  className={ModalStyle.content}
                                >
                                  종료일:
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
                                <div
                                  key={challenge._id}
                                  className={ModalStyle.content}
                                >
                                  {Math.ceil(
                                    (new Date(challenge.endDate).getTime() -
                                      new Date().getTime()) /
                                      (1000 * 60 * 60 * 24)
                                  )}
                                  일 뒤 시작
                                </div>
                              </Link>
                            </div>
                          </>
                        ))}
                      </div>
                    ) : (
                      <>
                        <h2 style={{ textAlign: "center" }}>추천 챌린지</h2>
                        <div className={ModalStyle.modalFont}>
                          검색 결과가 없습니다.
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <RecommendChallenge challenges={challenges} />
                        </div>
                      </>
                    )}
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
