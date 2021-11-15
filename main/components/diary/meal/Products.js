import React, { useState, useRef } from "react";
import axios from "axios";
import { Button, Header, Modal } from "semantic-ui-react";

export default function Products({ setCart, cart, diary, setDiary, type }) {
  const inputRef = useRef();
  const [products] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  // Change Button 
  const [style, setStyle] = useState();
  const changeStyle = () => {
    return <i className="check circle icon"></i>;
  };

  // Count Food
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

  // Search Filter food + recipe Data
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const handleSearch = async (event) => {
    const value = event.target.value;
    const { data } = await axios.get("/api/food/" + value);
    console.log(data);
    setFilteredData(data);
  };
  
  // const handleSearch = async (event) => {
  //   const value = event.target.value;
  //   const { data } = await
  //   axios
  //   .all([
  //     axios.get("/api/food/" + value),
  //     axios.get("/api/recipe/" + value)
  //   ])
  //   .then(
  //     axios.spread((res1 , res2) => {
  //       console.log(data);
  //       setFilteredData(data);
  //     })
  //   )
  // };

  // Modal
  const modalInitialState = [];
  for(let i = 0; i < 20; i++) {
    modalInitialState.push(false);
  }
  const [open, setOpen] = React.useState(modalInitialState);
  const handleModal = (index) => setOpen(state => {
    const newState = [...state];
    newState[index] = !newState[index];
    return newState
  })
  
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

      <div className="ui middle aligned selection list" style={{ padding: 10 }}>
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
                    onClose={() => handleModal(index)}
                    onOpen={() => handleModal(index)}
                    open={open[index]}
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
                    <Modal.Header><i class="info circle icon"></i>영양 성분</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                          <ul className='ui middle aligned animated list'>
                              <li className='item'>
                                  이름:{value.name}
                              </li>
                              <li className='item'>
                                  제조사: {value.mfr}
                              </li>
                              <li className='item'>
                                  양: {value.serve}{value.unit}
                              </li>
                              <li className='item'>
                                  열량: {value.kcal}kcal
                              </li>
                              <li className='item'>
                                  탄수화물: {value.carbs}g
                              </li>
                              <li className='item'>
                                  단백질: {value.prot}g
                              </li>
                              <li className='item'>
                                  당류: {value.sugars}g
                              </li>
                              <li className='item'>
                                  지방: {value.fat}g
                              </li>
                              <li className='item'>
                                  트랜스지방: {value.trnfat}g
                              </li>
                              <li className='item'>
                                  포화지방: {value.stdfat}g
                              </li>
                              <li className='item'>
                                  콜레스테롤: {value.chole}mg
                              </li>
                              <li className='item'>
                                  나트륨: {value.sodium}mg
                              </li>
                          </ul>
                      </Modal.Description>
                    </Modal.Content>
                    
                    <Modal.Actions>
                        <Button color="black" onClick={() => handleModal(index)}>
                        취소
                        </Button>
                        <Button
                            content="확인"
                            labelPosition="right"
                            icon="checkmark"
                            onClick={() => {
                                handleModal(index);
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
