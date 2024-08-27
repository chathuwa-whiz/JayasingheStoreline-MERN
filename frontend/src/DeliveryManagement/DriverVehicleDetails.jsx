import React, { useState, useEffect } from 'react';
import { useGetDriversQuery, useCreateDriverMutation, useDeleteDriverMutation } from '../redux/api/driverApiSlice';
import { FaEdit, FaEye, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const DriverVehicleDetails = () => {
  const { data: drivers, refetch } = useGetDriversQuery();
  const [createDriver] = useCreateDriverMutation();
  const [deleteDriver] = useDeleteDriverMutation();
  const [newDriver, setNewDriver] = useState({
    id: '',
    name: '',
    telephoneNo: '',
    vehicle: '',
    vehicleNo: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const validateForm = () => {
    const { id, name, telephoneNo, vehicle, vehicleNo } = newDriver;
    const idRegex = /^[0-9]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const telephoneRegex = /^[0-9]{10}$/;
    const vehicleRegex = /^[A-Za-z\s]+$/;
    const vehicleNoRegex = /^[A-Za-z0-9\s]+$/;

    if (!idRegex.test(id)) {
      setMessage({ type: 'error', text: 'ID must be a number' });
      return false;
    }
    if (!nameRegex.test(name)) {
      setMessage({ type: 'error', text: 'Name must contain only letters' });
      return false;
    }
    if (!telephoneRegex.test(telephoneNo)) {
      setMessage({ type: 'error', text: 'Telephone number must be exactly 10 digits' });
      return false;
    }
    if (!vehicleRegex.test(vehicle)) {
      setMessage({ type: 'error', text: 'Vehicle must contain only letters' });
      return false;
    }
    if (!vehicleNoRegex.test(vehicleNo)) {
      setMessage({ type: 'error', text: 'Vehicle number must contain letters and numbers' });
      return false;
    }
    return true;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await createDriver(newDriver).unwrap();
      setMessage({ type: 'success', text: 'Driver added successfully' });
      setNewDriver({ id: '', name: '', telephoneNo: '', vehicle: '', vehicleNo: '' });
      refetch();
    } catch (error) {
      setMessage({ type: 'error', text: 'Adding unsuccessful. Please try again.' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDriver(id).unwrap();
      refetch();
    } catch (error) {
      setMessage({ type: 'error', text: 'Deletion unsuccessful. Please try again.' });
    }
  };

  return (
    <div className="p-6 flex-grow flex flex-col space-y-6">
      {message.text && (
        <div className={`fixed top-10 right-10 p-4 rounded-lg shadow-lg text-white ${
          message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <div className="flex items-center space-x-2">
            {message.type === 'success' ? (
              <FaCheckCircle className="text-2xl" />
            ) : (
              <FaTimesCircle className="text-2xl" />
            )}
            <span>{message.text}</span>
          </div>
        </div>
      )}

      {/* Driver & Vehicle Detail Table */}
      <div className="w-full bg-white shadow-md rounded-lg mb-6 overflow-y-scroll" style={{ maxHeight: '300px' }}>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Telephone</th>
              <th className="text-left p-4">Vehicle</th>
              <th className="text-left p-4">Vehicle No</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers && drivers.length > 0 ? (
              drivers.map((driver) => (
                <tr key={driver._id} className="border-t">
                  <td className="p-4">{driver.id}</td>
                  <td className="p-4">{driver.name}</td>
                  <td className="p-4">{driver.telephoneNo}</td>
                  <td className="p-4">{driver.vehicle}</td>
                  <td className="p-4">{driver.vehicleNo}</td>
                  <td className="p-4 flex justify-center space-x-4">
                    <button className="text-blue-500" onClick={() => console.log('Edit functionality')}>
                      <FaEdit />
                    </button>
                    <button className="text-green-500">
                      <FaEye />
                    </button>
                    <button className="text-red-500" onClick={() => handleDelete(driver._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">No drivers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form to Add a New Driver */}
      <div className="border rounded-lg p-6 bg-gray-50 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Driver</h2>
        <form onSubmit={handleCreate}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">ID</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded-lg bg-white"
                placeholder="Enter driver ID"
                value={newDriver.id}
                onChange={(e) => setNewDriver({ ...newDriver, id: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded-lg bg-white"
                placeholder="Enter driver name"
                value={newDriver.name}
                onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">Telephone No</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded-lg bg-white"
                placeholder="Enter telephone number"
                value={newDriver.telephoneNo}
                onChange={(e) => setNewDriver({ ...newDriver, telephoneNo: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">Vehicle</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded-lg bg-white"
                placeholder="Enter vehicle information"
                value={newDriver.vehicle}
                onChange={(e) => setNewDriver({ ...newDriver, vehicle: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">Vehicle No</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded-lg bg-white"
                placeholder="Enter vehicle number"
                value={newDriver.vehicleNo}
                onChange={(e) => setNewDriver({ ...newDriver, vehicleNo: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Driver
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverVehicleDetails;
