import MealStyles from '../../../styles/diary/Meal.module.css';
import { BiX } from "react-icons/bi";

const Product = ({ product, index, setQuantity, removeFromCart }) => {
  // 값이 없어서 NaN이 나올 경우
  if (isNaN(product.quantity)) {
    product.quantity = 0;
  }
  return (
      <div className={MealStyles.ProductItem} key={index}>
        <div className={MealStyles.header}>
          {product.title}
          {product.name}
          <div className={MealStyles.description}>
            {product.qtt}{typeof product._id === "number" && `인분`}
            {product.mfr}{typeof product._id !== "number" && ` / `}{product.serve}{product.unit}
          </div>
        </div>
        <div className="ui input">
          <div className={MealStyles.calorie}>
          {typeof product._id === "number" ? product.nutrition.kcal : product.kcal}kcal
            <span>
              {" "}
              *
            </span>
          </div>
          <input
            type="text"
            value={product.quantity}
            onChange={(e) => {setQuantity(product, parseInt(e.target.value))}}
          />
          <BiX onClick={() => removeFromCart(product)} className={MealStyles.biX} />
        </div>
      </div>
  );
};

export default Product;
