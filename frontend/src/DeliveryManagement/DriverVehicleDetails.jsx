import React, { useState, useEffect } from 'react';
import { useGetDriversQuery, useCreateDriverMutation, useUpdateDriverMutation, useDeleteDriverMutation } from '../redux/api/driverApiSlice';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const DriverVehicleDetails = () => {
  const { data: drivers, refetch } = useGetDriversQuery();

  // console.log(drivers);

  const [createDriver] = useCreateDriverMutation();
  const [updateDriver] = useUpdateDriverMutation();
  const [deleteDriver] = useDeleteDriverMutation();

  const [newDriver, setNewDriver] = useState({
    nic: '',
    name: '',
    birthday: '',
    telephoneNo: '',
    vehicleType: '',
    vehicleRegNo: '',
    driverLicenceNo: ''
  });

  const [editingDriver, setEditingDriver] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const validateForm = () => {
    const { nic, name, birthday, telephoneNo, vehicleType, vehicleRegNo, driverLicenceNo } = newDriver;
    const nicRegex = /^[0-9]{12}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const telephoneRegex = /^[0-9]{10}$/;
    const vehicleTypeRegex = /^[A-Za-z\s]+$/;
    const vehicleRegNoRegex = /^[A-Za-z0-9\s]+$/;
    const driverLicenseRegex = /^[0-9]{8}$/;

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(birthday).getFullYear();

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
    if (!vehicleTypeRegex.test(vehicleType)) {
      setMessage({ type: 'error', text: 'Vehicle type must contain only letters' });
      return false;
    }
    if (!vehicleRegNoRegex.test(vehicleRegNo)) {
      setMessage({ type: 'error', text: 'Vehicle registration number must contain letters and numbers' });
      return false;
    }
    if (!driverLicenseRegex.test(driverLicenceNo)) {
      setMessage({ type: 'error', text: 'Driver License must be exactly 8 digits' });
      return false;
    }
    return true;
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    // if (!validateForm()) return;

    try {
      if (editingDriver) {
        console.log(editingDriver?._id);
        await updateDriver({ id: editingDriver._id, ...newDriver }).unwrap();
        setMessage({ type: 'success', text: 'Driver updated successfully' });
      } else {
        await createDriver(newDriver).unwrap();
        setMessage({ type: 'success', text: 'Driver added successfully' });
      }
      setNewDriver({ nic: '', name: '', birthday: '', telephoneNo: '', vehicleType: '', vehicleRegNo: '', driverLicenceNo: '' });
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
      birthday: driver.birthday,
      telephoneNo: driver.telephoneNo,
      vehicleType: driver.vehicleType,
      vehicleRegNo: driver.vehicleRegNo,
      driverLicenceNo: driver.driverLicenceNo,
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
    setNewDriver({ nic: '', name: '', birthday: '', telephoneNo: '', vehicleType: '', vehicleRegNo: '', driverLicenceNo: '' });
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
              <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="birthday"
                value={newDriver.birthday}
                onChange={(e) => setNewDriver({ ...newDriver, birthday: e.target.value })}
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
            {/* Vehicle Type */}
            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <input
                type="text"
                id="vehicleType"
                value={newDriver.vehicleType}
                onChange={(e) => /^[A-Za-z\s]*$/.test(e.target.value) && setNewDriver({ ...newDriver, vehicleType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* Vehicle Registration Number */}
            <div>
              <label htmlFor="vehicleRegNo" className="block text-sm font-medium text-gray-700">Vehicle Registration Number</label>
              <input
                type="text"
                id="vehicleRegNo"
                value={newDriver.vehicleRegNo}
                onChange={(e) => /^[A-Za-z0-9\s]*$/.test(e.target.value) && setNewDriver({ ...newDriver, vehicleRegNo: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* Driver License Number */}
            <div>
              <label htmlFor="driverLicenceNo" className="block text-sm font-medium text-gray-700">Driver License Number</label>
              <input
                type="text"
                id="driverLicenceNo"
                value={newDriver.driverLicenceNo}
                onChange={(e) => handleInputChange(e, 'driverLicenceNo', 8)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                maxLength={8}
                required
              />
            </div>
          </div>
          {message.text && (
            <div className={`mt-4 p-2 rounded-lg ${message.type === 'success' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
              {message.text}
            </div>
          )}
          <div className="mt-4 flex justify-end space-x-4">
            {editingDriver ? (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            ) : null}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              {editingDriver ? 'Update Driver' : 'Add Driver'}
            </button>
          </div>
        </form>
      </div>

      {/* Driver List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Drivers List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">NIC</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">birthday</th>
                <th className="py-2 px-4 border-b">Telephone</th>
                <th className="py-2 px-4 border-b">Vehicle Type</th>
                <th className="py-2 px-4 border-b">Vehicle Reg No</th>
                <th className="py-2 px-4 border-b">License No</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers?.map((driver) => (
                <tr key={driver._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{driver.nic}</td>
                  <td className="py-2 px-4 border-b">{driver.name}</td>
                  <td className="py-2 px-4 border-b">{new Date(driver.birthday).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{driver.telephoneNo}</td>
                  <td className="py-2 px-4 border-b">{driver.vehicleType}</td>
                  <td className="py-2 px-4 border-b">{driver.vehicleRegNo}</td>
                  <td className="py-2 px-4 border-b">{driver.driverLicenceNo}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(driver)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(driver._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {drivers?.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No drivers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverVehicleDetails;
