import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function DeliveryDetail({ onEditDelivery }) {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await fetch('/api/deliveries');
      const data = await response.json();
      setDeliveries(data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/deliveries/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete delivery.");
      }
      setDeliveries(deliveries.filter((delivery) => delivery._id !== id));
    } catch (error) {
      console.error('Error deleting delivery:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(`/api/deliveries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update delivery status.");
      }
      setDeliveries(deliveries.map((delivery) => 
        delivery._id === id ? { ...delivery, status } : delivery
      ));
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  const getRowClass = (status) => {
    switch (status) {
      case 'Delayed':
        return 'bg-blue-50 border-blue-300 text-blue-700'; // Light blue for delayed
      case 'Completed':
        return 'bg-green-50 border-green-300 text-green-700'; // Light green for completed
      default:
        return 'bg-white border-gray-300 text-gray-700'; // White for pending
    }
  };

  return (
    <div className="shadow-lg rounded-lg p-6 bg-gray-100 h-screen overflow-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Deliveries</h1>

      <input 
        type="text" 
        placeholder="Search Deliveries" 
        className="p-3 border border-gray-300 rounded-lg mb-6 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
      />

      <table className="w-full bg-white shadow-lg rounded-lg border border-gray-300">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="border p-3 text-left">ID</th>
            <th className="border p-3 text-left">Delivery Item</th>
            <th className="border p-3 text-left">Items Price</th>
            <th className="border p-3 text-left">Delivery Price</th>
            <th className="border p-3 text-left">Total Price</th>
            <th className="border p-3 text-left">Driver</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id} className={`border-b ${getRowClass(delivery.status)} hover:bg-orange-100 transition-colors duration-300`}>
              <td className="border p-3">{delivery._id}</td>
              <td className="border p-3">
                {
                  <td className="py-2 px-4">
                    {JSON.parse(delivery.deliveryItem).map((item) => (
                      <div key={item._id}>
                        <p>{item.name} x {item.qty}</p>
                      </div>
                    ))}
                  </td>
                }
              </td>
              <td className="border p-3">{delivery.itemsPrice} LKR</td>
              <td className="border p-3">{delivery.deliveryPrice} LKR</td>
              <td className="border p-3">{delivery.totalPrice} LKR</td>
              <td className="border p-3">{delivery.driver}</td>
              <td className="border p-3">{delivery.status || 'Pending'}</td>
              <td className="border p-3 flex space-x-2">
                <button
                  className="p-2 text-yellow-500 hover:bg-yellow-100 rounded-lg transition-colors duration-300"
                  onClick={() => handleStatusChange(delivery._id, 'Pending')}
                >
                  Pending
                </button>
                <button
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors duration-300"
                  onClick={() => handleStatusChange(delivery._id, 'Delayed')}
                >
                  Delay
                </button>
                <button
                  className="p-2 text-green-500 hover:bg-green-100 rounded-lg transition-colors duration-300"
                  onClick={() => handleStatusChange(delivery._id, 'Completed')}
                >
                  Done
                </button>
                <button 
                  className="p-2 text-yellow-500 hover:bg-yellow-100 rounded-lg transition-colors duration-300"
                  onClick={() => onEditDelivery(delivery)}
                >
                  <FaEdit />
                </button>
                <button 
                  className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-300"
                  onClick={() => handleDelete(delivery._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
