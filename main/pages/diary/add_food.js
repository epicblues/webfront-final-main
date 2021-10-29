import React from "react"
import { useState } from 'react'
import Link from 'next/link'
// import Information from './info-json'; ex. JSON 파일 추가

function AddFood() {
    const [searchTerm, setSearchTerm] = useState('')
    
      
    return(
        <div className="AddFood">

            <div style={{marginBottom: 10, display: 'flex', justifyContent: 'space-between'}}>
                <h4>아침</h4>
                <Link href='/diary/add_food_detail'>
                    <a>
                        <button className='ui button'>
                            완료
                        </button>
                    </a>
                </Link>
            </div>

            <div className="ui fluid icon input">
                <input type="text" placeholder="음식 검색하기"
                                    onChange={event => {setSearchTerm(event.target.value)}}/>
                <i className="search icon"></i>
            </div>

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

            <div className="ui middle aligned divided list">
                <div className="item">
                    <div className="right floated content">
                        <div className="ui button">
                            <font style={{verticalAlign: 'inherit'}}>
                                <font style={{verticalAlign: 'inherit'}}>
                                    삭제
                                </font>
                            </font>
                        </div>
                    </div>

                    <div className="content">
                        <div style={{display: "flex", justifyContent: 'space-between', textAlign:'left'}}>
                            <div className="header">사과
                                <div className="description">gram</div>
                            </div>
                            <div>Kcal</div>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="right floated content">
                        <div className="ui button">
                            <font style={{verticalAlign: 'inherit'}}>
                                <font style={{verticalAlign: 'inherit'}}>
                                    삭제
                                </font>
                            </font>
                        </div>
                    </div>

                    <div className="content">
                        <div style={{display: "flex", justifyContent: 'space-between', textAlign:'left'}}>
                            <div className="header">미역국
                                <div className="description">gram</div>
                            </div>
                            <div>Kcal</div>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="right floated content">
                        <div className="ui button">
                            <font style={{verticalAlign: 'inherit'}}>
                                <font style={{verticalAlign: 'inherit'}}>
                                    삭제
                                </font>
                            </font>
                        </div>
                    </div>

                    <div className="content">
                        <div style={{display: "flex", justifyContent: 'space-between', textAlign:'left'}}>
                            <div className="header">닭가슴살
                                <div className="description">gram</div>
                            </div>
                            <div>Kcal</div>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="right floated content">
                        <div className="ui button">
                            <font style={{verticalAlign: 'inherit'}}>
                                <font style={{verticalAlign: 'inherit'}}>
                                    삭제
                                </font>
                            </font>
                        </div>
                    </div>

                    <div className="content">
                        <div style={{display: "flex", justifyContent: 'space-between', textAlign:'left'}}>
                            <div className="header">초밥
                                <div className="description">gram</div>
                            </div>
                            <div style={{}}>Kcal</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddFood
