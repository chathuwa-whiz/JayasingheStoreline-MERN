import React from 'react';

export default function () {
  return (
    <>
    <div className="min-h-screen bg-gray-100 pt-16 pl-64 pr- pb-4 h-[calc(100vh-4rem)] overflow-y-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Dulangi Tharusha</h1>
        <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipiscing</p>
      </header>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">400</h2>
          <p className="text-lg">Total Supplier</p>
          <p className="text-green-600">+10% +2.0k this week</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">240</h2>
          <p className="text-lg">Total Suppliyer Order</p>
          <p className="text-yellow-600">+18% +2.8k this week</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">6.534</h2>
          <p className="text-lg">Total Purchase</p>
          <p className="text-blue-600">+18% +7.8k this week</p>
        </div>
        
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Inventory Notification</h3>
          <div className="relative h-64">
            {/* Insert chart component or image here */}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Supplier Achievement</h3>
          <div className="relative h-64">
            {/* Insert chart component or image here */}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
