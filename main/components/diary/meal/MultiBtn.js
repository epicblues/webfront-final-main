import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const MultiBtn = ({ text, color, onClick }) => {
  Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
  };
  return (
    <Button
      className="ui Button"
      style={{ backgroundColor: color}}
      onClick={onClick}      
    >
      {text}
    </Button>
  );
};

export default MultiBtn;
