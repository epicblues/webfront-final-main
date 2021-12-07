import "semantic-ui-css/semantic.min.css";
// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const ReviewHeader = ({ onAdd }) => {
  return (
    <header>
      <div className='is-desc'>
        <p>
          오늘 하루 어떠셨나요?<br />
          <span>
            건강과 감정을 기록하세요
          </span>
          <button  onClick={() => {onAdd()}}>
            일기 작성
            <FontAwesomeIcon icon={faPen} className='icon' />
          </button>
        </p>
        <div className='is-desc-review-img'></div>
      </div>
    </header>
  );
};

export default ReviewHeader;
