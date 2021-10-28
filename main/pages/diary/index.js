import React from "react";
import { useState } from "react";
import { getUserOrRedirect } from "../api/auth";
import Link from 'next/link'
// Date
import PickDate from "../../components/diary/PickDate";
// meal
import Breakfast from "../../components/diary/meal/Breakfast";
import Lunch from "../../components/diary/meal/Lunch";
import Dinner from "../../components/diary/meal/Dinner";
import Snack from "../../components/diary/meal/Snack";
// Review
import ReviewPage from "../../components/diary/review/ReviewPage";

const index = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
            <i className="utensils icon"></i> 식단
          </a>
        </li>
      ),
      tabCont: (
        <div className='ui two column centered grid'>
          <div className="column">
            <div className="container">
              
              <div class="ui four column grid">
                <Link href="/diary/add_food">
                  <div class="column">
                    <div class="ui fluid image">
                      <a class="ui red right corner label">
                        <Breakfast className='item'></Breakfast>
                        <i class="heart icon"></i>
                      </a>
                    </div>
                  </div>
                </Link>
                <Link href="/diary/add_food">
                  <div class="column">
                    <div class="ui fluid image">
                      <a class="ui red right corner label">
                        <Lunch className='item'></Lunch>
                        <i class="heart icon"></i>
                      </a>
                    </div>
                  </div>
                </Link>
                <Link href="/diary/add_food">
                  <div class="column">
                    <div class="ui fluid image">
                      <a class="ui red right corner label">
                        <Dinner className='item'></Dinner>
                        <i class="heart icon"></i>
                      </a>
                    </div>
                  </div>
                </Link>
                <Link href="/diary/add_food">
                  <div class="column">
                    <div class="ui fluid image">
                      <a class="ui red right corner label">
                        <Snack className='item'></Snack>
                        <i class="heart icon"></i>
                      </a>
                    </div>
                  </div>
                </Link>
              </div>

            </div>
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
            <i className="pencil alternate icon"></i> 일기
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
    <div className='ui center aligned container'>

      <div className='DatePart'>
          <PickDate></PickDate>
          <i className='calendar alternate outline icon'></i>
      </div>

      <div className="content">

          <ul className="ui secondary pointing menu"
                style={{listStyle:'none'}}>
              {tabContArr.map((section, index)=>{
                  return section.tabTitle
              })}
          </ul>
          <div>
            {tabContArr[activeIndex].tabCont}
          </div>
          
      </div>

    </div>
    // End of Wrapper
  );
};

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);
  console.log("user:", user);
  return { props: user };
};

export default index;
