import React, { useState, useRef } from "react";
import axios from "axios";
import { Button, Header, Modal } from "semantic-ui-react";

export default function Products({ setCart, cart, diary, setDiary, type }) {
  const inputRef = useRef();
  const [products] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const [style, setStyle] = useState();

  const changeStyle = () => {
    return <i className="check circle icon"></i>;
  };

  const addToCart = (value) => {
    const prevMeal = diary.meals[type];
    const foodIndex = prevMeal.foods.findIndex(
      (originalFood) => originalFood.no === value.no
    );
    if (foodIndex !== -1) {
      prevMeal.foods[foodIndex].quantity += 1;
    } else {
      value.quantity = 1;
      prevMeal.foods.push(value);
    }
    prevMeal.calories += value.kcal;
    prevMeal.fat += value.fat;
    prevMeal.carbs += value.carbs;
    prevMeal.protein += value.prot;
    const currentMeals = diary.meals;
    currentMeals.splice(type, 1, prevMeal);
    setDiary({
      ...diary,
      meals: currentMeals,
    });
  };

  // 검색필터
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const handleSearch = async (event) => {
    const value = event.target.value;
    const { data } = await axios.get("/api/food/" + value);
    console.log(data);
    setFilteredData(data);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="ui fluid icon input" style={{ padding: "0 16px" }}>
        <input
          type="text"
          placeholder="음식 검색하기"
          onChange={(event) => handleSearch(event)}
        />
        <i className="search icon" style={{ right: 16 }}></i>
      </div>

      <div className="ui middle aligned divided list" style={{ padding: 10 }}>
        {filteredData.map((value, index) => {
          return (
            // 검색 리스트 출력
            <div className="item" key={index} style={{ padding: "8px" }}>
              <div
                style={{
                  textAlign: "left",
                  display: "grid",
                  gridTemplateColumns: "9.5fr 0.5fr",
                }}
              >
                <div>
                  <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                      <div
                        className="content"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="header">
                          {value.name}
                          <div className="description">
                            {value.mfr} / {value.serve}
                            {value.unit}
                          </div>
                        </div>
                        <div
                          className="right floated"
                          style={{ margin: "8px 10px 0 0" }}
                        >
                          {value.kcal}Kcal
                        </div>
                      </div>
                    }
                  >
                    <Modal.Header>선택한 음식</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <Header>영양정보</Header>
                        {/* {selectedData.map((value, index) => {
                                return (
                                    <>
                                    <div key={index}>
                                        <span>
                                            {value.name}
                                        </span>
                                        /
                                        <span>
                                            {value.mfr}
                                        </span>
                                        <br />
                                        <input
                                            ref={inputRef}
                                            type='text'
                                            placeholder='선택한 음식의 양'
                                        />
                                        <span>
                                            단위:({value.unit})
                                        </span>
                                    </div>
                                    </>
                                );
                            })} */}
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color="black" onClick={() => setOpen(false)}>
                        취소
                      </Button>
                      <Button
                        content="확인"
                        labelPosition="right"
                        icon="checkmark"
                        onClick={() => {
                          setOpen(false);
                          addToCart(value);
                        }}
                        positive
                      />
                    </Modal.Actions>
                  </Modal>
                </div>
                <i
                  className="teal plus circle icon right floated"
                  onClick={(e) => {
                    console.log(value);
                    addToCart(value);

                    e.currentTarget.className =
                      "green check circle icon right floated";
                    const targetReverse = (target) => () => {
                      target.className = "teal plus circle icon right floated";
                    };
                    setTimeout(targetReverse(e.currentTarget), 1000);
                  }}
                  style={{ marginTop: 8 }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
