// components
import Review from "./Review";

const Reviews = ({ reviews, onDelete }) => {
  return (
    <>
      {reviews.map((review, index) => (
        <Review key={review.id} review={review} onDelete={onDelete} />
      ))}
    </>
  );
};

export default Reviews;
