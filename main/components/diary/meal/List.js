import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import MealStyles from '../../../styles/diary/Meal.module.css';

const List = ({ product, index }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div key={index} className={MealStyles.modalItem}>
      <Modal
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
        <Modal.Header>
          <i className="info circle icon"></i>
          {product.title}
          {product.name}
        </Modal.Header>
        <Modal.Content style={{textAlign: 'center'}}>
            <table className="ui very basic collapsing celled table" style={{textAlign: 'center', margin: '1.5rem auto 0'}}>
              <thead>
                <tr>
                  <th>영양 성분</th>
                  <th>제공량</th>
                  <th>열량</th>
                  <th>탄수화물</th>
                  <th>단백질</th>
                  <th>지방</th>
                  <th>당</th>
                  <th>나트륨</th>
                  <th>트랜스지방</th>
                  <th>포화지방</th>
                  <th>콜레스테롤</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>총 내용량당</td>
                  <td>
                    {product.qtt}
                    {typeof product._id === "number" && `인분`}
                    {product.serve}
                    {product.unit}
                  </td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.kcal
                    : product.kcal}
                    kcal
                  </td>
                  <td >
                    {typeof product._id === "number"
                    ? product.nutrition.carbs
                    : product.carbs}
                    g
                  </td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.prot
                    : product.prot}
                    g
                  </td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.fat
                    : product.fat}
                    g
                  </td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.sugars
                    : product.sugars}
                    g
                  </td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.sodium
                    : product.sodium}
                    mg
                  </td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.trnfat
                    : product.trnfat}
                    g
                  </td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.stdfat
                    : product.stdfat}
                    g
                  </td>
                  <td>
                    {typeof product._id === "number"
                    ? product.nutrition.chole
                    : product.chole}
                    mg
                  </td>
                </tr>
              </tbody>
            </table>
        </Modal.Content>

        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button
            content="확인"
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              setOpen(false);
              addToCart(value);
            }}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default List;
