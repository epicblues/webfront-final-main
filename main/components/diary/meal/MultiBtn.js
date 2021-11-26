import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const MultiBtn = ({ text, color, onClick }) => {
  Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
  };
  return (
    <div onClick={onClick}>
      <i className="large angle left icon" style={{verticalAlign: 'bottom', margin: '0'}}></i>
      <span style={{color: color, font:"normal 400 1.2rem 'Noto Sans KR'"}}>{text}</span>
    </div>
  );
};

export default MultiBtn;
