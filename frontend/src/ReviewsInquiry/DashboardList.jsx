import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAllProductsQuery } from '../redux/api/productApiSlice';
import Sidebar from './SideNavbar'; // Import Sidebar component

export default function DashboardList() {
    const navigate = useNavigate(); // Initialize navigate
    const { data: products, isLoading, isError } = useAllProductsQuery();

    if (isLoading) return <div className="text-center p-4">Loading...</div>;
    if (isError) return <div className="text-center p-4 text-red-500">Something went wrong</div>;

    // Helper function to count new inquiries within the last day
    const getNewInquiriesCount = (inquiries) => {
        const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
        const now = new Date();
        return inquiries.filter(inquiry => (now - new Date(inquiry.createdAt)) < oneDay).length;
    };

    // Helper function to count new reviews within the last day
    const getNewReviewsCount = (reviews) => {
        const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
        const now = new Date();
        return reviews.filter(review => (now - new Date(review.createdAt)) < oneDay).length;
    };

    const handleProductClick = (productId) => {
        navigate(`/dashboard/product/${productId}`); // Navigate to the SingleProductView
    };

    return (
        <div className="flex">
            {/* Sidebar on the left */}
            <div className="w-1/5 bg-gray-100 min-h-screen">
                <Sidebar />
            </div>

            {/* Main content on the right */}
            <div className="w-4/5 p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => {
                        // Count new reviews and inquiries from the last day
                        const newReviewsCount = getNewReviewsCount(product.reviews);
                        const newInquiriesCount = getNewInquiriesCount(product.inquiries);

                        return (
                            <div key={product._id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                                <div onClick={() => handleProductClick(product._id)} style={{ cursor: 'pointer' }}>
                                    <div className="relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-48 object-cover rounded-md mb-4"
                                        />
                                        <div className="absolute top-2 right-2 bg-blue-600 text-white text-sm px-2 py-1 rounded-full shadow-lg">
                                            {product.numInquiries || 0} Inquiries
                                        </div>
                                        <div className="absolute top-2 left-2 bg-green-600 text-white text-sm px-2 py-1 rounded-full shadow-lg">
                                            {product.numReviews || 0} Reviews
                                        </div>
                                        {newInquiriesCount > 0 && (
                                            <div className="absolute bottom-2 left-2 bg-red-600 text-white text-sm px-2 py-1 rounded-full shadow-lg">
                                                {newInquiriesCount} New Inquiries
                                            </div>
                                        )}
                                        {newReviewsCount > 0 && (
                                            <div className="absolute bottom-2 right-2 bg-yellow-600 text-white text-sm px-2 py-1 rounded-full shadow-lg">
                                                {newReviewsCount} New Reviews
                                            </div>
                                        )}
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
