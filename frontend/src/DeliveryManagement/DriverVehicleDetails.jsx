import React, { useState, useEffect } from 'react';
import { useGetDriversQuery, useCreateDriverMutation, useUpdateDriverMutation, useDeleteDriverMutation } from '../redux/api/driverApiSlice';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const DriverVehicleDetails = () => {
  const { data: drivers, refetch } = useGetDriversQuery();
  const [createDriver] = useCreateDriverMutation();
  const [updateDriver] = useUpdateDriverMutation();
  const [deleteDriver] = useDeleteDriverMutation();
  const [newDriver, setNewDriver] = useState({
    id: '',
    name: '',
    telephoneNo: '',
    vehicle: ''
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createDriver(newDriver).unwrap();
      setNewDriver({ id: '', name: '', telephoneNo: '', vehicle: '' });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id, updatedDriver) => {
    try {
      await updateDriver({ driverId: id, driverData: updatedDriver }).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDriver(id).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 flex-grow flex flex-col">
      {/* Driver & Vehicle Detail Table */}
      <div className="w-full bg-white shadow-md rounded-lg mb-6 overflow-y-scroll" style={{ maxHeight: '300px' }}>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Telephone</th>
              <th className="text-left p-4">Vehicle</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers?.map(driver => (
              <tr key={driver._id} className="border-t">
                <td className="p-4">{driver.id}</td>
                <td className="p-4">{driver.name}</td>
                <td className="p-4">{driver.telephoneNo}</td>
                <td className="p-4">{driver.vehicle}</td>
                <td className="p-4 flex justify-center space-x-4">
                  <button className="text-blue-500" onClick={() => handleUpdate(driver._id, { /* updated data */ })}>
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Form to Add a New Driver */}
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Add New Driver</h2>
        <form onSubmit={handleCreate}>
          <div className="mb-4">
            <label className="block text-gray-700">ID</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
              placeholder="Enter driver ID"
              value={newDriver.id}
              onChange={(e) => setNewDriver({ ...newDriver, id: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
              placeholder="Enter driver name"
              value={newDriver.name}
              onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Telephone No</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
              placeholder="Enter telephone number"
              value={newDriver.telephoneNo}
              onChange={(e) => setNewDriver({ ...newDriver, telephoneNo: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Vehicle</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
              placeholder="Enter vehicle information"
              value={newDriver.vehicle}
              onChange={(e) => setNewDriver({ ...newDriver, vehicle: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
          >
            Add Driver
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverVehicleDetails;
