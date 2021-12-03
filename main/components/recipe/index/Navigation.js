import React from "react";
import Link from "next/link";
import navigationStyles from "../../../styles/recipe/Navigation.module.css";

const Navigation = () => {
  return (
    <div className={navigationStyles.container}>
      <Link href="/recipe/">
        <a>
          <div className={navigationStyles.tab}>
            <p>메인</p>
          </div>
        </a>
      </Link>
      <div className={navigationStyles.tab}>
        <p>검색</p>
      </div>
      <Link href="/recipe/list">
        <a>
          <div className={navigationStyles.tab}>
            <p>종류</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Navigation;
