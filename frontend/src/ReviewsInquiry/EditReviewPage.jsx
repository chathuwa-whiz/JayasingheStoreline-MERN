import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery, useUpdateReviewMutation } from '../redux/api/productApiSlice';
import toast from 'react-hot-toast';

export default function EditReviewPage({ currentUser }) {
    const { reviewId, productId } = useParams();
    const navigate = useNavigate();

    const { data: productData } = useGetProductByIdQuery(productId);
    const [updateReview] = useUpdateReviewMutation();

    const [review, setReview] = useState({ rating: '', comment: '' });
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (productData) {
            const reviewToEdit = productData.reviews.find(r => r._id === reviewId);
            if (reviewToEdit) {
                setReview({
                    rating: reviewToEdit.rating,
                    comment: reviewToEdit.comment,
                });
                setIsOwner(reviewToEdit.user.toString() === currentUser._id); // Check ownership
            }
        }
    }, [productData, reviewId, currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isOwner) {
            toast.error("You are not authorized to edit this review.");
            return;
        }

        if (review.rating < 1 || review.rating > 5) {
            toast.error("Rating must be between 1 and 5.");
            return;
        }

        setLoading(true);
        try {
            const result = await updateReview({ productId, reviewId, ...review });

            if (result.error) {
                toast.error("Failed to update review");
            } else {
                toast.success("Review updated successfully!");
                setTimeout(() => {
                    navigate(`/product/${productId}`);
                }, 2000);
            }
        } catch (error) {
            toast.error("Failed to update review");
        } finally {
            setLoading(false);
        }
    };

    if (!isOwner) {
        return <p className="text-red-500">You are not authorized to edit this review.</p>;
    }

    return (
        <div className="p-8 grid grid-cols-2 gap-10">
            <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Edit Your Review</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Rating</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter rating (1-5)"
                        value={review.rating}
                        min="1"
                        max="5"
                        onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Comment</label>
                    <textarea
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter your comment"
                        value={review.comment}
                        onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    />
                </div>
            </div>

            <div className="col-span-2 flex justify-end space-x-4">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Review'}
                </button>
            </div>
        </div>
    );
}
