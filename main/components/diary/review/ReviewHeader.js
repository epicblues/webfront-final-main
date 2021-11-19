import "semantic-ui-css/semantic.min.css";

const ReviewHeader = ({ onAdd, showAdd }) => {
  return (
    <header
      style={{ display: "flex", justifyContent: 'space-between' }}
    >
      <h3>
        오늘의 일기
      </h3>
      <i className={showAdd ? 'large close icon' : 'large edit icon'}
        onClick={onAdd}
      >
      </i>
    </header>
  );
};

export default ReviewHeader;
