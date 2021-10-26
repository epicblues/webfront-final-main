import React from "react"
import { useState } from 'react'

// import Information from './info-json'; ex. JSON 파일 추가

function AddFood() {
    const [searchTerm, setSearchTerm] = useState('')

    const [activeIndex, setActiveIndex]=useState(0);

        const tabClickHandler=(index)=>{
            setActiveIndex(index);
        };

        const tabContArr=[
            {
                tabTitle:(
                    <li className={activeIndex===0 ? "is-active" : ""}
                        onClick={()=>tabClickHandler(0)}><button>최근</button></li>
                ),
                tabCont:(
                    <div style={{backgroundColor:'skyblue'}}>최근 데이터</div>
                )
            },
            {
                tabTitle:(
                    <li className={activeIndex===1 ? "is-active" : ""}
                        onClick={()=>tabClickHandler(1)}><button>저장한레시피</button></li>
                ),
                tabCont:(
                    <div style={{backgroundColor:'pink'}}>저장한레시피데이터</div>
                )
            }
        ];
    
      
    return(
        <div className="AddFood" style={{backgroundColor: 'lightgray'}}>
            <h1>여기는 식단 기록 페이지</h1>
            <input type="text" placeholder="음식 검색하기"
                                onChange={event => {setSearchTerm(event.target.value)}}/>
            <div className="container">
            {/* {JSONDATA.filter((data)=> {
                if (searchTerm == ""){
                    return data
                } else if (data.sta_nm.toLowerCase().includes(searchTerm.toLowerCase())
                        || data.sido_nm.toLowerCase().includes(searchTerm.toLowerCase())){
                    return data
                }}).map((data, key)=> {
                return
                    // ex. 사과 검색 리스트 출력
                    // <div className="apple" key={key}>
                    //     <ul>
                    //         <li>{data.sta_nm}</li>
                    //         <li>{data.sta_nm}</li>
                    //     </ul>
                    // </div>
                })
            } */}
            </div>

            <ul className="tabs is-boxed">
            {tabContArr.map((section, index)=>{
                return section.tabTitle
            })}
            </ul>
            <div>
            {tabContArr[activeIndex].tabCont}
            </div>
      </div>
    )
}

export default AddFood
