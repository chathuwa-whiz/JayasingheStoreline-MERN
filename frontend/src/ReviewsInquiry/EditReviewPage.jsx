import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery, useUpdateReviewMutation } from '../redux/api/productApiSlice';
import toast from 'react-hot-toast';

export default function EditReviewPage() {
    const { reviewId } = useParams();
    const navigate = useNavigate();

    // Assuming the product ID is also available via route params or context
    const { productId } = useParams(); // Add productId if it's part of URL

    // Fetch product data
    const { data: productData, refetch } = useGetProductByIdQuery(productId);

    const [updateReview] = useUpdateReviewMutation();

    const [review, setReview] = useState({ rating: '', comment: '' });

    useEffect(() => {
        if (productData) {
            const reviewToEdit = productData.reviews.find(r => r._id === reviewId);
            if (reviewToEdit) {
                setReview({
                    rating: reviewToEdit.rating,
                    comment: reviewToEdit.comment
                });
            }
        }
    }, [productData, reviewId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateReview({ productId, reviewId, ...review }).unwrap();
            toast.success('Review updated successfully!');
            navigate(`/product/${productId}`); // Navigate to the product page
        } catch (error) {
            toast.error('Failed to update review');
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Review</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-lg font-medium text-gray-700">Rating</label>
                    <input
                        type="number"
                        id="rating"
                        value={review.rating}
                        onChange={(e) => setReview({ ...review, rating: e.target.value })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-lg font-medium text-gray-700">Comment</label>
                    <textarea
                        id="comment"
                        value={review.comment}
                        onChange={(e) => setReview({ ...review, comment: e.target.value })}
                        rows="4"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Update Review
                </button>
            </form>
        </div>
    );
}
