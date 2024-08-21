import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function orderSummary() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

  const orderSummary = {
     itemsPrice: itemsPrice,
     shippingPrice: shippingPrice,
     taxPrice: taxPrice,
     totalPrice: totalPrice,
     shippingAddress: '1234 Main St, New York, NY 10001',
     paymentMethod: 'PayPal',
  };
  
    
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
                <th className="p-4">Price</th>
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
                  <td className="p-4">Rs.{item.sellingPrice.toFixed(2)}</td>
                  <td className="p-4">Rs.{(item.sellingPrice * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        {/* <div className="lg:w-1/3 mt-8 lg:mt-0 lg:ml-8">
          <div className="p-6 border rounded-lg bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between">
              <span>Items:</span>
              <span>${orderSummary.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Shipping:</span>
              <span>${orderSummary.shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Tax:</span>
              <span>${orderSummary.taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2 text-lg font-semibold">
              <span>Total:</span>
              <span>${orderSummary.totalPrice.toFixed(2)}</span>
            </div>
            <hr className="my-4" />
            <div>
              <h3 className="font-bold">Shipping</h3>
              <p>{orderSummary.shippingAddress}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-bold">Payment Method</h3>
              <p>{orderSummary.paymentMethod}</p>
            </div>
          </div>
          <button className="mt-6 w-full py-3 bg-orange-500 text-white text-lg font-bold rounded-lg hover:bg-pink-600 transition">
            Place Order
          </button>
        </div> */}
      </div>
    </div>
  )
}

