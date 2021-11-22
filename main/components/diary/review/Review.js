import "semantic-ui-css/semantic.min.css";

const Review = ({ review, onDelete, onToggle }) => {
  return (
      <div className={`review`}
            style={{
              borderRadius: '5px',
              padding: "1rem 1rem 0 1rem",
              marginBottom: "1rem",
              display: "grid",
              gridTemplateColumns: "9.75fr 0.25fr",
              gridAutoRows: "minmax(2rem, auto)",
              textAlign: 'left',
              boxShadow: '1px 1px 3px 1px #dadce0'
            }}
      >
        <p>
          {review.text}
          {""}
        </p>
        <i className="close icon grey"
            onClick={() => onDelete(review.id)}
        >
        </i>
      </div>
  );
};

export default Review;
