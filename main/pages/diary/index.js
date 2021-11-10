import React from "react";
import { useState } from "react";
import { getUserOrRedirect } from "../api/auth";

// Date
import PickDate from "../../components/diary/PickDate";
// Review
import ReviewPage from "../../components/diary/review/ReviewPage";
// Bmr
import Bmr from "../../components/diary/Bmr";
// 음식 작성
import AddFood from "../../components/diary/meal/AddFood";
// 음식 조회
import LookupMeal from "../../components/diary/meal/LookupMeal";
import Meal from "../../components/diary/meal/Meal";

export const [BREAKFAST, LUNCH, DINNER, SNACK, DEFAULT] = [
  0,
  1,
  2,
  3,
  "DEFAULT",
]; // Diary용 상수 설정

const index = ({ user }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [writingMode, setWritingMode] = useState("DEFAULT");
  const [diary, setDiary] = useState({
    user_id: user.id,
    upload_date: new Date(),
    reviews: [],
    meals: [
      {
        foods: [],
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0,
        image: null,
        imageBuffer: null,
      },
      {
        foods: [],
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0,
        image: null,
        imageBuffer: null,
      },
      {
        foods: [],
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0,
        image: null,
        imageBuffer: null,
      },
      {
        foods: [],
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0,
        image: null,
        imageBuffer: null,
      },
    ],
    total: {
      calories: 0,
      fat: 0,
      protein: 0,
      carbs: 0,
    },
  });

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <li
          key="uniqueId1"
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          <a className="item">
            식단<i className="utensils icon" style={{ marginLeft: 4 }}></i>
          </a>
        </li>
      ),
      tabCont: (
        <div style={{ border: "solid 2px lightgray", borderRadius: "5px" }}>
          <h2 style={{ textAlign: "left", padding: "16px" }}>
            오늘의 식단
            <i className="utensils icon" style={{ marginLeft: 4 }}></i>
          </h2>

          <div
            className="container"
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 5fr",
              gridGap: "1rem",
              gridAutoRows: "200px",
              padding: "0 16px 16px",
            }}
          >
            <Meal
              diary={diary}
              setWritingMode={setWritingMode}
              type={BREAKFAST}
            />
            <Meal diary={diary} setWritingMode={setWritingMode} type={LUNCH} />
            <Meal diary={diary} setWritingMode={setWritingMode} type={DINNER} />
            <Meal diary={diary} setWritingMode={setWritingMode} type={SNACK} />
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          key="uniqueId2"
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1)}
        >
          <a className="item">
            일기
            <i className="pencil alternate icon" style={{ marginLeft: 4 }}></i>
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
    // Wrapper
    <>
      {writingMode === BREAKFAST && (
        <AddFood
          diary={diary}
          setDiary={setDiary}
          type={BREAKFAST}
          setWritingMode={setWritingMode}
        />
      )}
      {writingMode === LUNCH ? (
        <AddFood
          diary={diary}
          setDiary={setDiary}
          type={LUNCH}
          setWritingMode={setWritingMode}
        />
      ) : null}
      {writingMode === DINNER ? (
        <AddFood
          diary={diary}
          setDiary={setDiary}
          type={DINNER}
          setWritingMode={setWritingMode}
        />
      ) : null}
      {writingMode === SNACK ? (
        <AddFood
          diary={diary}
          setDiary={setDiary}
          type={SNACK}
          setWritingMode={setWritingMode}
        />
      ) : null}

      {writingMode === DEFAULT && (
        <div className="ui center aligned container">
          <div className="DatePart">
            <PickDate />
          </div>

          <div className="content">
            <ul
              className="ui secondary pointing menu"
              style={{ listStyle: "none" }}
            >
              {tabContArr.map((section, index) => {
                return section.tabTitle;
              })}
            </ul>
            <div>{tabContArr[activeIndex].tabCont}</div>
          </div>

          <div>
            <Bmr />
          </div>
        </div>
      )}
    </>
    // End of Wrapper
  );
};

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);
  console.log("user:", user);
  return { props: { user } };
};

export default index;
