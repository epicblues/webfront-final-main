import React from "react";
import { useState } from "react";
import Link from "next/link";
import PickDate from "../../components/diary/PickDate";
import ReviewPage from "../../components/diary/review/ReviewPage";
import { getUserOrRedirect } from "../api/auth";

const index = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <li
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          <a className="item">
            <i className="utensils icon"></i> 식단
            <div className="floating ui red label">22</div>
          </a>
        </li>
      ),
      tabCont: <div>MealPage</div>,
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1)}
        >
          <a className="item">
            <i className="pencil alternate icon"></i> 일기
            <div className="floating ui teal label">22</div>
          </a>
        </li>
      ),
      tabCont: (
        <div>
          <ReviewPage />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PickDate />

      <div className="container">
        <ul className="ui compact menu" style={{ listStyle: "none" }}>
          {tabContArr.map((section, index) => {
            return section.tabTitle;
          })}
        </ul>
        <div>{tabContArr[activeIndex].tabCont}</div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);
  console.log("user:", user);
  return { props: user };
};

export default index;
