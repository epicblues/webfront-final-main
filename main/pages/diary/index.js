import React from "react";
import { useState } from "react";
import { getUserOrRedirect } from "../../util/auth";

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
import { getDateId } from "../../util/date";
import clientPromise, { getNextSequence } from "../../util/mongodb";
import { Diary } from "../../models";

export const [BREAKFAST, LUNCH, DINNER, SNACK, DEFAULT] = [
  0,
  1,
  2,
  3,
  "DEFAULT",
]; // Diary용 상수 설정

const index = ({ user, fetchedDiary }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [writingMode, setWritingMode] = useState("DEFAULT");
  const [diary, setDiary] = useState(fetchedDiary);

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
              gridAutoRows: "200px",
              gridGap: "1rem",
              padding: "0 16px 16px",
            }}
          >
            {[0, 1, 2, 3].map((type) => (
              <Meal
                diary={diary}
                setWritingMode={setWritingMode}
                type={type}
                key={type}
                user={user}
              />
            ))}
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
          <ReviewPage diary={diary} setDiary={setDiary} />
        </div>
      ),
    },
  ];

  return (
    // Wrapper
    <>
      {[0, 1, 2, 3].map((type) => (
        <AddFood
          writingMode={writingMode}
          diary={diary}
          setDiary={setDiary}
          type={type}
          setWritingMode={setWritingMode}
          user={user}
          key={type}
          
        />
      ))}

      {writingMode === DEFAULT && (
        <div className="ui center aligned container">
          <div className="DatePart">
            <PickDate diary={diary} setDiary={setDiary} />
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
  try {
    const user = await getUserOrRedirect(ctx);

    // 당일 다이어리를 가져오는 로직
    const client = await clientPromise;
    const loadedDiary = await client
      .db("webfront")
      .collection("diary")
      .findOne({ user_id: user.id, upload_date: getDateId(new Date()) });

    // 다이어리가 없을 경우 새로 만들고 그 초기화 값을 return
    if (loadedDiary === null) {
      const diaryId = await getNextSequence("diary", client);
      const initialDiary = new Diary(user.id);
      await client
        .db("webfront")
        .collection("diary")
        .insertOne({ ...initialDiary, _id: diaryId });
      return {
        props: { user, fetchedDiary: { ...initialDiary, _id: diaryId } },
      };
    } else {
      return { props: { user, fetchedDiary: loadedDiary } };
    }
  } catch (error) {
    ctx.res.status(500).json({ message: error });
  }
};

export default index;
