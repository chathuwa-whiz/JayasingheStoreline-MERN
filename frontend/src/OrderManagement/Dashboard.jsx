import React from 'react';

export default function () {
  return (
    <>
    <div className="overflow-auto bg-gray-100 p-5 rounded-lg">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Vidumini Chalanika</h1>
        {/* <p className="text-gray-500">View your order details here</p>*/}
      </header>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">890</h2>
          <p className="text-lg">Total Orders</p>
          <p className="text-green-600">+18% +3.8k this week</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">123</h2>
          <p className="text-lg">Total Products</p>
          <p className="text-yellow-600">+18% +2.8k this week</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">567</h2>
          <p className="text-lg">Completed Orders</p>
          <p className="text-blue-600">+18% +7.8k this week</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">123</h2>
          <p className="text-lg">Pending Orders</p>
          <p className="text-red-600">+18% +1.2k this week</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Revenue Stats</h3>
          <div className="relative h-64">
            {/* Insert chart component or image here */}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Orders by Category</h3>
          <div className="relative h-64">
            {/* Insert chart component or image here */}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
