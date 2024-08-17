import React from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const DriverVehicleDetails = () => {
  const drivers = [
    { id: 'E01', name: 'Mr.Sam Jayasooriya', type: 'Lorry A', vehicle: 'LA-3565' },
    { id: 'E02', name: 'Mr.Jake Danial', type: 'Lorry B', vehicle: 'LE-2389' },
    { id: 'E03', name: 'Mr.Luckey Hedok', type: 'Lorry C', vehicle: 'LH-2555' },
    { id: 'E04', name: 'Mr.Ciao Luciano', type: 'D Bike', vehicle: 'CBA-5693' },
    { id: 'E05', name: 'Mr.Benjamin Krishan', type: 'D Tuk', vehicle: 'ABC-5645' },
    { id: 'E06', name: 'Mr.Hash Maroons', type: 'D Tuk', vehicle: 'ABA-2589' },
    // Additional drivers can be added here...
  ];

  return (
    <div className="p-6 flex-grow flex flex-col">
      {/* Driver & Vehicle Detail Table on Top */}
      <div className="w-full bg-white shadow-md rounded-lg mb-6 overflow-y-scroll" style={{ maxHeight: '300px' }}>
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
      </div>

      {/* Bottom Section with Drivers and Vehicles Side by Side */}
      <div className="flex justify-between">
        {/* Drivers Table on Bottom Left */}
        <div className="w-1/2 bg-blue-50 p-4 rounded-lg shadow-md mr-4 overflow-y-scroll" style={{ maxHeight: '300px' }}>
          <h2 className="font-semibold mb-4">Drivers</h2>
          <div className="space-y-2">
            {drivers.map(driver => (
              <div key={driver.id} className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                <span>{driver.id} {driver.name}</span>
                <button className="text-blue-500 hover:text-blue-700">More</button>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicles Table on Bottom Right */}
        <div className="w-1/2 bg-orange-50 p-4 rounded-lg shadow-md overflow-y-scroll" style={{ maxHeight: '300px' }}>
          <h2 className="font-semibold mb-4">Vehicles</h2>
          <div className="space-y-2">
            {drivers.map(driver => (
              <div key={driver.id} className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                <span>{driver.vehicle}</span>
                <button className="text-orange-500 hover:text-orange-700">More</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverVehicleDetails;
