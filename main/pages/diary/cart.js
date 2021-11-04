import React from 'react';
// import { useState } from "react";

// const PAGE_PRODUCTS = 'products';

export default function Cart({ cart, setCart }) {
    // const [page, setPage] = useState(PAGE_PRODUCTS);
    // const navigateTo = (nextPage) => {
    //   setPage(nextPage);
    // };

    const getTotalSum = () => {
      return cart.reduce(
        (sum, { cost, quantity }) => sum + cost * quantity,
        0
      );
    };
  
    const clearCart = () => {
      setCart([]);
    };
  
    const setQuantity = (product, amount) => {
      const newCart = [...cart];
      newCart.find(
        (item) => item.name === product.name
      ).quantity = amount;
      setCart(newCart);
    };
  
    const removeFromCart = (productToRemove) => {
      setCart(
        cart.filter((product) => product !== productToRemove)
      );
    };
  
    return (
      <>
        <div style={{textAlign: 'right', padding: 16}}>
            {cart.length > 0 && (
                <i className='red large trash alternate icon'
                    onClick={clearCart}
                >
                </i>
            )}
        </div>
        <div className="ui middle aligned divided list" style={{ padding: 8 }}>
          {cart.map((product, idx) => (
            <div className='item'
                  key={idx}
                  style={{padding: '8px'}}
            >
              <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "left"
                  }}>
                <div className="header">
                    {product.name}
                    <div className="description">회사/ g</div>
                </div>
                <div>
                    Kcal
                    <input
                    value={product.quantity}
                    onChange={(e) =>
                        setQuantity(
                        product,
                        parseInt(e.target.value)
                        )
                    }
                    />
                    <i className='red large close icon'
                        onClick={() => removeFromCart(product)}
                    >
                    </i>
                </div>
              </div>
            </div>
          ))}
        </div>
      
        {/* <button className="ui button blue"
                onClick={() => navigateTo(PAGE_PRODUCTS)}>
            더 추가하기
        </button> */}

      <div>Total: {getTotalSum()}</div>
    </>
  );
}