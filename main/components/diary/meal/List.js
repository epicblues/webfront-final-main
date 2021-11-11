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
              {product.name}
              <div className="description">
                {product.mfr} / {product.serve}
                {product.unit}
              </div>
            </div>
            <div className="right floated" style={{ margin: "8px 10px 0 0" }}>
              {product.kcal}Kcal
            </div>
          </div>
        }
      >
        <Modal.Header>
          <i class="info circle icon"></i>영양 성분
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <ul className="ui middle aligned animated list">
              <li className="item">이름:{product.name}</li>
              <li className="item">제조사: {product.mfr}</li>
              <li className="item">
                양: {product.serve}
                {product.unit}
              </li>
              <li className="item">열량: {product.kcal}kcal</li>
              <li className="item">탄수화물: {product.carbs}g</li>
              <li className="item">단백질: {product.prot}g</li>
              <li className="item">당류: {product.sugars}g</li>
              <li className="item">지방: {product.fat}g</li>
              <li className="item">트랜스지방: {product.trnfat}g</li>
              <li className="item">포화지방: {product.stdfat}g</li>
              <li className="item">콜레스테롤: {product.chole}mg</li>
              <li className="item">나트륨: {product.sodium}mg</li>
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
