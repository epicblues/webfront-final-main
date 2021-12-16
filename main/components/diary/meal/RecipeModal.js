import React, { useRef, useState } from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import MealStyles from '../../../styles/diary/Meal.module.css';
import { BiSad, BiPlusCircle, BiCheckCircle } from "react-icons/bi";

const FoodModal = ({ value, index, handleModal, addToCart, open }) => {
  const inputRef = useRef();
  const [exampleQtt, setExampleQtt] = useState(1);
  const [error, setError] = useState(false);
  const [foodChecked, setFoodChecked] = useState(false);
  const onAddBtn = (food) => {
    const quantity = +inputRef.current.value;
    if (!/^\d{1}$/.test(quantity)) {
      setError(true);
    } else {
      setError(false);
      console.log(food);
      const coefficient = quantity / food.qtt;

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
                          {value.title}
                          <div className={MealStyles.description}>
                            {value.qtt}인분</div>
                        </div>
                        <div className={MealStyles.calorie}>
                          {value.nutrition.kcal}Kcal
                        </div>
                      </div>
            }
          >
            <div className={MealStyles.modalHeader}>
              {value.title}
            </div>
            <div className={MealStyles.modalContent}>
              {error && (
                <p className="errorMsg">
                  최대 한 자릿수까지 입력할 수 있어요
                  <BiSad size='1.2rem'/>
                </p>
              )}
              <div className="ui right labeled input">
                <input
                  autoFocus={true}
                  ref={inputRef}
                  type="number"
                  placeholder="선택한 음식의 양"
                  defaultValue={value.qtt}
                />
                <div className="ui basic label"> 인분</div>
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
                      {isNaN(value.nutrition.kcal * exampleQtt)
                        ? 0
                        : value.nutrition.kcal * exampleQtt}
                      kcal
                    </td>
                  </tr>
                  <tr>
                    <td>탄수화물</td>
                    <td>
                      {isNaN(value.nutrition.carbs * exampleQtt)
                        ? 0
                        : value.nutrition.carbs * exampleQtt}
                      g
                    </td>
                  </tr>
                  <tr>
                    <td>단백질</td>
                    <td>
                      {isNaN(value.nutrition.prot * exampleQtt)
                        ? 0
                        : value.nutrition.prot * exampleQtt}
                      g
                    </td>
                  </tr>
                  <tr>
                    <td>지방</td>
                    <td>
                      {isNaN(value.nutrition.fat * exampleQtt)
                        ? 0
                        : value.nutrition.fat * exampleQtt}
                      g
                    </td>
                  </tr>
                  <tr>
                    <td>당</td>
                    <td>
                      {isNaN(value.nutrition.sugars * exampleQtt)
                        ? 0
                        : value.nutrition.sugars * exampleQtt}
                      g
                    </td>
                  </tr>
                  <tr>
                    <td>나트륨</td>
                    <td>
                      {isNaN(value.nutrition.sodium * exampleQtt)
                        ? 0
                        : value.nutrition.sodium * exampleQtt}
                      mg
                    </td>
                  </tr>
                  <tr>
                    <td>트랜스지방</td>
                    <td>
                      {isNaN(value.nutrition.trnfat * exampleQtt)
                        ? 0
                        : value.nutrition.trnfat * exampleQtt}
                      g
                    </td>
                  </tr>
                  <tr>
                    <td>포화지방</td>
                    <td>
                      {isNaN(value.nutrition.stdfat * exampleQtt)
                        ? 0
                        : value.nutrition.stdfat * exampleQtt}
                      g
                    </td>
                  </tr>
                  <tr>
                    <td>콜레스테롤</td>
                    <td>
                      {isNaN(value.nutrition.chole * exampleQtt)
                        ? 0
                        : value.nutrition.chole * exampleQtt}
                      mg
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
                    className='modalButton'
                    onClick={() => {
                      handleModal(index);
                      const copiedValue = { ...value, quantity: exampleQtt };
                      addToCart(copiedValue);
                    }}
              >
                추가
              </button>
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
