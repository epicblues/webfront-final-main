import React, { useState } from "react";
import Link from "next/dist/client/link";
import axios from "axios";
//component
import DateContent from "./DateContent";
import ProgressBar from "./ProgressBar";
//css
import "semantic-ui-css/semantic.min.css";
import { Image, Modal, Icon } from "semantic-ui-react";
import { FaUser, FaAngleDoubleLeft } from "react-icons/fa";
import MainStyle from "../../../styles/challenge/Main.module.css";

const MainModal = ({ challenges, title, head }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        style={{
          borderRadius: "0.7rem",
          minHeight: "50vh",
          height: "auto",
        }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon={
          <Icon
            className={MainStyle.backIcon}
            name="angle double left"
            size="big"
          />
        }
        trigger={<label className={MainStyle.trigger}>{title}</label>}
        content={
          <>
            <div>
              <div className={MainStyle.listHead}>
                <div className={MainStyle.listAllHead}>{head}</div>
              </div>
              {challenges.map((challenge) => {
                return (
                  <div key={challenge._id}>
                    <>
                      <div className={MainStyle.container}>
                        <>
                          <div className={MainStyle.imageWrap}>
                            <div className={MainStyle.imagePart}>
                              <FaUser size="16" />
                              {challenge.participants.length}명
                            </div>
                            <Link
                              passHref
                              href={"/challenge/list/" + challenge._id}
                            >
                              <>
                                <div className={MainStyle.ImageSpace}>
                                  <Image
                                    className={MainStyle.image}
                                    src={
                                      process.env
                                        .NEXT_PUBLIC_STATIC_SERVER_URL +
                                      challenge.image
                                    }
                                    layout="fill"
                                  />
                                </div>
                              </>
                            </Link>
                          </div>
                          <DateContent challenges={challenge} />
                        </>

                        <div
                          style={{
                            position: "relative",
                            left: "58%",
                            top: "10px",
                          }}
                        >
                          <button
                            className={MainStyle.button}
                            onClick={async (event) => {
                              const {
                                data: { result, message },
                              } = await axios.post(
                                "/api/challenge/validate",
                                challenge
                              );

                              const button = event.target;
                              button.disabled = true;
                              if (message === "failed") {
                                //실패했다
                                button.textContent = "진행중!";
                                button.style.color = "white";
                                setInterval(
                                  (button) => {
                                    button.style.display = "none";
                                  },
                                  100,
                                  button
                                );
                                const progressBar = button.nextElementSibling;
                                if (progressBar instanceof HTMLElement) {
                                  progressBar.style.display = "block";
                                  const realProgressBar =
                                    progressBar.firstElementChild
                                      .firstElementChild;

                                  if (challenge.type === "diet") {
                                    realProgressBar.value = result;
                                    realProgressBar.max =
                                      challenge.diet.condition;
                                    const span =
                                      realProgressBar.nextElementSibling;
                                    span.innerText =
                                      Math.round(
                                        (result / challenge.diet.condition) *
                                          100
                                      ) + "%";
                                  } else {
                                    realProgressBar.value = result;
                                    realProgressBar.max =
                                      challenge.recipe.uploadCount;
                                    const span =
                                      realProgressBar.nextElementSibling;
                                    span.innerText =
                                      Math.round(
                                        (result /
                                          challenge.recipe.uploadCount) *
                                          100
                                      ) + "%";
                                  }
                                }
                              } else {
                                //성공했다.
                                button.textContent = "성공!";
                                button.style.backgroundColor = "blue";

                                setInterval(
                                  (button) => {
                                    button.style.display = "none";
                                  },
                                  1000,
                                  button
                                );
                                const span = button.nextElementSibling;
                                span.textContent = "챌린지 달성";
                                span.style.backgroundColor = "blue";
                              }
                            }}
                          >
                            결과 확인
                          </button>
                          <div
                            style={{
                              display: "none",
                            }}
                          >
                            <ProgressBar />
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                );
              })}
            </div>
          </>
        }
      />
    </div>
  );
};

export default MainModal;
