import React from "react";
import Link from "next/link";

import navigationStyles from "../../../styles/recipe/Navigation.module.css";

const Navigation = ({ currentURL }) => {
  return (
    <div className={navigationStyles.container}>
      <div className={navigationStyles.tab}>
        <p className={navigationStyles.url}>레시피 |</p>
      </div>
      {/* 메인 */}
      <Link href="/recipe/">
        <a>
          <div className={navigationStyles.tab}>
            <p
              className={
                currentURL === "/recipe" ? navigationStyles.activated : ""
              }
            >
              메인
            </p>
          </div>
        </a>
      </Link>
      <div className={navigationStyles.tab}>
        <p>검색</p>
      </div>
      {/* 종류 */}
      <Link href="/recipe/list/">
        <a>
          <div className={navigationStyles.tab}>
            <p
              className={
                currentURL === "/recipe/list" ? navigationStyles.activated : ""
              }
            >
              카테고리
            </p>
          </div>
        </a>
      </Link>
      {/* 즐겨찾기 */}
      <Link href="/recipe/list/like">
        <a>
          <div className={navigationStyles.tab}>
            <p
              className={
                currentURL === "/recipe/list/like"
                  ? navigationStyles.activated
                  : ""
              }
            >
              즐겨찾기
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Navigation;
