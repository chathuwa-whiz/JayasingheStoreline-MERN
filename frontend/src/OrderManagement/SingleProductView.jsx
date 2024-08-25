import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/api/productApiSlice";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { addToCart } from "../redux/features/cart/cartSlice";

export default function SingleProductView() {

    const params = useParams();
    const { data: productData } = useGetProductByIdQuery(params._id);
    
    const [image, setImage] = useState(productData?.image);
    const [name, setName] = useState(productData?.name || '');
    const [description, setDescription] = useState(productData?.description || '');
    const [sellingPrice, setSellingPrice] = useState(productData?.sellingPrice || 0);
    const [discount, setDiscount] = useState(productData?.discount || 0);
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState(productData?.quantity || 0);
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name);
            setDescription(productData.description);
            setSellingPrice(productData.sellingPrice);
            setDiscount(productData.discount);
            setCategory(productData.category);
            setQuantity(productData.countInStock);
            setImage(productData.image);
        }
    }, [productData]);

    const newProductPrice = (sellingPrice - (sellingPrice * discount) / 100).toFixed(2);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...productData, qty }));
        navigate('/cart');
    }

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
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
                    <p className="text-lg text-gray-600 mb-2">Category: <span className="font-semibold text-gray-700">{category}</span></p>
                    
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

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-700">Product Specifications</h2>
                        <ul className="mt-2 text-gray-600 list-disc list-inside">
                            <li>Feature 1: Lorem ipsum dolor sit amet</li>
                            <li>Feature 2: Consectetur adipiscing elit</li>
                            <li>Feature 3: Sed do eiusmod tempor incididunt</li>
                        </ul>
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
        </div>
    )
}
