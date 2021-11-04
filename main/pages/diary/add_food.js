import React from "react";
import { useState } from "react";

import Products from "./products";
import Cart from "./cart";

const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';

function AddFood() {
  // 카운트, 장바구니 이동
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (sum, { quantity }) => sum + quantity,
      0
    );
  };

  // // 검색필터
  // const [allData, setAllData] = useState([]);
  // const [filteredData, setFilteredData] = useState(allData);
  // const handleSearch = async (event) => {
  //   const value = event.target.value;
  //   const { data } = await axios.get("/api/food/" + value);
  //   console.log(data);
  //   setFilteredData(data);

  //   // let value = event.target.value.toLowerCase();
  //   // let result = [];
  //   // console.log(value);
  //   // result = allData.filter((data) => {
  //   // return data.title.search(value) != -1;
  //   // });
  //   // setFilteredData(result);
  // };

  // const [open, setOpen] = React.useState(false)

  return (
    <div className="AddFood"
          style={{border: 'solid 2px lightgray', borderRadius: '5px'}}
    >
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
            <a className="ui teal circular label">
              {getCartTotal()}
            </a>
        </div>
        
        <button className="ui button blue"
                onClick={() => navigateTo(PAGE_PRODUCTS)}>
            더 추가하기
        </button>

      
        <button className="ui button teal"
                onClick={() => navigateTo(PAGE_CART)}>
            완료
        </button>
        
      </div>
      
      {page === PAGE_PRODUCTS && (
        <Products cart={cart} setCart={setCart} />
      )}
      {page === PAGE_CART && (
        <Cart cart={cart} setCart={setCart} />
      )}
      
    </div>
  );
}

export default AddFood;
