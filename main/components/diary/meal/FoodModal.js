import React, { useRef, useState } from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import MealStyles from '../../../styles/diary/Meal.module.css';
import { BiSad, BiPlusCircle, BiCheckCircle } from "react-icons/bi";

const FoodModal = ({ value, index, handleModal, addToCart, open }) => {
  const inputRef = useRef();
  const [exampleQtt,setExampleQtt] = useState(1);
  const [error, setError] = useState(false);
  const [foodChecked, setFoodChecked] = useState(false);
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
            className={MealStyles.modalWindow}
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
            <div className={MealStyles.modalHeader}>
              {value.name}
            </div>
            <div className={MealStyles.modalContent}>
              {error && (
                <p className="errorMsg">
                  최대 세 자릿수까지 입력할 수 있어요
                  <BiSad size='1.2rem'/>
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
                <button onClick={() => onAddBtn(value)}>
                  입력
                </button>
              </div>
     
              <table>
                {/* <thead>
                  <tr>
                    <th>영양 성분</th>
                    <th>총 내용량당</th>
                  </tr>
                </thead> */}
                <tbody>
                  <tr>
                    <td>열량</td>
                    <td>
                      {isNaN(value.kcal * exampleQtt) ? 0 : value.kcal * exampleQtt}kcal
                    </td>
                  </tr>
                  <tr>
                    <td>탄수화물</td>
                    <td>
                      {isNaN(value.carbs * exampleQtt) ? 0 : value.carbs * exampleQtt}g
                    </td>
                  </tr>
                  <tr>
                    <td>단백질</td>
                    <td>
                      {isNaN(value.prot * exampleQtt) ? 0 : value.prot * exampleQtt}g
                    </td>
                  </tr>
                  <tr>
                    <td>지방</td>
                    <td>
                      {isNaN(value.fat * exampleQtt) ? 0 : value.fat * exampleQtt}g
                    </td>
                  </tr>
                  <tr>
                    <td>당</td>
                    <td>
                      {isNaN(value.sugars * exampleQtt) ? 0 : value.sugars * exampleQtt}g
                    </td>
                  </tr>
                  <tr>
                    <td>나트륨</td>
                    <td>
                      {isNaN(value.sodium * exampleQtt) ? 0 : value.sodium * exampleQtt}mg
                    </td>
                  </tr>
                  <tr>
                    <td>트랜스지방</td>
                    <td>
                      {isNaN(value.trnfat * exampleQtt) ? 0 : value.trnfat * exampleQtt}g
                    </td>
                  </tr>
                  <tr>
                    <td>포화지방</td>
                    <td>
                      {isNaN(value.stdfat * exampleQtt) ? 0 : value.stdfat * exampleQtt}g
                    </td>
                  </tr>
                  <tr>
                    <td>콜레스테롤</td>
                    <td>
                      {isNaN(value.chole * exampleQtt) ? 0 : value.chole * exampleQtt}mg
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={MealStyles.modalAction}>
              <button className='modalButton' onClick={() => handleModal(index)}>
                취소
              </button>
              <button
                // content="추가"
                // labelPosition="right"
                // icon="checkmark"
                onClick={() => {
                  handleModal(index);
                  const copiedValue = {...value, quantity : exampleQtt}
                  addToCart(copiedValue);
                 
                }}
                // positive
                className='modalButton'
              >추가</button>
            </div>
          </Modal>
          {!foodChecked ? (<BiPlusCircle
            size='1.5rem'
            color='#ff5656'
            onClick={(e) => {
              // console.log(value);
              const copiedValue = {...value , quantity : 1}
              addToCart(copiedValue);
              setFoodChecked(true);
              setTimeout(() => {
                setFoodChecked(false)
              }, 500)
            }}
          />) : <BiCheckCircle className='icon' size='1.5rem' color='#ff5656' />
          }
      </div>
    </div>
  );
};

export default FoodModal;
