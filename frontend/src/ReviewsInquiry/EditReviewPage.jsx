import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateReviewMutation, useGetReviewByIdQuery } from "../redux/api/productApiSlice";
import { useDispatch, useSelector } from 'react-redux';

const EditReviewPage = () => {
  const { productId, reviewId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(true);
  const [updateReview] = useUpdateReviewMutation();
  const {data: reviewData} = useGetReviewByIdQuery(productId, reviewId);
  const currentUser = useSelector((state) => state.auth.userInfo);

  console.log("Current User : ",currentUser);
  console.log("Review Data : ",reviewData);

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch(`/api/reviews/${reviewId}`);
      const data = await response.json();

      if (data.userId !== currentUser._id) {
        navigate("/"); // Redirect if not authorized
      } else {
        setReview(data.content);
      }
      setLoading(false);
    };

    fetchReview();
  }, [reviewId, currentUser._id, navigate]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateReview({ productId, reviewId, comment: review });
    navigate(`/product/${productId}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <button type="submit">Update Review</button>
    </form>
  );
};

export default EditReviewPage;
