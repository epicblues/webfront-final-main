import React from "react"
import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, } from 'react-router-dom';
import './App.css';
// import Information from './info-json'; ex. JSON 파일 추가

function AddFood() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showRecent, setShowRecent] = useState(false);
      
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

            <button onClick={() => {setShowRecent(!showRecent)}}>{showRecent? "최근" : "저장한레시피"}</button>
            {showRecent ?
            <>
            <ul>
                <li style={{width:'260px', height:'30px'}}>저장한레시피 데이터1</li>
                <li style={{width:'260px', height:'30px'}}>저장한레시피 데이터2</li>
                <li style={{width:'260px', height:'30px'}}>저장한레세피 데이터3</li>
                <li style={{width:'260px', height:'30px'}}>저장한레시피 데이터4</li>
            </ul>
            </>
            : 
            <>
            <ul>
                <li style={{width:'260px', height:'30px'}}>최근 데이터1</li>
                <li style={{width:'260px', height:'30px'}}>최근 데이터2</li>
                <li style={{width:'260px', height:'30px'}}>최근 데이터3</li>
                <li style={{width:'260px', height:'30px'}}>최근 데이터4</li>
            </ul>
            </>
            }
      </div>
    )
}

export default AddFood
