import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductQuery } from '../redux/api/productApiSlice'; // Adjust import if necessary

export default function DashboardSinglePro() {
    const { id } = useParams();
    const { data: product, isLoading, isError } = useProductQuery(id);

    if (isLoading) return <div className="text-center p-4">Loading...</div>;
    if (isError) return <div className="text-center p-4 text-red-500">Something went wrong</div>;

    return (
        <div className="p-8">
            <div className="border rounded-lg p-4 shadow-lg bg-white">
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Inquiries:</h3>
                    {product.inquiries.length === 0 ? (
                        <p>No inquiries yet.</p>
                    ) : (
                        <ul>
                            {product.inquiries.map(inquiry => (
                                <li key={inquiry._id} className="border-b py-2">
                                    <p className="font-semibold">{inquiry.name}</p>
                                    <p>{inquiry.messagee}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Reviews:</h3>
                    {product.reviews.length === 0 ? (
                        <p>No reviews yet.</p>
                    ) : (
                        <ul>
                            {product.reviews.map(review => (
                                <li key={review._id} className="border-b py-2">
                                    <p className="font-semibold">{review.name} - Rating: {review.rating}</p>
                                    <p>{review.comment}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
