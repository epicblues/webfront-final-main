import PropTypes from "prop-types";

const Button = ({ text, color, onClick }) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-around', padding: '16px 16px 16px 0'}}>
      <i
        onClick={onClick}
        style={{ backgroundColor: color }}
        className="edit large icon"
      >
      </i>
      <div style={{marginTop: 4}}>
        {text}
      </div>
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
