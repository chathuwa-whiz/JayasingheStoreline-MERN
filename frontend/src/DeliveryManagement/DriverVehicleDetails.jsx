import React, { useState, useEffect } from 'react';
import { useGetDriversQuery, useCreateDriverMutation, useUpdateDriverMutation, useDeleteDriverMutation } from '../redux/api/driverApiSlice';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const DriverVehicleDetails = () => {
  const { data: drivers, refetch } = useGetDriversQuery();
  const [createDriver] = useCreateDriverMutation();
  const [updateDriver] = useUpdateDriverMutation();
  const [deleteDriver] = useDeleteDriverMutation();

  const [newDriver, setNewDriver] = useState({
    nic: '',
    name: '',
    dob: '',
    telephoneNo: '',
    vehicle: '',
    vehicleNo: '',
    drivingLicense: ''
  });

  const [editingDriver, setEditingDriver] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const validateForm = () => {
    const { nic, name, dob, telephoneNo, vehicle, vehicleNo, drivingLicense } = newDriver;
    const nicRegex = /^[0-9]{12}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const telephoneRegex = /^[0-9]{10}$/;
    const vehicleRegex = /^[A-Za-z\s]+$/;
    const vehicleNoRegex = /^[A-Za-z0-9\s]+$/;
    const drivingLicenseRegex = /^[0-9]{8}$/;

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(dob).getFullYear();

    if (!nicRegex.test(nic)) {
      setMessage({ type: 'error', text: 'NIC must be exactly 12 digits' });
      return false;
    }
    if (!nameRegex.test(name)) {
      setMessage({ type: 'error', text: 'Name must contain only letters' });
      return false;
    }
    if (birthYear > 2005 || birthYear < 1969) {
      setMessage({ type: 'error', text: 'Driver must be born between 1969 and 2005' });
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
    if (!drivingLicenseRegex.test(drivingLicense)) {
      setMessage({ type: 'error', text: 'Driving License must be exactly 8 digits' });
      return false;
    }
    return true;
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingDriver) {
        await updateDriver({ id: editingDriver._id, ...newDriver }).unwrap();
        setMessage({ type: 'success', text: 'Driver updated successfully' });
      } else {
        await createDriver(newDriver).unwrap();
        setMessage({ type: 'success', text: 'Driver added successfully' });
      }
      setNewDriver({ nic: '', name: '', dob: '', telephoneNo: '', vehicle: '', vehicleNo: '', drivingLicense: '' });
      setEditingDriver(null);
      refetch();
    } catch (error) {
      setMessage({ type: 'error', text: editingDriver ? 'Update unsuccessful. Please try again.' : 'Adding unsuccessful. Please try again.' });
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setNewDriver({
      nic: driver.nic,
      name: driver.name,
      dob: driver.dob,
      telephoneNo: driver.telephoneNo,
      vehicle: driver.vehicle,
      vehicleNo: driver.vehicleNo,
      drivingLicense: driver.drivingLicense,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      try {
        await deleteDriver(id).unwrap();
        setMessage({ type: 'success', text: 'Driver deleted successfully' });
        refetch();
      } catch (error) {
        setMessage({ type: 'error', text: 'Delete unsuccessful. Please try again.' });
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingDriver(null);
    setNewDriver({ nic: '', name: '', dob: '', telephoneNo: '', vehicle: '', vehicleNo: '', drivingLicense: '' });
  };

  const handleInputChange = (e, field, maxLength) => {
    const value = e.target.value;
    if (value.length <= maxLength && /^[0-9]*$/.test(value)) {
      setNewDriver({ ...newDriver, [field]: value });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="border rounded-lg p-6 bg-gray-50 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">{editingDriver ? 'Edit Driver' : 'Add New Driver'}</h2>
        <form onSubmit={handleCreateOrUpdate}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* NIC */}
            <div>
              <label htmlFor="nic" className="block text-sm font-medium text-gray-700">NIC</label>
              <input
                type="text"
                id="nic"
                value={newDriver.nic}
                onChange={(e) => handleInputChange(e, 'nic', 12)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                maxLength={12}
                required
              />
            </div>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={newDriver.name}
                onChange={(e) => /^[A-Za-z\s]*$/.test(e.target.value) && setNewDriver({ ...newDriver, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dob"
                value={newDriver.dob}
                onChange={(e) => setNewDriver({ ...newDriver, dob: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                min="1969-01-01"
                max="2005-12-31"
                required
              />
            </div>
            {/* Telephone Number */}
            <div>
              <label htmlFor="telephoneNo" className="block text-sm font-medium text-gray-700">Telephone Number</label>
              <input
                type="text"
                id="telephoneNo"
                value={newDriver.telephoneNo}
                onChange={(e) => handleInputChange(e, 'telephoneNo', 10)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                maxLength={10}
                required
              />
            </div>
            {/* Vehicle */}
            <div>
              <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">Vehicle</label>
              <input
                type="text"
                id="vehicle"
                value={newDriver.vehicle}
                onChange={(e) => /^[A-Za-z\s]*$/.test(e.target.value) && setNewDriver({ ...newDriver, vehicle: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* Vehicle Number */}
            <div>
              <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Vehicle Number</label>
              <input
                type="text"
                id="vehicleNo"
                value={newDriver.vehicleNo}
                onChange={(e) => /^[A-Za-z0-9\s]*$/.test(e.target.value) && setNewDriver({ ...newDriver, vehicleNo: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* Driving License */}
            <div>
              <label htmlFor="drivingLicense" className="block text-sm font-medium text-gray-700">Driving License</label>
              <input
                type="text"
                id="drivingLicense"
                value={newDriver.drivingLicense}
                onChange={(e) => /^[A-Za-z0-9\s]*$/.test(e.target.value) && setNewDriver({ ...newDriver, drivingLicense: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                maxLength={8}
                required
              />
            </div>
          </div>
          <button type="submit" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            {editingDriver ? 'Update Driver' : 'Add Driver'}
          </button>
          {editingDriver && (
            <button onClick={handleCancelEdit} className="ml-4 mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Cancel
            </button>
          )}
        </form>
        {message.text && (
          <div className={`mt-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.type === 'success' ? <FaCheckCircle className="inline-block mr-2" /> : <FaTimesCircle className="inline-block mr-2" />}
            {message.text}
          </div>
        )}
      </div>

      <div className="mt-8 border rounded-lg p-6 bg-gray-50 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Drivers List</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">NIC</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Date of Birth</th>
              <th className="py-2 px-4 border-b">Telephone Number</th>
              <th className="py-2 px-4 border-b">Vehicle</th>
              <th className="py-2 px-4 border-b">Vehicle Number</th>
              <th className="py-2 px-4 border-b">Driving License</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers && drivers.map((driver) => (
              <tr key={driver._id}>
                <td className="py-2 px-4 border-b">{driver.nic}</td>
                <td className="py-2 px-4 border-b">{driver.name}</td>
                <td className="py-2 px-4 border-b">{driver.dob}</td>
                <td className="py-2 px-4 border-b">{driver.telephoneNo}</td>
                <td className="py-2 px-4 border-b">{driver.vehicle}</td>
                <td className="py-2 px-4 border-b">{driver.vehicleNo}</td>
                <td className="py-2 px-4 border-b">{driver.drivingLicense}</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => handleEdit(driver)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(driver._id)} className="text-red-500 hover:text-red-700 ml-4">
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
};

export default DriverVehicleDetails;
