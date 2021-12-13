import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import MealStyles from '../../../styles/diary/Meal.module.css';
import { BiChevronLeft } from "react-icons/bi";

const MultiBtn = ({ text, color, onClick }) => {
  Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
  };
  return (
    <div className={MealStyles.multiBtn} onClick={onClick}>
      <BiChevronLeft size='2rem' />
      <p style={{color: color}}>{text}</p>
    </div>
  );
};

export default MultiBtn;
