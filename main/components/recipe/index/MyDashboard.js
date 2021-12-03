import React from "react";
import Link from "next/link";
import Image from "next/image";
import ottogiBoy from "../../../public/static/logos/ottogiBoy.png";

// CSS
import myDashboardStyles from "../../../styles/recipe/MyDashboard.module.css";

const MyDashBoard = ({ countMyRecipes, totalHit }) => {
  return (
    <div className={myDashboardStyles.container}>
      <div className={myDashboardStyles.wrapper}>
        <Link href="/recipe/list/my">
          <a>
            <div className={myDashboardStyles.innerWrapper}>
              <Image src={ottogiBoy} />
              <p>내 레시피</p>
            </div>
          </a>
        </Link>
        <div className={myDashboardStyles.innerWrapper}>
          <p>작성글</p>
          <br />
          <p>{countMyRecipes}</p>
        </div>
        <div className={myDashboardStyles.innerWrapper}>
          <p>
            누적 <br />
            조회수
          </p>
          <p>{totalHit}</p>
        </div>
      </div>
    </div>
  );
};

export default MyDashBoard;
