import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const cart = useSelector((state) => state.cart);

    const { cartItems } = cart;
    
    const { subTotal, total, discount } = cartItems.reduce((acc, item) => {
        return {
            subTotal: acc.subTotal + item.qty * item.sellingPrice,
            total: acc.total + item.qty * item.sellingPrice - (item.sellingPrice * item.discount) / 100,
            discount: acc.discount + (item.sellingPrice * item.discount) / 100,
        }
    }, {
        subTotal: 0,
        total: 0,
        discount: 0,
    });

    const proceedToCheckout = () => {
        navigate('/shipping');
    };

    const decreaseQty = (item) => {
        if (item.qty > 1) {
            dispatch(removeFromCart(item._id));
        } else {
            dispatch(removeFromCart(item._id));
        }
    };

    return (
        <div className="container mx-auto p-4">
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-600 text-lg font-medium">
                    Your cart is empty. <Link to="/" className="text-blue-500 hover:underline">Go Back</Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
                        <div>
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between items-center border-b py-4">
                                    <div className="flex items-center w-full lg:w-3/5">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-sm" />
                                        <div className="ml-4 flex-grow">
                                            <h2 className="text-lg font-semibold text-gray-700 truncate">{item.name}</h2>
                                            <p className="text-gray-500">Price: Rs.{item.newProductPrice}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end w-1/4">
                                        <button onClick={() => dispatch(addToCart(item))} className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition">+</button>
                                        <span className="mx-2 text-gray-700">{item.qty}</span>
                                        <button onClick={() => decreaseQty(item)} className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition">-</button>
                                    </div>
                                    <div className="flex items-center justify-end w-1/12">
                                        <button onClick={() => dispatch(removeFromCart(item._id))} className="text-red-500 hover:text-red-700 transition"><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-6 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800">Cart Summary</h2>
                        <div className="mt-6">
                            <p className="text-gray-700 mb-2">Subtotal: <span className="font-semibold">Rs.{subTotal}.00</span></p>
                            <p className="text-gray-700 mb-2">Discount: <span className="font-semibold">Rs.{discount}.00</span></p>
                            <p className="text-gray-700 mb-4">Total: <span className="font-semibold">Rs.{total}.00</span></p>
                        </div>
                        <button 
                            onClick={proceedToCheckout} 
                            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow-md transition focus:outline-none focus:shadow-outline">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
