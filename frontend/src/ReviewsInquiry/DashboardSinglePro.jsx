import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery, useCreateReviewMutation, useCreateInquiryMutation, useDeleteReviewMutation, useDeleteInquiryMutation } from "../redux/api/productApiSlice";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import ReviewForm from '../ReviewsInquiry/ReviewForm';
import Sidebar from './SideNavbar'; // Import Sidebar component

export default function DashboardSinglePro() {
    const { _id: productId } = useParams();
    const { data: productData, isLoading, isError, refetch } = useGetProductByIdQuery(productId);
    const user = useSelector((state) => state.auth.userInfo);

    console.log("User : ", user);
    console.log("Product Data : ", productData);

    const [image, setImage] = useState(productData?.image);
    const [name, setName] = useState(productData?.name || '');
    const [description, setDescription] = useState(productData?.description || '');
    const [sellingPrice, setSellingPrice] = useState(productData?.sellingPrice || 0);
    const [discount, setDiscount] = useState(productData?.discount || 0);
    const [category, setCategory] = useState(productData?.category || '');
    const [quantity, setQuantity] = useState(productData?.quantity || 0);
    const [qty, setQty] = useState(1);
    const [messagee, setMessagee] = useState('');

    // Initialize the mutation hooks
    const [deleteReview] = useDeleteReviewMutation();
    const [deleteInquiry] = useDeleteInquiryMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (productData) {
            setName(productData.name);
            setDescription(productData.description);
            setSellingPrice(productData.sellingPrice);
            setDiscount(productData.discount);
            setCategory(productData.category);
            setQuantity(productData.countInStock);
            setImage(productData.image);
        }
    }, [productData, dispatch, navigate]);

    const newProductPrice = (sellingPrice - (sellingPrice * discount) / 100).toFixed(2);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...productData, qty }));
        navigate('/cart');
    };

    const [createReview] = useCreateReviewMutation();
    const [createInquiry] = useCreateInquiryMutation();

    const submitInquiryHandler = async (e) => {
        e.preventDefault();
        if (!messagee.trim()) {
            toast.error("Please enter your inquiry message.");
            return;
        }

        try {
            await createInquiry({ productId, messagee }).unwrap();
            refetch();
            toast.success("Inquiry submitted successfully!");
            setMessagee('');
        } catch (error) {
            toast.error(error?.data || error.message);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await deleteReview({ productId, reviewId }).unwrap();
                refetch(); // Refresh the product data after deletion
                toast.success("Review deleted successfully!");
            } catch (error) {
                toast.error(error?.data || error.message);
            }
        }
    };

    const handleDeleteInquiry = async (inquiryId) => {
        if (window.confirm("Are you sure you want to delete this inquiry?")) {
            try {
                await deleteInquiry({ productId, inquiryId }).unwrap(); // Ensure unwrap is used
                refetch(); // Refetch inquiries to update the state
                toast.success("Inquiry deleted successfully!");
            } catch (error) {
                toast.error(error?.data || error.message); // Handle error
            }
        }
    };
    

    // Average Rating Calculation
    const averageRating = productData?.reviews?.length
        ? (productData.reviews.reduce((acc, review) => acc + review.rating, 0) / productData.reviews.length).toFixed(1)
        : 0;

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {Array(fullStars).fill('★').map((star, index) => (
                    <span key={index} className="text-yellow-400">{star}</span>
                ))}
                {halfStar && <span className="text-yellow-400">½</span>}
                {Array(emptyStars).fill('☆').map((star, index) => (
                    <span key={index + fullStars} className="text-gray-300">{star}</span>
                ))}
            </>
        );
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar /> 
            
            {/* Main content */}
            <div className="flex-grow p-6 bg-white rounded-lg shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="flex justify-center">
                        <img
                            src={image}
                            alt="Product"
                            className="w-full h-full object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        />
                    </div>

                    {/* Product Details */}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{name}</h1>
                        <p className="text-lg text-gray-600 mb-2">
                            Category: <span className="font-semibold text-gray-700">{category}</span>
                        </p>

                        <div className="mt-4">
                            <p className="text-3xl font-semibold text-gray-900">Rs. {newProductPrice}.00</p>
                            <p className="mt-2 text-lg text-gray-500 line-through">Rs. {sellingPrice}.00</p>
                            <p className="mt-1 text-md text-green-600">Discount: {discount}% Off</p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-700">Description</h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                {description || "No description available for this product."}
                            </p>
                        </div>

                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-gray-700">Average Rating</h2>
                            <div className="flex items-center mt-2 text-3xl">
                                {renderStars(averageRating)}
                                <span className="ml-2 text-gray-600 text-2xl">({averageRating} out of 5)</span>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center space-x-4">
                            <input
                                type="number"
                                min="1"
                                max={quantity}
                                className="w-16 p-2 border rounded-lg text-center focus:ring-2 focus:ring-blue-500"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                            />
                            <button 
                                onClick={addToCartHandler}
                                disabled={quantity === 0}
                                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition">
                                Add to Cart
                            </button>
                        </div>

                        {quantity === 0 && (
                            <p className="mt-4 text-red-500">This product is currently out of stock.</p>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-800">Product Reviews</h2>
                    {productData?.reviews && productData.reviews.length > 0 ? (
                        productData.reviews.map((review) => (
                            <div key={review._id} className="mt-4 p-4 border rounded-lg shadow-sm bg-gray-50">
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold">{review.name}</p>
                                    <p className="ml-4 text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="mt-2 flex items-center">
                                    <div className="text-yellow-400">
                                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                    </div>
                                    <p className="ml-2 text-gray-700">{review.comment}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteReview(review._id)}
                                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition mt-2">
                                    Delete Review
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="mt-4 text-gray-600">No reviews yet.</p>
                    )}

                    {/* Add Review Form */}
                    {user && <ReviewForm productId={productId} />}
                </div>

                {/* Inquiry Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-800">Product Inquiries</h2>
                    <form onSubmit={submitInquiryHandler} className="mt-4">
                        <textarea
                            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="5"
                            value={messagee}
                            onChange={(e) => setMessagee(e.target.value)}
                            placeholder="Ask about this product..."
                        />
                        <button
                            type="submit"
                            className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition mt-4">
                            Submit Inquiry
                        </button>
                    </form>

                    {productData?.inquiries && productData.inquiries.length > 0 ? (
                        productData.inquiries.map((inquiry) => (
                            <div key={inquiry._id} className="mt-4 p-4 border rounded-lg shadow-sm bg-gray-50">
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold">{inquiry.name}</p>
                                    <p className="ml-4 text-sm text-gray-500">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                                </div>
                                <p className="mt-2 text-gray-700">{inquiry.message}</p>
                                <button
                                    onClick={() => handleDeleteInquiry(inquiry._id)}
                                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition mt-2">
                                    Delete Inquiry
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="mt-4 text-gray-600">No inquiries yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
