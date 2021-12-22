import React from "react";
import Link from "next/dist/client/link";
import { Route } from "next/dist/server/router";
import NavStyles from "../../../styles/challenge/Input.module.css";
const Navbar = ({ currentURL }) => {
  return (
    <div className={NavStyles.navDiv}>
      <Link href="/challenge">
        <a>
          <div className={NavStyles.nav}>
            <p
              className={currentURL === "/challenge" ? NavStyles.activated : ""}
            >
              메인
            </p>
          </div>
        </a>
      </Link>
      <Link href="/challenge/mainlist">
        <a>
          <div className={NavStyles.nav}>
            <p
              className={
                currentURL === "/challenge/mainlist" ? NavStyles.activated : ""
              }
            >
              전체
            </p>
          </div>
        </a>
      </Link>
      <Link href="/challenge/newlist">
        <a>
          <div className={NavStyles.nav}>
            <p
              className={
                currentURL === "/challenge/newlist" ? NavStyles.activated : ""
              }
            >
              신규
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
