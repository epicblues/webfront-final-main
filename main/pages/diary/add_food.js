import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
// import Information from './info-json'; ex. JSON 파일 추가

function AddFood() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const handleSearch = async (event) => {
    const value = event.target.value;
    const { data } = await axios.get("/api/food/" + value);
    console.log(data);
    setFilteredData(data);

    // let value = event.target.value.toLowerCase();
    // let result = [];
    // console.log(value);
    // result = allData.filter((data) => {
    // return data.title.search(value) != -1;
    // });
    // setFilteredData(result);
  };

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/albums/1/photos")
      .then((response) => {
        console.log(response.data);
        setAllData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  }, []);

  return (
    <div className="AddFood">
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>아침</h3>
        <Link href="/diary/add_food_detail">
          <a>
            <button className="ui button blue">완료</button>
          </a>
        </Link>
      </div>

      <div className="ui fluid icon input">
        <input
          type="text"
          placeholder="음식 검색하기"
          onChange={(event) => handleSearch(event)}
        />
        <i className="search icon"></i>
      </div>

      <div className="ui middle aligned divided list" style={{ padding: 10 }}>
        {filteredData.map((value, index) => {
          return (
            // 검색 리스트 출력
            <div className="item" key={value.id}>
              <div className="right floated content">
                <div className="ui button">
                  <font style={{ verticalAlign: "inherit" }}>
                    <font style={{ verticalAlign: "inherit" }}>추가</font>
                  </font>
                </div>
              </div>

              <div className="content">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "left",
                  }}
                >
                  <div className="header">
                    {value.title}
                    <div className="description">{value.gram}gram</div>
                  </div>
                  <div>{value.kcal}Kcal</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AddFood;
