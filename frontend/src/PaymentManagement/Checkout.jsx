import React, { useState, useEffect } from 'react';

export default function Checkout() {

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch the total price from the database
    const fetchTotalPrice = async () => {
      try {
        // Replace with your API call or database query
        const response = await fetch('/api/getTotalPrice'); // Example API endpoint
        const data = await response.json();
        setTotalAmount(data.totalPrice); // Assuming the total price is in data.totalPrice
      } catch (error) {
        console.error('Error fetching total price:', error);
      }
    };

    fetchTotalPrice();
  }, []);

  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-purple-300 flex flex-col">
      {/* <header className="py-4 bg-blue-600 text-white text-center">
        <h1 className="text-3xl font-semibold">Checkout</h1>
      </header> */}

      <div className="flex justify-center items-start h-full py-8 flex-grow">
        <div className="w-2/3 max-w-lg p-6 bg-white shadow-md rounded-md mr-4">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Select Payment Method</h2>
          <div className="flex justify-between mb-4">
            {/* Credit/Debit Card Option */}
            <div
              className={`flex flex-col items-center p-4 cursor-pointer border rounded-md 
              ${selectedPaymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
              onClick={() => handlePaymentSelection('card')}
            >
              <div className="text-blue-500 text-3xl">💳</div>
              <span className="mt-2 font-medium">Credit/Debit Card</span>
            </div>

            {/* Cash On Delivery Option */}
            <div
              className={`flex flex-col items-center p-4 cursor-pointer border rounded-md 
              ${selectedPaymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
              onClick={() => handlePaymentSelection('cod')}
            >
              <div className="text-blue-500 text-3xl">💵</div>
              <span className="mt-2 font-medium">Cash On Delivery</span>
            </div>
          </div>

          {/* Card Payment Details Form */}
          {selectedPaymentMethod === 'card' && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Card Details</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Card number</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Card number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name on card</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Name on card"
                />
              </div>
              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Expiration date</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="CVV"
                  />
                </div>
              </div>
              <a href="success" className="w-full">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-md hover:from-blue-600 hover:to-purple-600 focus:outline-none">
                  Pay Now
                </button>
              </a>
            </div>
          )}

          {/* Cash On Delivery Details */}
          {selectedPaymentMethod === 'cod' && (
            <div className="border rounded-md p-4 bg-blue-50">
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>You may pay in cash to our courier upon receiving your parcel at the doorstep.</li>
                <li>Before agreeing to receive the parcel, check if your delivery status has been updated to 'Out for Delivery'.</li>
                <li>Before receiving, confirm that the airway bill shows that the parcel is from Daraz.</li>
                <li>Before you make payment to the courier, confirm your order number, sender information, and tracking number on the parcel.</li>
              </ul>
              <div className="flex justify-between mt-4 text-blue-600">
                <span className="font-medium">Total Amount:</span>
                <span className="text-blue-800 font-semibold">Rs. {totalAmount}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 mt-4 rounded-md hover:from-blue-600 hover:to-purple-600 focus:outline-none">
                Confirm Order
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-1/3 bg-white shadow-md rounded-md p-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Subtotal</span>
            <span className="text-gray-900">Rs. {totalAmount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Shipping</span>
            <span className="text-gray-900">Included</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between mt-4">
            <span className="font-medium text-gray-900">Total Amount</span>
            <span className="text-orange-500 text-xl font-semibold">Rs. {totalAmount}</span>
          </div>
        </div>
      </div>

      {/* <footer className="py-4 bg-blue-600 text-white text-center w-full fixed bottom-0">
        <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
      </footer> */}
    </div>
  );
}