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
        return 'bg-blue-100'; // Light blue for delayed
      case 'Completed':
        return 'bg-green-100'; // Light green for completed
      default:
        return 'bg-yellow-100'; // Light yellow for pending
    }
  };

  return (
    <div className="shadow-md rounded p-6 bg-gray-100 h-screen">
      <h1 className="text-xl font-bold mb-4">Deliveries</h1>
      
      <input type="text" placeholder="Search Deliveries" className="p-2 border border-gray-300 rounded mb-4 w-full" />

      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Delivery Item</th>
            <th className="border p-2">Items Price</th>
            <th className="border p-2">Delivery Price</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Driver</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id} className={getRowClass(delivery.status)}>
              <td className="border p-2">{delivery._id}</td>
              <td className="border p-2">{delivery.deliveryItem}</td>
              <td className="border p-2">{delivery.itemsPrice} LKR</td>
              <td className="border p-2">{delivery.deliveryPrice} LKR</td>
              <td className="border p-2">{delivery.totalPrice} LKR</td>
              <td className="border p-2">{delivery.driver}</td>
              <td className="border p-2">{delivery.status || 'Pending'}</td>
              <td className="border p-2 flex space-x-2">
                <button
                  className="p-1 mx-1 text-yellow-500 hover:text-yellow-600"
                  onClick={() => handleStatusChange(delivery._id, 'Pending')}
                >
                  Pending
                </button>
                <button
                  className="p-1 mx-1 text-blue-500 hover:text-blue-600"
                  onClick={() => handleStatusChange(delivery._id, 'Delayed')}
                >
                  Delay
                </button>
                <button
                  className="p-1 mx-1 text-green-500 hover:text-green-600"
                  onClick={() => handleStatusChange(delivery._id, 'Completed')}
                >
                  Done
                </button>
                <button className="p-1 mx-1 text-yellow-500" onClick={() => onEditDelivery(delivery)}>
                  <FaEdit />
                </button>
                <button className="p-1 mx-1 text-red-500" onClick={() => handleDelete(delivery._id)}>
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
