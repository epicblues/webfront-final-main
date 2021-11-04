import React from 'react';
import { useState } from "react";
import ImageUpload from '../../components/diary/meal_detail/ImageUpload';

const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';

export default function Cart({ cart, setCart, page, setPage }) {
    

    const navigateTo = (nextPage) => {
      setPage(nextPage);
    };

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
      <div style={{padding: 16}}>
        <div>
            <ImageUpload />
        </div>
        <div style={{textAlign: 'right'}}>
            {cart.length > 0 && (
                <i className='red large trash alternate icon'
                    onClick={clearCart}
                >
                </i>
            )}
        </div>
        <div className="ui middle aligned divided list">
          {cart.map((product, idx) => (
            <div className='item'
                  key={idx}
                  style={{padding: '8px 0'}}
            >
              <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "left"
                  }}>
                <div className="header">
                    {product.name}
                    <div className="description">{product.mfr} / {product.serve} gram</div>
                </div>
                <div className='ui input'>
                    <p style={{margin: '8px 10px 0 0'}}>
                      {product.kcal}Kcal
                      <span style={{
                              fontWeight: 600,
                              fontSize: '1rem',
                              padding: '0 0 0 8px'
                            }}
                      > x
                      </span>
                    </p>
                    <input
                    style={{marginRight: 8}}
                    type="text"
                    value={product.quantity}
                    onChange={(e) =>
                        setQuantity(
                        product,
                        parseInt(e.target.value)
                        )
                    }
                    />
                    <i className='red large minus circle icon'
                        style={{marginTop: 8}}
                        onClick={() => removeFromCart(product)}
                    >
                    </i>
                </div>
              </div>
            </div>
          ))}
        </div>
      
        <button className="ui fluid button blue"
                onClick={() => navigateTo(PAGE_PRODUCTS)}>
            더 추가하기
        </button>

        {/* {page === PAGE_CART && (
          <Cart cart={cart} setCart={setCart} />
        )} */}

      <div>Total: {getTotalSum()}</div>
    </div>
  );
}