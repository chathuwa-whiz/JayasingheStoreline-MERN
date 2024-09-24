import React, { useState, useEffect } from "react";
import { FaBox, FaClock, FaCheck, FaExclamationCircle, FaDollarSign, FaListUl, FaTrash } from 'react-icons/fa';

export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState(0);
  const [completedDeliveries, setCompletedDeliveries] = useState(0);
  const [delayedDeliveries, setDelayedDeliveries] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0); // New state for total earnings
  const [totalDeliveredItems, setTotalDeliveredItems] = useState(0); // New state for total delivered items
  const [error, setError] = useState(null);

  const fetchDeliveries = async () => {
    try {
      const response = await fetch("/api/deliveries");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setDeliveries(data);

      const pending = data.filter(d => d.status === 'Pending').length;
      const completed = data.filter(d => d.status === 'Completed').length;
      const delayed = data.filter(d => d.status === 'Delayed').length;

      setPendingDeliveries(pending);
      setCompletedDeliveries(completed);
      setDelayedDeliveries(delayed);

      // Calculate total earnings and total delivered items
      const earnings = data.reduce((sum, delivery) => sum + (delivery.itemsPrice + delivery.deliveryPrice), 0);
      setTotalEarnings(earnings);

      const deliveredItems = data.reduce((sum, delivery) => sum + (delivery.itemsCount || 0), 0); // Assuming each delivery has an 'itemsCount'
      setTotalDeliveredItems(deliveredItems);

    } catch (error) {
      console.error("Error fetching deliveries:", error);
      setError(error.message);
    }
  };

  const deleteDelivery = async (id) => {
    try {
      await fetch(`/api/deliveries/${id}`, { method: 'DELETE' });
      setDeliveries(deliveries.filter(delivery => delivery._id !== id));
    } catch (error) {
      console.error("Error deleting delivery:", error);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 overflow-y-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, Yasith JY</h1>
        <p className="text-gray-500">Track and manage your deliveries efficiently</p>
      </header>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl flex items-center">
          <FaBox className="text-4xl text-green-500 mr-4" />
          <div>
            <h2 className="text-3xl font-semibold text-green-600">{deliveries.length}</h2>
            <p className="text-gray-600">Total Deliveries</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl flex items-center">
          <FaClock className="text-4xl text-yellow-500 mr-4" />
          <div>
            <h2 className="text-3xl font-semibold text-yellow-600">{pendingDeliveries}</h2>
            <p className="text-gray-600">Pending Deliveries</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl flex items-center">
          <FaCheck className="text-4xl text-blue-500 mr-4" />
          <div>
            <h2 className="text-3xl font-semibold text-blue-600">{completedDeliveries}</h2>
            <p className="text-gray-600">Completed Deliveries</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl flex items-center">
          <FaExclamationCircle className="text-4xl text-red-500 mr-4" />
          <div>
            <h2 className="text-3xl font-semibold text-red-600">{delayedDeliveries}</h2>
            <p className="text-gray-600">Delayed Deliveries</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl flex items-center">
          <FaDollarSign className="text-4xl text-green-500 mr-4" />
          <div>
            <h2 className="text-3xl font-semibold text-green-600">{totalEarnings.toFixed(2)}</h2>
            <p className="text-gray-600">Total Delivery Earnings</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl flex items-center">
          <FaListUl className="text-4xl text-blue-500 mr-4" />
          <div>
            <h2 className="text-3xl font-semibold text-blue-600">{totalDeliveredItems}</h2>
            <p className="text-gray-600">Total Delivered Items</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Deliveries</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b-2 border-gray-300">
              <th className="px-4 py-2">Delivery Item</th>
              <th className="px-4 py-2">Items Price</th>
              <th className="px-4 py-2">Delivery Price</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.slice(0, 5).map(delivery => (
              <tr key={delivery._id} className="hover:bg-gray-100 transition-colors">
                <td className="border px-4 py-2">{delivery.itemName || 'N/A'}</td>
                <td className="border px-4 py-2">{delivery.itemsPrice ? delivery.itemsPrice.toFixed(2) : '0.00'}</td>
                <td className="border px-4 py-2">{delivery.deliveryPrice ? delivery.deliveryPrice.toFixed(2) : '0.00'}</td>
                <td className="border px-4 py-2">{(delivery.itemsPrice + delivery.deliveryPrice).toFixed(2)}</td>
                <td className="border px-4 py-2 text-center">
                  <button onClick={() => deleteDelivery(delivery._id)} className="text-red-500 hover:text-red-700 transition-colors">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
