import React, { useRef, useState } from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import MealStyles from '../../../styles/diary/Meal.module.css';

const FoodModal = ({ value, index, handleModal, addToCart, open }) => {
  const inputRef = useRef();
  const [exampleQtt,setExampleQtt] = useState(1);
  const [error, setError] = useState(false);

  const onAddBtn = (food) => {
    const quantity = +(inputRef.current.value);
    if (!/^\d{1,3}$/.test(quantity)) {
      setError(true);
    } else {
      setError(false);
      console.log(quantity + 1)
      console.log(food);
      const coefficient = quantity / food.serve; 
      
      setExampleQtt(coefficient);
    }
  };

  return (
    <div className={MealStyles.modalItem} key={index}>
      <div>
          <Modal
            onClose={() => handleModal(index)}
            onOpen={() => handleModal(index)}
            open={open[index]}
            trigger={
                      <div className={MealStyles.content}>
                        <div className={MealStyles.header}>
                          {value.name}
                          <div className={MealStyles.description}>
                            {value.mfr} / {value.serve}
                            {value.unit}
                          </div>
                        </div>
                        <div className={MealStyles.calorie}>
                          {value.kcal}Kcal
                        </div>
                      </div>
            }
          >
            <Modal.Header>
              <i className="balance scale icon"></i>
              {value.name}
            </Modal.Header>
            <Modal.Content style={{textAlign: 'center'}}>
              {error && (
                <p className="errorMsg" style={{ color: "red" }}>
                  최대 세 자릿수까지 중량을 입력할 수 있어요
                  <i className="frown outline icon"></i>
                </p>
              )}
              <div className='ui right labeled input'>
                <input 
                      autoFocus={true}
                      ref={inputRef}
                      type="number"
                      placeholder="선택한 음식의 양"
                      defaultValue={value.serve}
                />
                <div className="ui basic label">
                  {value.unit}
                </div>
                <button className="ui button teal"
                        onClick={() => onAddBtn(value)}
                        style={{marginLeft: '1rem'}}
                >
                  입력
                </button>
              </div>
     
              <table className="ui very basic collapsing celled table" style={{textAlign: 'center', margin: '1.5rem auto 0'}}>
                <thead>
                  <tr>
                    <th>영양 성분</th>
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
                      {isNaN(value.kcal * exampleQtt) ? 0 : value.kcal * exampleQtt}kcal
                    </td>
                    <td >
                      {isNaN(value.carbs * exampleQtt) ? 0 : value.carbs * exampleQtt}g
                    </td>
                    <td>
                      {isNaN(value.prot * exampleQtt) ? 0 : value.prot * exampleQtt}g
                    </td>
                    <td>
                      {isNaN(value.fat * exampleQtt) ? 0 : value.fat * exampleQtt}g
                    </td>
                    <td>
                      {isNaN(value.sugars * exampleQtt) ? 0 : value.sugars * exampleQtt}g
                    </td>
                    <td>
                      {isNaN(value.sodium * exampleQtt) ? 0 : value.sodium * exampleQtt}mg
                    </td>
                    <td>
                      {isNaN(value.trnfat * exampleQtt) ? 0 : value.trnfat * exampleQtt}g
                    </td>
                    <td>
                      {isNaN(value.stdfat * exampleQtt) ? 0 : value.stdfat * exampleQtt}g
                    </td>
                    <td>
                      {isNaN(value.chole * exampleQtt) ? 0 : value.chole * exampleQtt}mg
                    </td>
                  </tr>
                </tbody>
              </table>
            </Modal.Content>

            <Modal.Actions>
              <Button color="black" onClick={() => handleModal(index)}>
                취소
              </Button>
              <Button
                content="추가하기"
                labelPosition="right"
                icon="checkmark"
                onClick={() => {
                  handleModal(index);
                  const copiedValue = {...value, quantity : exampleQtt}
                  addToCart(copiedValue);
                 
                }}
                positive
              />
            </Modal.Actions>
          </Modal>
          <i
            className="#ff5656 plus circle icon"
            onClick={(e) => {
              console.log(value);
              const copiedValue = {...value , quantity : 1}
              addToCart(copiedValue);

              e.currentTarget.className = "green check circle icon";
              const targetReverse = (target) => () => {
                target.className = "#ff5656 plus circle icon";
              };
              setTimeout(targetReverse(e.currentTarget), 500);
            }}
          >
          </i>
      </div>
    </div>
  );
};

export default FoodModal;
