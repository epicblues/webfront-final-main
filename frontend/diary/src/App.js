import React from 'react';
import { useState } from 'react';

import SelectDate from './components/SelectDate';
import ReviewPage from './components/review/ReviewPage'
import AddFood from './AddFood'

import './App.css';

function App() {
  // initialState에 원하는 index값을 입력
  // 초기 화면에 0번째 탭이 active되길 원한다면 0값을 입력
  const [activeIndex, setActiveIndex]=useState(0);

    // 탭타이틀을 클릭하면 해당 탭의 index값을 <activeIndex State>로 셋팅하는 함수 생성
    const tabClickHandler=(index)=>{
        setActiveIndex(index);
    };

    // 탭 Title, 탭 Content를 담은 배열 선언
    // [ activeIndex가 각 탭타이틀의 index와 일치하면 ] => 'is-active' 클래스 부여
    const tabContArr=[
        {
            tabTitle:(
                <li className={activeIndex===0 ? "is-active" : ""}
                    onClick={()=>tabClickHandler(0)}><button>식단</button></li>
            ),
            tabCont:(
                <div style={{backgroundColor:'skyblue'}}>Meal</div>
            )
        },
        {
            tabTitle:(
                <li className={activeIndex===1 ? "is-active" : ""}
                    onClick={()=>tabClickHandler(1)}><button>일기</button></li>
            ),
            tabCont:(
                <div style={{backgroundColor:'pink'}}><ReviewPage /></div>
            )
        }
    ];
  
  // return되는 템플릿에 map 함수를 사용해서 각 obj의 탭 Title이 작성되도록 함
  // 각 tabContArr obj의 tabTitle을 return
  // 각 탭 Title을 클릭하면 => 해당 태그의 index 값이 useState에 저장
  return (
      // tabContArr 배열 중에  activeIndex에 해당하는 tabCont를 ul태그 (탭 Title) 아래에서 보여줌
      // activeIndex의 탭 콘텐츠만 보여줌
      <div className="App">
        
        <SelectDate /><br />

        <ul className="tabs is-boxed">
          {tabContArr.map((section, index)=>{
              return section.tabTitle
          })}
        </ul>
        <div>
          {tabContArr[activeIndex].tabCont}
        </div>

        <AddFood /><br />
      </div>
  );
}

export default App;
