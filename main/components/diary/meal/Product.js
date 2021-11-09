const Product = ({ product, index, setQuantity, removeFromCart }) => {
  return (
    <div className="item" key={index} style={{ padding: "8px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "left",
        }}
      >
        <div className="header">
          {product.name}
          <div className="description">
            {product.mfr} / {product.serve}
            {product.unit}
          </div>
        </div>
        <div className="ui input">
          <p style={{ margin: "8px 10px 0 0" }}>
            {product.kcal}Kcal
            <span
              style={{
                fontWeight: 600,
                fontSize: "1rem",
                padding: "0 0 0 8px",
              }}
            >
              {" "}
              x
            </span>
          </p>
          <input
            style={{ marginRight: 8 }}
            type="text"
            value={product.quantity}
            onChange={(e) => setQuantity(product, parseInt(e.target.value))}
          />
          <i
            className="red large minus circle icon"
            style={{ marginTop: 8 }}
            onClick={() => removeFromCart(product)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Product;
