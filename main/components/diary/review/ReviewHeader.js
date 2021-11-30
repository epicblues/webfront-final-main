import "semantic-ui-css/semantic.min.css";

const ReviewHeader = ({ onAdd }) => {
  return (
    <header
      style={{textAlign: 'left', marginBottom: '1rem'}}
    >
      {/* <h3>
        오늘의 일기
      </h3> */}
      <div style={{textAlign: 'center', boxShadow: '1px 1px 3px 1px #dadce0', padding: '1.6rem', borderRadius: '20px'}}>
        <p>
          <span style={{font:"normal 500 1.2rem/28px 'Noto Sans KR'"}}>
            오늘 하루 어떠셨나요?
          </span>
          <br />
          건강과 감정을 기록하세요
        </p>
        <button className='ui button teal'
                style={{borderRadius: '20px'}}
                onClick={onAdd}
        >일기 추가하기
        </button>
      </div>
    </header>
  );
};

export default ReviewHeader;
