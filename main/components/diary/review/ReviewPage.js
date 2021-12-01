// import React from 'react'
import { useState } from "react";

// components
import ReviewHeader from "./ReviewHeader";
import Reviews from "./Reviews";
import AddReview from "./AddReview";

// CSS
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
    <div>
      {<ReviewHeader onAdd={() => setShowAddReview(!showAddReview)} />}
      {showAddReview && <AddReview onAdd={addReview} show={showAddReview} setShow={setShowAddReview} />}
      {reviews.length > 0 ? (
        <Reviews reviews={reviews} onDelete={deleteReview} />
      ) : (
        "No Reviews To Show"
      )}
    </div>
  );
};

export default ReviewPage;
