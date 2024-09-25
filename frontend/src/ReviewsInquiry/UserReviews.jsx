import React from "react";
import { useSelector } from "react-redux";
import { useGetReviewByIdQuery } from "../redux/api/productApiSlice";
import toast from "react-hot-toast";

const UserReviews = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const { data, error, isLoading } = useGetReviewByIdQuery(userId);

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    toast.error("Error fetching reviews: " + error.message);
    return <p>Error fetching reviews: {error.message}</p>;
  }
  if (!data || data.length === 0) return <p>No reviews found for this user.</p>;

  // Count total reviews
  const totalReviews = data.length;

  return (
    <div>
      <h2>User Reviews</h2>
      <div className="mb-4">
        <p>Total Reviews: {totalReviews}</p>
      </div>
    </div>
  );
};

export default UserReviews;
