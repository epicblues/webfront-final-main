import React, { useState } from "react";
// components
import ReviewHeader from "./ReviewHeader";
import AddReview from "./AddReview";
import Reviews from "./Reviews";
// css
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

const ReviewPage = ({ diary, setDiary }) => {
  const [showAddReview, setShowAddReview] = useState(false);
  const reviews = diary.reviews;

  // Update Review

  // Add Review
  const addReview = async (review) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newReview = { id, ...review };
    await axios.post("/api/diary/review/create?id=" + diary._id, newReview);
    const copiedReviews = [...reviews, newReview];
    
    setDiary({ ...diary, reviews: copiedReviews });
    setShowAddReview(false);
  };

  // Delete Review
  const deleteReview = async (id) => {
    await axios.post("/api/diary/review/delete?id=" + diary._id, { id });
    setDiary({
      ...diary,
      reviews: reviews.filter((review) => review.id !== id),
    });
  };

  return (
    <div style={{textAlign: 'center', font: 'normal 500 1rem "Noto Sans KR"'}}>
      {<ReviewHeader onAdd={() => setShowAddReview(!showAddReview)} />}
      <AddReview onAdd={addReview} show={showAddReview} setShow={setShowAddReview} diary={diary} setDiary={setDiary} />
      {reviews.length > 0 ? (
        <Reviews reviews={reviews} onDelete={deleteReview} />
      ) : (
        "작성된 일기가 없습니다"
      )}
    </div>
  );
};

export default ReviewPage;
