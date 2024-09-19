import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function OrderSummary() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;  

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-900">Order Summary</h1>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
          <table className="min-w-full bg-white border-separate" style={{ borderSpacing: '0 15px' }}>
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-4 rounded-tl-lg">Image</th>
                <th className="p-4">Product</th>
                <th className="p-4 text-center">Quantity</th>
                <th className="p-4">Unit Price</th>
                <th className="p-4 rounded-tr-lg">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="bg-white border-b border-gray-200 hover:bg-gray-100 transition-all">
                  <td className="p-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg shadow-md" />
                  </td>
                  <td className="p-4 font-semibold text-gray-800">{item.name}</td>
                  <td className="p-4 text-center font-semibold">{item.qty}</td>
                  <td className="p-4 font-semibold text-gray-800">Rs.{item.newProductPrice.toFixed(2)}</td>
                  <td className="p-4 font-semibold text-gray-800">Rs.{(item.newProductPrice * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-900">Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Items Price:</span>
              <span className="font-semibold text-gray-800">Rs.{cart.itemsPriceSum}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Delivery Price:</span>
              <span className="font-semibold text-gray-800">Rs.{cart.deliveryPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Discount:</span>
              <span className="font-semibold text-gray-800">Rs.{cart.totalDiscount}</span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-4">
              <span className="font-bold text-xl text-blue-900">Total Price:</span>
              <span className="font-bold text-xl text-blue-900">Rs.{cart.totalPriceSum}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-blue-900 text-white font-semibold py-3 px-4 mt-6 w-full rounded-lg hover:bg-blue-800 transition-all duration-200"
          >
            Proceed to Checkout
          </button>
          <Link
            to="/cart"
            className="block bg-gray-100 text-blue-900 font-semibold py-3 px-4 mt-4 w-full rounded-lg hover:bg-gray-200 transition-all duration-200 text-center"
          >
            Edit Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
