import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../redux/api/productApiSlice';
import ReviewForm from './ReviewForm';

const ReviewsPage = () => {
    const { productId } = useParams();
    const { data: productData, isLoading, isError, error } = useGetProductByIdQuery(productId);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (productData && productData.reviews) {
            setReviews(productData.reviews);
        }
    }, [productData]);

    const handleReviewSubmit = (newReview) => {
        // Assuming the API handles review submission correctly
        setReviews((prevReviews) => [...prevReviews, newReview]);
    };

    if (isLoading) return <p>Loading...</p>;
    
    if (isError) {
        console.error('Error fetching product data:', error); // Log the error to the console
        return <p>Error loading product reviews: {error?.message || 'Something went wrong.'}</p>;
    }

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{productData?.name} - Reviews</h1>

            <div className="space-y-6">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg font-semibold text-gray-800">{review.name}</p>
                                <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <div className="text-yellow-400">
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-800">Leave a Review</h2>
                <ReviewForm onSubmit={handleReviewSubmit} />
            </div>
        </div>
    );
};

export default ReviewsPage;
