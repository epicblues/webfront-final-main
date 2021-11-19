import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";

const FoodModal = ({ value, index, handleModal, addToCart, open }) => {
  return (
    <div className="item" key={index} style={{ padding: "8px 0 8px 0" }}>
      <div
        style={{
          textAlign: "left",
          display: "grid",
          gridTemplateColumns: "9.75fr 0.25fr",
        }}
      >
        <div>
          <Modal
            onClose={() => handleModal(index)}
            onOpen={() => handleModal(index)}
            open={open[index]}
            trigger={
              <div
                className="content"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="header">
                  {value.name}
                  <div className="description">
                    {value.mfr} / {value.serve}
                    {value.unit}
                  </div>
                </div>
                <div
                  className="right floated"
                  style={{ margin: "8px 10px 0 0" }}
                >
                  {value.kcal}Kcal
                </div>
              </div>
            }
          >
            <Modal.Header>
              <i className="info circle icon"></i>
              {value.name} 영양 성분
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <ul className="ui middle aligned animated list">
                  <li className="item">제조: {value.mfr}</li>
                  <li className="item">
                    양: {value.serve}
                    {value.unit}
                  </li>
                  <li className="item">열량: {value.kcal}kcal</li>
                  <li className="item">탄수화물: {value.carbs}g</li>
                  <li className="item">단백질: {value.prot}g</li>
                  <li className="item">당류: {value.sugars}g</li>
                  <li className="item">지방: {value.fat}g</li>
                  <li className="item">트랜스지방: {value.trnfat}g</li>
                  <li className="item">포화지방: {value.stdfat}g</li>
                  <li className="item">콜레스테롤: {value.chole}mg</li>
                  <li className="item">나트륨: {value.sodium}mg</li>
                </ul>
              </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
              <Button color="black" onClick={() => handleModal(index)}>
                취소
              </Button>
              <Button
                content="확인"
                labelPosition="right"
                icon="checkmark"
                onClick={() => {
                  handleModal(index);
                  addToCart(value);
                }}
                positive
              />
            </Modal.Actions>
          </Modal>
        </div>
        <i
          className="teal plus circle icon"
          onClick={(e) => {
            console.log(value);
            addToCart(value);

            e.currentTarget.className = "green check circle icon";
            const targetReverse = (target) => () => {
              target.className = "teal plus circle icon";
            };
            setTimeout(targetReverse(e.currentTarget), 1000);
          }}
          style={{ marginTop: 8 }}
        ></i>
      </div>
    </div>
  );
};

export default FoodModal;
