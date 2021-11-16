const Product = ({ product, index, setQuantity, removeFromCart }) => {
  // 값이 없어서 NaN이 나올 경우
  if (isNaN(product.quantity)) {
    product.quantity = 0;
  }
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
          {product.title}
          {product.name}
          <div className="description">
            {product.qtt}{typeof product._id === "number" && `인분`}
            {product.mfr}{typeof product._id !== "number" && ` / `}{product.serve}{product.unit}
          </div>
        </div>
        <div className="ui input">
          <p style={{ margin: "8px 10px 0 0" }}>
          {typeof product._id === "number" ? product.nutrition.kcal : product.kcal}kcal
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
            onChange={(e) => {setQuantity(product, parseInt(e.target.value))}}
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
