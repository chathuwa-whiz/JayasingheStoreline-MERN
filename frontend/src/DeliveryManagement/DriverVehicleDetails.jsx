import React from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const DriverVehicleDetails = () => {
  const drivers = [
    { id: 'E01', name: 'Mr.Sam J', type: 'Lorry A', vehicle: 'LA-3565' },
    { id: 'E02', name: 'Mr.Jake D', type: 'Lorry B', vehicle: 'LE-2389' },
    { id: 'E03', name: 'Mr.Luckey H', type: 'Lorry C', vehicle: 'LH-2555' },
    { id: 'E04', name: 'Mr.Ciao L', type: 'D Bike', vehicle: 'CBA-5693' },
    { id: 'E05', name: 'Mr.Benjamin K', type: 'D Tuk', vehicle: 'ABC-5645' },
    { id: 'E06', name: 'Mr.Hash M', type: 'D Tuk', vehicle: 'ABA-2589' },
  ];

  return (
    <div className="p-6 flex-grow">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="text-left p-4">ID</th>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Vehicle Type</th>
            <th className="text-left p-4">Vehicle</th>
            <th className="text-center p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id} className="border-t">
              <td className="p-4">{driver.id}</td>
              <td className="p-4">{driver.name}</td>
              <td className="p-4">{driver.type}</td>
              <td className="p-4">{driver.vehicle}</td>
              <td className="p-4 flex justify-center space-x-4">
                <button className="text-blue-500"><FaEdit /></button>
                <button className="text-green-500"><FaEye /></button>
                <button className="text-red-500"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">ADD +</button>
        <div className="space-x-4">
          <button className="bg-gray-200 p-2 rounded-lg">{/* Up arrow icon */}</button>
          <button className="bg-gray-200 p-2 rounded-lg">{/* Down arrow icon */}</button>
        </div>
      </div>
    </div>
  );
};

export default DriverVehicleDetails;
