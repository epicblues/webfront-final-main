import React from "react";
// semantic-ui
import { Modal } from "semantic-ui-react";
// react-icons
import { BiInfoCircle } from "react-icons/bi";
// css
import MealStyles from '../../../styles/diary/Meal.module.css';

const List = ({ product, index }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div key={index} className={MealStyles.modalItem}>
      <Modal
        className={MealStyles.modalWindow}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
                  <div className={MealStyles.content}>
                    <div className={MealStyles.header}>
                      {product.title}
                      {product.name}
                      <div className={MealStyles.description}>
                        {product.qtt}
                        {typeof product._id === "number" && `인분`}
                        {product.mfr}
                        {typeof product._id !== "number" && ` / `}
                        {product.serve}
                        {product.unit}
                      </div>
                    </div>
                    <div className={MealStyles.calorie}>
                      {typeof product._id === "number"
                        ? product.nutrition.kcal
                        : product.kcal}
                      kcal
                    </div>
                  </div>
        }
      >
        <div className={MealStyles.modalHeader}>
          {product.title}
          {product.name}
        </div>
        <div className={MealStyles.modalContent}>
            <table>
                {/* <thead>
                  <tr>
                    <th>영양 성분</th>
                    <th>총 내용량당</th>
                  </tr>
                </thead> */}
                <tbody>
                <tr>
                  <td>제공량</td>
                  <td>
                    {product.qtt}
                    {typeof product._id === "number" && `인분`}
                    {product.serve}
                    {product.unit}
                  </td>
                </tr>
                <tr>
                  <td>열량</td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.kcal
                    : product.kcal}
                    kcal
                  </td>
                </tr>
                <tr>
                  <td>탄수화물</td>
                  <td >
                    {typeof product._id === "number"
                    ? product.nutrition.carbs
                    : product.carbs}
                    g
                  </td>
                </tr>
                <tr>
                  <td>단백질</td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.prot
                    : product.prot}
                    g
                  </td>
                </tr>
                <tr>
                  <td>지방</td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.fat
                    : product.fat}
                    g
                  </td>
                </tr>
                <tr>
                  <td>당</td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.sugars
                    : product.sugars}
                    g
                  </td>
                </tr>
                <tr>
                  <td>나트륨</td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.sodium
                    : product.sodium}
                    mg
                  </td>
                </tr>
                <tr>
                  <td>트랜스지방</td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.trnfat
                    : product.trnfat}
                    g
                  </td>
                </tr>
                <tr>
                  <td>포화지방</td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.stdfat
                    : product.stdfat}
                    g
                  </td>
                </tr>
                <tr>
                  <td>콜레스테롤</td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.chole
                    : product.chole}
                    mg
                  </td>
                </tr>
              </tbody>
            </table>
        </div>

        <div className={MealStyles.modalAction}>
          {/* <Button color="black" onClick={() => setOpen(false)}>
            닫기
          </Button> */}
          <button
            onClick={() => {
              setOpen(false);
              // addToCart(value);
            }}
          >
            확인
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default List;
