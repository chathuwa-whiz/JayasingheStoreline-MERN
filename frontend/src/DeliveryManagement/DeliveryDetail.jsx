import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDeleteDeliveryMutation, useGetDeliveriesQuery, useUpdateDeliveryMutation } from '../redux/api/deliveryApiSlice';

export default function DeliveryDetail({ onEditDelivery }) {
  const { data: deliveries, error: deliveriesError, isLoading } = useGetDeliveriesQuery();
  const [deleteDelivery] = useDeleteDeliveryMutation();
  const [updateDelivery] = useUpdateDeliveryMutation();

  // Format Prices
  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
  });

  const handleDelete = async (id) => {
    try {
      await deleteDelivery(id).unwrap(); // Use unwrap() to handle resolved promise
    } catch (error) {
      console.error('Error deleting delivery:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    const delivery = deliveries.find((delivery) => delivery._id === id);
    const updatedDelivery = { ...delivery, deliveryStatus: status }; // Use deliveryStatus instead of status
    try {
      await updateDelivery({ deliveryId: id, formData: updatedDelivery }).unwrap();
      window.location.reload(); // Reload the page after updating the delivery
    } catch (error) {
      console.error('Error updating delivery:', error);
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

  const getButtonClass = (currentStatus, buttonStatus) => {
    return currentStatus === buttonStatus
      ? `p-2 text-black rounded-lg`
      : `p-2 text-${buttonStatus === 'Pending' ? 'yellow' : buttonStatus === 'Delayed' ? 'blue' : 'green'}-500 hover:bg-${buttonStatus === 'Pending' ? 'yellow' : buttonStatus === 'Delayed' ? 'blue' : 'green'}-100 rounded-lg transition-colors duration-300`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            <th className="border p-3 text-left">Delivery No</th>
            <th className="border p-3 text-left">Delivery Item</th>
            <th className="border p-3 text-left">Items Price</th>
            <th className="border p-3 text-left">Delivery Price</th>
            <th className="border p-3 text-left">Total Price</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id} className={`border-b ${getRowClass(delivery.deliveryStatus)} hover:bg-orange-100 transition-colors duration-300`}>
              <td className="border p-3">{delivery._id}</td>
              <td className="border p-3">
                {JSON.parse(delivery.deliveryItem).map((item) => (
                  <div key={item._id}>
                    <p>{item.name} x {item.qty}</p>
                  </div>
                ))}
              </td>
              <td className="border p-3">{priceFormatter.format(delivery.itemsPrice)} LKR</td>
              <td className="border p-3">{delivery.deliveryPrice} LKR</td>
              <td className="border p-3">{delivery.totalPrice} LKR</td>
              <td className="border p-3">{delivery.deliveryStatus || 'Pending'}</td>
              <td className="border p-3 flex space-x-2">
                <button
                  className={getButtonClass(delivery.deliveryStatus, 'Pending')}
                  onClick={() => handleStatusChange(delivery._id, 'Pending')}
                >
                  Pending
                </button>
                <button
                  className={getButtonClass(delivery.deliveryStatus, 'Delayed')}
                  onClick={() => handleStatusChange(delivery._id, 'Delayed')}
                >
                  Delayed
                </button>
                <button
                  className={getButtonClass(delivery.deliveryStatus, 'Completed')}
                  onClick={() => handleStatusChange(delivery._id, 'Completed')}
                >
                  Completed
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
