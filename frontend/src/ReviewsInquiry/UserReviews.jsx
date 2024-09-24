import React from "react";
import { useSelector } from "react-redux";
import { useGetReviewByIdQuery } from "../redux/api/productApiSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserReviews = () => {
  const userId = useSelector((state) => state.auth.user._id);
  console.log("User ID:", userId);

  const { data, error, isLoading } = useGetReviewByIdQuery(userId);
  console.log("API Response:", { data, error, isLoading });

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    toast.error("Error fetching reviews: " + error.message);
    return <p>Error fetching reviews: {error.message}</p>;
  }
  if (!data || data.length === 0) return <p>No reviews found for this user.</p>;

  return (
    <div>
      <h2>User Reviews</h2>
      {data.map((review) => (
        <div key={review._id}>
          <p>{review.content}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default UserReviews;
