import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function OrderSummary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

  console.log(cart);
  

  return (
    <div className="bg-white text-black min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Order Summary</h1>
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-200 text-left">
                <th className="p-4">Image</th>
                <th className="p-4">Product</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Unit Price</th>
                <th className="p-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
                  </td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4 text-center">{item.qty}</td>
                  <td className="p-4">Rs.{item.newProductPrice.toFixed(2)}</td>
                  <td className="p-4">Rs.{(item.newProductPrice * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 sm:mt-5 bg-gray-100 p-6 rounded-lg ml-3">
          <h2 className="text-2xl font-bold mb-6">Summary</h2>
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Items Price:</span>
            <span>Rs.{cart.itemsPriceSum}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Delivery Price:</span>
            <span>Rs.{cart.deliveryPrice}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Discount:</span>
            <span>Rs.{cart.totalDiscount}</span>
          </div>
          <div className="flex justify-between mb-4 border-t pt-4">
            <span className="font-bold text-xl">Total Price:</span>
            <span className="font-bold text-xl">Rs.{cart.totalPriceSum}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-orange-500 text-white font-semibold py-2 px-4 mt-6 w-full rounded hover:bg-orange-600 transition duration-200"
          >
            Proceed to Checkout
          </button>
          <Link to="/cart" className="block text-center mt-4 text-blue-500 hover:underline">
            Edit Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
