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
        <div className={myDashboardStyles.innerWrapper}>
          <Link href="/recipe/list/my">
            <a>
              <Image src={ottogiBoy} alt="ottogiBoy"></Image>
              <p>: 내 레시피 :</p>
            </a>
          </Link>
        </div>
        <div className={myDashboardStyles.innerWrapper}>
          <p className={myDashboardStyles.title}>작성글</p>
          <br />
          <p div className={myDashboardStyles.number}>
            {countMyRecipes}
          </p>
        </div>
        <div className={myDashboardStyles.innerWrapper}>
          <p className={myDashboardStyles.title}>
            누적 <br />
            조회수
          </p>
          <p className={myDashboardStyles.number}>{totalHit}</p>
        </div>
      </div>
    </div>
  );
};

export default MyDashBoard;
