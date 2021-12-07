import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import MealStyles from '../../../styles/diary/Meal.module.css';


const MultiBtn = ({ text, color, onClick }) => {
  Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
  };
  return (
    <div className={MealStyles.multiBtn} onClick={onClick}>
      <i className="angle left icon" style={{fontSize:'1.8rem'}}></i>
      <p style={{color: color}}>{text}</p>
    </div>
  );
};

export default MultiBtn;
