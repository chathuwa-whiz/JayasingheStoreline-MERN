import React from 'react';

export default function OrderSummary() {
  const cartItems = [
    {
      id: 1,
      name: 'Fujifilm X-H2S Mirrorless Camera',
      image: 'https://via.placeholder.com/50',
      price: 249.00,
      quantity: 1,
    },
    {
      id: 2,
      name: "Skechers Sport Men's Vigor 2.0",
      image: 'https://via.placeholder.com/50',
      price: 34.97,
      quantity: 1,
    },
    {
      id: 3,
      name: 'Apple 2023 MacBook Air Laptop',
      image: 'https://via.placeholder.com/50',
      price: 21.00,
      quantity: 1,
    },
    {
      id: 4,
      name: 'Clean Desktop',
      image: 'https://via.placeholder.com/50',
      price: 61.00,
      quantity: 1,
    },
  ];

  const orderSummary = {
    itemsPrice: 643985.90,
    shippingPrice: 0.00,
    taxPrice: 97407.88,
    totalPrice: 746793.78,
    shippingAddress: 'USA, USA 412, USA',
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
                  <td className="p-4 text-center">{item.quantity}</td>
                  <td className="p-4">${item.price.toFixed(2)}</td>
                  <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 mt-8 lg:mt-0 lg:ml-8">
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
        </div>
      </div>
    </div>
  );
}