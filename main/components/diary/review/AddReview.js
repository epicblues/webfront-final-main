import { useState,useRef } from "react";
import PickDate from "../PickDate";
import MultiBtn from "../meal/MultiBtn";
import MealStyles from '../../../styles/diary/Meal.module.css';

const AddReview = ({ onAdd, setShow, show, diary, setDiary }) => {
  const [text, setText] = useState("");

  const onSubmit = () => {
    if(text.length === 0) {
      setShow(false); return;
    }
    onAdd({ text });
  };

  const textArea = useRef();
  return (
    <div className={MealStyles.reviewOpen}
          style = {{
                    transform : show ? "none" : "translateX(100%)"
                  }}
    >
      <div className={MealStyles.reviewModal}>
        <div className={MealStyles.reviewModalHeader}>
          <MultiBtn
            color={text.length === 0 ? "#a0a0a0" : "#02b0b0"}
            text={text.length === 0 ? "취소" : "완료"}
            onClick={(e) =>{onSubmit(e); setText('')}}  
          />
          <PickDate diary={diary} setDiary={setDiary} />
        </div>

        <form className={MealStyles.reviewModalForm} onSubmit={(e) =>{onSubmit(e); setText('')}}>        
          <textarea
            type="text"
            value={text}
            onChange={(e) => {setText(e.target.value);}}
            autoFocus
            ref={textArea}
          />
        </form>
      </div>
     </div>
  );
};

export default AddReview;
