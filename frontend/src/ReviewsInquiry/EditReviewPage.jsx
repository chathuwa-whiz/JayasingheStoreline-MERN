import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateReviewMutation } from "../redux/api/productApiSlice"; 

const EditReviewPage = ({ currentUser }) => {
  const { productId, reviewId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(true);
  const [updateReview] = useUpdateReviewMutation();

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch(`/api/reviews/${reviewId}`);
      const data = await response.json();

      if (data.userId !== currentUser.id) {
        navigate("/"); // Redirect if not authorized
      } else {
        setReview(data.content);
      }
      setLoading(false);
    };

    fetchReview();
  }, [reviewId, currentUser.id, navigate]);

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
