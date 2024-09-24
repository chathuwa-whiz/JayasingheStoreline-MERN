import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import { useCreateReviewMutation, useUpdateReviewMutation } from "../redux/api/productApiSlice";

export default function ReviewForm({ productId, refetch, existingReview }) {
    const [rating, setRating] = useState(existingReview ? existingReview.rating : 0);
    const [comment, setComment] = useState(existingReview ? existingReview.comment : '');
    const [createReview] = useCreateReviewMutation();
    const [updateReview] = useUpdateReviewMutation();

    useEffect(() => {
        if (existingReview) {
            setRating(existingReview.rating);
            setComment(existingReview.comment);
        }
    }, [existingReview]);

    const submitReviewHandler = async (e) => {
        e.preventDefault();
        if (rating < 1 || rating > 5) {
            toast.error("Please select a rating between 1 and 5 stars.");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please add a comment.");
            return;
        }

        try {
            if (existingReview) {
                await updateReview({ productId, reviewId: existingReview.id, rating, comment }).unwrap();
                toast.success("Review updated successfully!");
            } else {
                await createReview({ productId, rating, comment }).unwrap();
                toast.success("Review submitted successfully!");
            }
            refetch();
        } catch (error) {
            toast.error(error?.data || error.message);
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800">{existingReview ? 'Edit Review' : 'Leave a Review'}</h2>
            <form onSubmit={submitReviewHandler} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-lg font-medium text-gray-700">Rating</label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value={0}>Select Rating</option>
                        <option value={1}>1 - Poor</option>
                        <option value={2}>2 - Fair</option>
                        <option value={3}>3 - Good</option>
                        <option value={4}>4 - Very Good</option>
                        <option value={5}>5 - Excellent</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-lg font-medium text-gray-700">Comment</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your review here..."
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                    {existingReview ? 'Update Review' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}
