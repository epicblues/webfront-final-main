import "semantic-ui-css/semantic.min.css";

const ReviewHeader = ({ onAdd }) => {
  return (
    <header>
      <div className='is-desc'>
        <p>
          오늘 하루 어떠셨나요?<br />
          건강과 감정을 기록하세요<br />
          <button  onClick={() => {onAdd()}}>
            일기 작성
            <i className='right angle icon'></i>
          </button>
        </p>
        <div>
          <div className='is-desc-review-img
                    animate__animated animate__pulse'
          >
          </div>
          <div className='shadow-img'></div>
        </div>
      </div>
    </header>
  );
};

export default ReviewHeader;
