import MealStyles from '../../../styles/diary/Meal.module.css';

const Product = ({ product, index, setQuantity, removeFromCart }) => {
  // 값이 없어서 NaN이 나올 경우
  if (isNaN(product.quantity)) {
    product.quantity = 0;
  }
  return (
    <div className="item" key={index} style={{ padding: "8px 0" }}>
      <div className={MealStyles.ProductItem}>
        <div className="header">
          {product.title}
          {product.name}
          <div className="description">
            {product.qtt}{typeof product._id === "number" && `인분`}
            {product.mfr}{typeof product._id !== "number" && ` / `}{product.serve}{product.unit}
          </div>
        </div>
        <div className="ui input">
          <p>
          {typeof product._id === "number" ? product.nutrition.kcal : product.kcal}kcal
            <span>
              {" "}
              x
            </span>
          </p>
          <input
            type="text"
            value={product.quantity}
            onChange={(e) => {setQuantity(product, parseInt(e.target.value))}}
          />
          <i
            className='close icon'
            onClick={() => removeFromCart(product)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Product;
