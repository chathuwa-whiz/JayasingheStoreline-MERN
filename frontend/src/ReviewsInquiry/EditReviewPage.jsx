import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateReviewMutation, useGetReviewByIdQuery } from "../redux/api/productApiSlice";
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";

const EditReviewPage = () => {
  const { productId, reviewId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0); // Add a rating field
  const currentUser = useSelector((state) => state.auth.userInfo);
  
  const [updateReview, { isLoading: updating }] = useUpdateReviewMutation();
  const { data: reviewData, isLoading: fetchingReview } = useGetReviewByIdQuery({ productId, reviewId });

  useEffect(() => {
    if (reviewData) {
      setReview(reviewData.comment);
      setRating(reviewData.rating);
    }
  }, [reviewData, currentUser._id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating!"); // Notify user
      return;
    }
    const res = await updateReview({ productId, reviewId, rating, comment: review });

    if (res.error) {
      toast.error("Failed to update review!"); // Notify user
      console.log(res.error);
      return;
    } else {
      toast.success("Review updated successfully!"); // Notify user
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Your Review</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Review Input */}
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700">Your Review</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="5"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Rating Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Rating</label>
            <div className="mt-2 flex space-x-2">
              {[1, 2, 3, 4, 5].map((rate) => (
                <button
                  type="button"
                  key={rate}
                  onClick={() => setRating(rate)}
                  className={`px-3 py-1 border rounded-full ${
                    rating === rate ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {rate} Star{rate > 1 && "s"}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                updating ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReviewPage;
