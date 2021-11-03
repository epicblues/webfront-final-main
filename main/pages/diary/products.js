import React, { useState } from 'react';
import axios from "axios";
import { Button, Header, Modal } from 'semantic-ui-react';

export default function Products({ setCart, cart }) {

  const [products] = useState([]);

  const addToCart = (value) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => value.name === item.name
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...value,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };


  // 검색필터
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
    <>
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
            <div className="item"
                  key={value.id}
                  onClick={() => addToCart(value)}
                  style={{padding: '8px'}}
            >
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
    </>
  );
}