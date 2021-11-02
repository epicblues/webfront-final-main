import React from "react";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Button, Header, Modal } from 'semantic-ui-react'

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

  const [open, setOpen] = React.useState(false)

  return (
    <div className="AddFood" style={{border: 'solid 2px lightgray', borderRadius: '5px'}}>
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          justifyContent: "space-between",
          padding: '16px'
        }}
      >
        <div>
            <span>아침</span>
            <a className="ui teal circular label">2</a>
        </div>
        
        <Link href="/diary/add_food_detail">
          <a>
            <button className="ui button teal">완료</button>
          </a>
        </Link>
      </div>

      <div className="ui fluid icon input" style={{padding: '0 16px'}}>
        <input
          type="text"
          placeholder="음식 검색하기"
          onChange={(event) => handleSearch(event)}
        />
        <i className="search icon" style={{right: 16}}></i>
      </div>

      <div className="ui middle aligned divided list" style={{ padding: 10 }}>
        {filteredData.map((value, index) => {
          return (
            // 검색 리스트 출력
            <div className="item" key={value.id} style={{padding: '8px'}}>
              <div className="right floated content">
                <div>
                    <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<i className='plus circle icon' style={{verticalAlign:'-webkit-baseline-middle'}}></i>}
                    >
                      <Modal.Header>Select</Modal.Header>
                      <Modal.Content>
                          <Modal.Description>
                              <Header>영양정보</Header>
                              <p>
                                  계산
                              </p>
                          </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                          <Button color='black' onClick={() => setOpen(false)}>
                          Nope
                          </Button>
                          <Button
                          content="Okay"
                          labelPosition='right'
                          icon='checkmark'
                          onClick={() => setOpen(false)}
                          positive
                          />
                      </Modal.Actions>
                    </Modal>
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
                    {value.name}
                    <div className="description">{value.mfr} / {value.serve}gram</div>
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
