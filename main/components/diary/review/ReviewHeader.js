import "semantic-ui-css/semantic.min.css";

const ReviewHeader = ({ onAdd }) => {
  return (
    <header>
      <div className='is-desc'>
        <p>
          오늘 하루 어떠셨나요?<br />
          건강과 감정을 기록하세요
          <button  onClick={() => {onAdd()}}>
            일기 작성 &gt;
          </button>
        </p>
        <div className='is-desc-review-img'></div>
      </div>
    </header>
  );
};

export default ReviewHeader;
