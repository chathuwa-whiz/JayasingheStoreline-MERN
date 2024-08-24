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
      setDeliveries(deliveries.filter((delivery) => delivery._id !== id)); // Use _id
    } catch (error) {
      console.error('Error deleting delivery:', error);
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
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Driver</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td className="border p-2">{delivery._id}</td>
              <td className="border p-2">{delivery.deliveryItem}</td>
              <td className="border p-2">{delivery.itemsPrice} LKR</td>
              <td className="border p-2">{delivery.deliveryPrice} LKR</td>
              <td className="border p-2">{delivery.totalPrice} LKR</td>
              <td className="border p-2">{delivery.from}</td>
              <td className="border p-2">{delivery.to}</td>
              <td className="border p-2">{delivery.driver}</td>
              <td className="border p-2">
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
