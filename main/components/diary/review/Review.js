import "semantic-ui-css/semantic.min.css";

const Review = ({ review, onDelete, onToggle }) => {
  return (
    <div
      className={`review`}
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderRadius: '5px',
        backgroundColor: '#f0f0f0',
        padding: "20px",
      }}
    >
      <p>
        {review.text}
        {""}
      </p>
      <button className="ui button" onClick={() => onDelete(review.id)}>
        삭제
      </button>
    </div>
  );
};

export default Review;
