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
      style={{ backgroundColor: color, boxShadow: '1px 1px 3px 1px #dadce0', color: '#fff'}}
      onClick={onClick}      
    >
      {text}
    </Button>
  );
};

export default MultiBtn;
