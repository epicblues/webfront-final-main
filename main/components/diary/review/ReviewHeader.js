import "semantic-ui-css/semantic.min.css";

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
            일기 추가 &gt;
          </button>
        </p>
        <div className='is-desc-img'></div>
      </div>
    </header>
  );
};

export default ReviewHeader;
