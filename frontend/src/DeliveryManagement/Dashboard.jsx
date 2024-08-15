import React from 'react';
import { FaTrash, FaEdit, FaEye, FaMapMarkerAlt } from 'react-icons/fa';

const deliveries = [
  { id: 'D10', type: 'Electronics', vehicle: 'Lorry A', driver: 'Mr.Sam', cost: '15000 LKR', destination: 'J Hettipola – Kurunegala' },
  { id: 'D15', type: 'Furniture', vehicle: 'Lorry B', driver: 'Mr.Lucky', cost: '30000 LKR', destination: 'J Hettipola – Wennappuwa' },
  { id: 'D20', type: 'Electronics', vehicle: 'Lorry C', driver: 'Mr.Jake', cost: '10000 LKR', destination: 'J Hettipola – Minuwangoda' },
  { id: 'D25', type: 'Electronics', vehicle: 'D Bike', driver: 'Mr.Hash', cost: '2500 LKR', destination: 'J Hettipola – Kurunegala' },
  { id: 'D30', type: 'Electronics', vehicle: 'D Tuk', driver: 'Mr.Ciao', cost: '3000 LKR', destination: 'J Hettipola – Kandy' },
  { id: 'D35', type: 'Electronics', vehicle: 'D Tuk', driver: 'Mr.Mac', cost: '3000 LKR', destination: 'J Hettipola – Kalutara' }
];

export default function DeliveryDashboard() {
  return (
    <div className="bg-white shadow-md rounded p-6">
      <h1 className="text-xl font-bold mb-4">Deliveries</h1>
      <input type="text" placeholder="Search Deliveries" className="p-2 border border-gray-300 rounded mb-4 w-full" />
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Delivery Type</th>
            <th className="border p-2">Vehicle Type</th>
            <th className="border p-2">Driver</th>
            <th className="border p-2">Cost</th>
            <th className="border p-2">Destination</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td className="border p-2">{delivery.id}</td>
              <td className="border p-2">{delivery.type}</td>
              <td className="border p-2">{delivery.vehicle}</td>
              <td className="border p-2">{delivery.driver}</td>
              <td className="border p-2">{delivery.cost}</td>
              <td className="border p-2">{delivery.destination}</td>
              <td className="border p-2">
                <button className="p-1 mx-1 text-blue-500"><FaMapMarkerAlt /></button>
                <button className="p-1 mx-1 text-yellow-500"><FaEdit /></button>
                <button className="p-1 mx-1 text-gray-500"><FaEye /></button>
                <button className="p-1 mx-1 text-red-500"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
