import React from 'react';

export default function Dashboard() {
  return (
    <>
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Welcome back, Vidumini Chalanika</h1>
            <p className="text-lg text-gray-500 mt-2">Here's a summary of your store's performance</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
            View Full Report
          </button>
        </header>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="bg-green-100 p-6 rounded-lg text-center shadow-md">
            <h2 className="text-5xl font-bold text-green-600">890</h2>
            <p className="text-xl text-gray-600">Total Orders</p>
            <p className="text-green-600 mt-2">+18% +3.8k this week</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg text-center shadow-md">
            <h2 className="text-5xl font-bold text-yellow-600">123</h2>
            <p className="text-xl text-gray-600">Total Products</p>
            <p className="text-yellow-600 mt-2">+18% +2.8k this week</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg text-center shadow-md">
            <h2 className="text-5xl font-bold text-blue-600">567</h2>
            <p className="text-xl text-gray-600">Completed Orders</p>
            <p className="text-blue-600 mt-2">+18% +7.8k this week</p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg text-center shadow-md">
            <h2 className="text-5xl font-bold text-red-600">123</h2>
            <p className="text-xl text-gray-600">Pending Orders</p>
            <p className="text-red-600 mt-2">+18% +1.2k this week</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Revenue Stats</h3>
            <div className="relative h-64">
              {/* Replace the image with an actual chart component */}
              <img src="https://via.placeholder.com/300x200" alt="Revenue Stats Chart" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Orders by Category</h3>
            <div className="relative h-64">
              {/* Replace the image with an actual chart component */}
              <img src="https://via.placeholder.com/300x200" alt="Orders by Category Chart" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-12 text-center text-gray-600">
          <p>&copy; 2024 Jayasinghe Storeline. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
