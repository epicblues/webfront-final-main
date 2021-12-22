import React, { useState, useRef } from "react";
import Link from "next/dist/client/link";
import axios from "axios";
//css
import ButtonStyle from "../../../styles/challenge/Button.module.css";
import ChallengeStyles from "../../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../../styles/challenge/Input.module.css";
import { Icon, Modal, ModalActions, Button } from "semantic-ui-react";
import { useRouter } from "next/router";

const ChallengeSearch = () => {
  const [filteredChallenge, setFilteredChallenge] = useState([]);
  const [searchString, setSearchString] = useState("");
  const titleError = useRef();
  const title = useRef();
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
    if (validateTitle()) return;
    const {
      data: { challenges },
    } = await axios.get("/api/challenge/search?title=" + searchString);
    setFilteredChallenge(challenges);

    router.push("/challenge/search");
    console.log(challenges);
  };
  return (
    <div>
      <Modal
        style={{ borderRadius: "0.7rem", height: "12vh" }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className={ImageStyle.actions}
        trigger={
          <Icon name="search" size="large" className={ImageStyle.search} />
        }
        content={
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className={ImageStyle.textC}>
              <input
                className={ImageStyle.modalText}
                type="text"
                placeholder="챌린지를 검색해주세요"
                value={searchString}
                ref={title}
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
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                className={ButtonStyle.modalBtn}
                onClick={() => {
                  setOpen(false);
                }}
              >
                닫기
              </button>
            </div>
          </form>
        }
      />
    </div>
  );
};

export default ChallengeSearch;
