import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";

const List = ({ product, index }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div key={index} className="item">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <div
            className="content"
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
                {product.qtt}
                {typeof product._id === "number" && `인분`}
                {product.mfr}
                {typeof product._id !== "number" && ` / `}
                {product.serve}
                {product.unit}
              </div>
            </div>
            <div className="right floated" style={{ margin: "8px 10px 0 0" }}>
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
          {product.name} 영양 성분
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <ul className="ui middle aligned animated list">
              <li className="item">
                {typeof product._id === "number" && `설명:`}
                {product.desc}
                {typeof product._id !== "number" && `제조:`}
                {product.mfr}
              </li>
              <li className="item">
                양:
                {product.qtt}
                {typeof product._id === "number" && `인분`}
                {product.serve}
                {product.unit}
              </li>
              <li className="item">
                열량:
                {typeof product._id === "number"
                  ? product.nutrition.kcal
                  : product.kcal}
                kcal
              </li>
              <li className="item">
                탄수화물:
                {typeof product._id === "number"
                  ? product.nutrition.carbs
                  : product.carbs}
                g
              </li>
              <li className="item">
                단백질:
                {typeof product._id === "number"
                  ? product.nutrition.prot
                  : product.prot}
                g
              </li>
              <li className="item">
                당류:
                {typeof product._id === "number"
                  ? product.nutrition.sugars
                  : product.sugars}
                g
              </li>
              <li className="item">
                지방:
                {typeof product._id === "number"
                  ? product.nutrition.fat
                  : product.fat}
                g
              </li>
              <li className="item">
                트랜스지방:
                {typeof product._id === "number"
                  ? product.nutrition.trnfat
                  : product.trnfat}
                g
              </li>
              <li className="item">
                포화지방:
                {typeof product._id === "number"
                  ? product.nutrition.stdfat
                  : product.stdfat}
                g
              </li>
              <li className="item">
                콜레스테롤:
                {typeof product._id === "number"
                  ? product.nutrition.chole
                  : product.chole}
                mg
              </li>
              <li className="item">
                나트륨:
                {typeof product._id === "number"
                  ? product.nutrition.sodium
                  : product.sodium}
                mg
              </li>
            </ul>
          </Modal.Description>
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
