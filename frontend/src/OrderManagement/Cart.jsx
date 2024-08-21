import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const cart = useSelector((state) => state.cart);

    const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

    const { subTotal, total, discount} = cartItems.reduce((acc, item) => {
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
    

    return (
        <>
            <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
                {cartItems.length === 0 ? (
                    <div>Your cart is Empty <Link to={'/'}>Go Back</Link></div>
                ) : (
                    <>
                        <div className="w-full lg:w-2/3">
                            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                            <div className="mt-4">
                                {cartItems.map((item) => {
                                    // Calculate the new product price
                                    const newProductPrice = (item.sellingPrice - (item.sellingPrice * item.discount) / 100).toFixed(2);

                                    return (
                                        <div key={item._id} className="flex justify-between items-center border-b border-gray-300 py-2">
                                            <div className="flex items-center">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                                <div className="ml-4">
                                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                                    <p>Price: Rs.{newProductPrice}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <button onClick={() => dispatch(addToCart(item))} className="px-2 py-1 bg-gray-200 text-gray-800 mr-2">+</button>
                                                <span>{item.qty}</span>
                                                <button onClick={() => dispatch(removeFromCart(item._id))} className="px-2 py-1 bg-gray-200 text-gray-800 ml-2">-</button>
                                            </div>
                                            <div>
                                                <button onClick={() => dispatch(removeFromCart(item._id))} className="text-red-500"><FaTrash /></button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3">
                            <div className="border p-4 ml-[20px]">
                                <h2 className="text-xl font-semibold">Cart Summary</h2>
                                <div className="mt-4">
                                    <p>Subtotal: Rs.{subTotal}.00</p>
                                    <p>Discount: Rs.{discount}.00</p>
                                    <p>Total: Rs.{total}.00</p>
                                </div>
                                <div className="mt-4">
                                    <button onClick={() => navigate('/shipping')} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
