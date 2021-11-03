import React from 'react';

export default function Cart({ cart, setCart }) {
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
        {/* {cart.length > 0 && (
            <button className='ui button red'
                    onClick={clearCart}
            >
                전체 삭제
            </button>
        )} */}
        <div className="ui middle aligned divided list" style={{ padding: 10 }}>
          {cart.map((product, idx) => (
            <div key={idx}
                  style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "left"
                  }}
            >
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
                    <i className='close icon red'
                        onClick={() => removeFromCart(product)}
                    >
                    </i>
                </div>
            </div>
        ))}
      </div>

































      <div>Total: {getTotalSum()}</div>
    </>
  );
}