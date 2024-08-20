import React from 'react';

export default function DeliveryDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 overflow-y-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Yasith JY</h1>
        <p className="text-gray-500">Track and manage your deliveries effectively</p>
      </header>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">120</h2>
          <p className="text-lg">Total Deliveries</p>
          <p className="text-green-600">+12% this week</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">15</h2>
          <p className="text-lg">Pending Deliveries</p>
          <p className="text-yellow-600">-5% this week</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">30</h2>
          <p className="text-lg">Completed Deliveries</p>
          <p className="text-blue-600">+8% this week</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">5</h2>
          <p className="text-lg">Delayed Deliveries</p>
          <p className="text-red-600">+10% this week</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Delivery Stats</h3>
          <div className="relative h-64">
            {/* Insert delivery stats chart component or image here */}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Delivery by Region</h3>
          <div className="relative h-64">
            {/* Insert delivery by region chart component or image here */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Upcoming Deliveries</h3>
          <ul className="space-y-4">
            <li className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">Order #1234</p>
              <p className="text-gray-500">Scheduled for: 20th August 2024</p>
            </li>
            <li className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">Order #5678</p>
              <p className="text-gray-500">Scheduled for: 22nd August 2024</p>
            </li>
            <li className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">Order #91011</p>
              <p className="text-gray-500">Scheduled for: 25th August 2024</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
