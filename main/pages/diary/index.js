import React from "react";
import { useState } from "react";
import { getUserOrRedirect } from "../../util/auth";
import { getDateId, parseDocumentToObject } from "../../util/date";
import clientPromise, { getNextSequence } from "../../util/mongodb";
import { Diary } from "../../models";
// CSS
import "semantic-ui-css/semantic.min.css";
import diaryStyles from "../../styles/diary/Diary.module.css";
// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Date
import PickDate from "../../components/diary/PickDate";
// 영양 섭취 상태
import FinalTotalSum from "../../components/diary/FinalTotalSum";
// Review
import ReviewPage from "../../components/diary/review/ReviewPage";
// 음식 작성
import AddFood from "../../components/diary/meal/AddFood";
import Meal from "../../components/diary/meal/Meal";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

export const [BREAKFAST, LUNCH, DINNER, SNACK, DEFAULT] = [
  0,
  1,
  2,
  3,
  "DEFAULT",
]; // Diary용 상수 설정

const Index = ({ user, fetchedDiary }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [writingMode, setWritingMode] = useState("DEFAULT");
  const [diary, setDiary] = useState(fetchedDiary);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <a
          key="uniqueId1"
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          식단
        </a>
      ),
      tabCont: (
        <div>
          {/* <h3 style={{ textAlign: "left" }}>오늘의 식단</h3> */}

          <div
            className="container"
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 5fr",
              gridAutoRows: "200px",
              gridGap: "1rem",
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
        <a
          key="uniqueId2"
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1)}
        >
          일기
        </a>
      ),
      tabCont: (
        <div>
          <ReviewPage diary={diary} setDiary={setDiary} writingMode={writingMode} />
        </div>
      ),
    },
  ];

  return (
    // Wrapper
    <>
      {[0, 1, 2, 3].map((type) => (
        <AddFood
          className='wrap-food'
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
        <div className='wrap-default'>
          
          <div className="tabs is-boxed">
            {/* <FinalTotalSum diary={diary} user={user} /> */}
            <i className='weight icon' style={{fontSize: '1.4rem', marginTop: '6px'}}></i>
            <div>
              {tabContArr.map((section, index) => {
                return section.tabTitle;
              })}
            </div>     
            <PickDate diary={diary} setDiary={setDiary} />
          </div>

          <div>{tabContArr[activeIndex].tabCont}</div>


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
        props: {
          user,
          fetchedDiary: parseDocumentToObject({
            ...initialDiary,
            _id: diaryId,
          }),
        },
      };
    } else {
      return {
        props: { user, fetchedDiary: parseDocumentToObject(loadedDiary) },
      };
    }
  } catch (error) {
    ctx.res.status(500).json({ message: error });
  }
};

export default Index;
