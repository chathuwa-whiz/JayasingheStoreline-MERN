import React, { useState, useEffect } from "react";
import AddDelivery from "./AddDelivery";
import DeliveryDetail from "./DeliveryDetail";

export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);

  // Fetch deliveries from the server
  const fetchDeliveries = async () => {
    try {
      const response = await fetch("/api/deliveries");
      const data = await response.json();
      setDeliveries(data);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 overflow-y-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Yasith JY</h1>
        <p className="text-gray-500">Track and manage your deliveries effectively</p>
      </header>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">{deliveries.length}</h2>
          <p className="text-lg">Total Deliveries</p>
          {/* Replace the static value with dynamic */}
          <p className="text-green-600">+12% this week</p>
        </div>
        {/* Repeat similar sections for Pending, Completed, and Delayed deliveries */}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Add New Delivery</h3>
          {/* Render AddDelivery component */}
          <AddDelivery refreshDeliveries={fetchDeliveries} />
        </div>

        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Delivery Stats</h3>
          <div className="relative h-64">
            {/* You can insert a chart component or image representing stats */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Upcoming Deliveries</h3>
          {/* Render the list of upcoming deliveries */}
          <DeliveryDetail deliveries={deliveries} refreshDeliveries={fetchDeliveries} />
        </div>
      </div>
    </div>
  );
}
