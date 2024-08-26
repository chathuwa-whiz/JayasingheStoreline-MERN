import React from 'react';

function CODdetails() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2">Image</th>
            <th className="py-2">Product</th>
            <th className="py-2">Qty</th>
            <th className="py-2">Price</th>
            <th className="py-2">Total</th>
            <th className="py-2">Delivered</th>
            <th className="py-2">Paid</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-4"><img src="path-to-cushion-image.jpg" alt="Cushion Chair" className="w-16 h-16" /></td>
            <td className="py-4">Cushion Chair</td>
            <td className="py-4 text-center">3</td>
            <td className="py-4 text-right">8000.00</td>
            <td className="py-4 text-right">24000.00</td>
            <td className="py-4 text-center">
              <span className="bg-green-400 text-white px-2 py-1 rounded">COMPLETE</span>
            </td>
            <td className="py-4 text-center">
              <span className="bg-blue-400 text-white px-2 py-1 rounded">COMPLETE</span>
            </td>
            <td className="py-4 text-center">
              <button className="bg-pink-500 text-white px-3 py-1 rounded">VIEW DETAILS</button>
            </td>
          </tr>
          <tr>
            <td className="py-4"><img src="path-to-earbuds-image.jpg" alt="Wireless Earbud" className="w-16 h-16" /></td>
            <td className="py-4">Wireless Earbud</td>
            <td className="py-4 text-center">1</td>
            <td className="py-4 text-right">5000.00</td>
            <td className="py-4 text-right">5000.00</td>
            <td className="py-4 text-center">
              <span className="bg-red-400 text-white px-2 py-1 rounded">PENDING</span>
            </td>
            <td className="py-4 text-center">
              <span className="bg-blue-400 text-white px-2 py-1 rounded">COMPLETE</span>
            </td>
            <td className="py-4 text-center">
              <button className="bg-pink-500 text-white px-3 py-1 rounded">VIEW DETAILS</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CODdetails;
