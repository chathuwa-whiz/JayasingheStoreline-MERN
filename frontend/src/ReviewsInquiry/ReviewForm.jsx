import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import { FaStar } from 'react-icons/fa'; // Font Awesome star icon

export default function ReviewForm({ productId, refetch, existingReview }) {
    const [rating, setRating] = useState(existingReview ? existingReview.rating : 0);
    const [comment, setComment] = useState(existingReview ? existingReview.comment : '');
    const [email, setEmail] = useState(existingReview ? existingReview.email : ''); // Email remains optional
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [hover, setHover] = useState(null);
    const [imageSizeError, setImageSizeError] = useState(false); // State to track image size error

    useEffect(() => {
        if (existingReview) {
            setRating(existingReview.rating);
            setComment(existingReview.comment);
            setEmail(existingReview.email || ''); // Set existing email or empty
            if (existingReview.image) {
                setImagePreview(existingReview.image);
            }
        }
    }, [existingReview]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check if file size exceeds 2MB
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image size must not exceed 2MB.");
                setImageSizeError(true); // Set error state
                return; // Exit the function if the size exceeds
            } else {
                setImageSizeError(false); // Reset error state
            }

            // Create an object URL to preview the image
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
            setImage(file);
        }
    };

    const handleCancelImage = () => {
        setImage(null);
        setImagePreview(null);
        // Reset the file input to clear selected file
        const fileInput = document.getElementById('image');
        if (fileInput) {
            fileInput.value = ''; // Clear the file input
        }
    };

    const submitReviewHandler = async (e) => {
        e.preventDefault();
        
        // Prevent submission if there is an image size error
        if (imageSizeError) {
            toast.error("Please upload a valid image (less than 2MB).");
            return;
        }

        // Front-end validation for comment length
        if (comment.length > 50) {
            toast.error("Comment must not exceed 50 characters.");
            return;
        }

        if (rating < 1 || rating > 5) {
            toast.error("Please select a rating between 1 and 5 stars.");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please add a comment.");
            return;
        }

        // Validate email format if provided
        if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please provide a valid email address.");
            return;
        }

        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('email', email); // Use email field, even if empty
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`/api/products/${productId}/reviews`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to submit review");
            }

            toast.success("Review submitted successfully!");
            refetch();
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review. Please try again.");
        }
    };
    
    return (
        <div className="max-w-2xl mx-auto bg-blue-50 p-8 rounded-lg shadow-md mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {existingReview ? 'Edit Review' : 'Leave a Review'}
            </h2>
            <form onSubmit={submitReviewHandler} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
                        Email (optional)
                    </label>
                    <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email address (optional)"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700">Rating</label>
                    <div className="flex space-x-1">
                        {Array(5)
                            .fill()
                            .map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            className="hidden"
                                            onClick={() => setRating(ratingValue)}
                                        />
                                        <FaStar
                                            size={30}
                                            className={`cursor-pointer transition-colors duration-200 ${
                                                ratingValue <= (hover || rating)
                                                    ? "text-yellow-500"
                                                    : "text-gray-300"
                                            }`}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                );
                            })}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="comment" className="block text-lg font-semibold text-gray-700">
                        Comment
                    </label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        maxLength="50"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your review here..."
                    ></textarea>
                    <p className="text-sm text-gray-600">{50 - comment.length} characters remaining</p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="image" className="block text-lg font-semibold text-gray-700">
                        Upload Image (optional)
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {imagePreview && (
                    <div className="mt-4">
                        <p className="text-lg font-semibold text-gray-700">Image Preview:</p>
                        <img
                            src={imagePreview}
                            alt="Review"
                            className="max-w-full h-auto rounded-lg shadow-md mt-2"
                        />
                        <button
                            type="button"
                            onClick={handleCancelImage}
                            className="mt-2 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition"
                        >
                            Cancel Image
                        </button>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                >
                    {existingReview ? 'Update Review' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}
