import React, { useState, useEffect } from 'react';
import { useGetDriversQuery, useCreateDriverMutation, useUpdateDriverMutation, useDeleteDriverMutation } from '../redux/api/driverApiSlice';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const DriverVehicleDetails = () => {
  const { data: drivers, refetch } = useGetDriversQuery();
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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    refetch();
  }, [refetch]);

  const validateVehicleRegistrationNumber = (registrationNumber) => {
    // Regular expression to match the allowed formats
    const regex = /^(?:\d{2}-\d{4}|\w{2}-\w{4}|\w{3}-\w{4})$/;
    return regex.test(registrationNumber);
  };

  const validateForm = () => {
    const { nic, name, birthday, telephoneNo, vehicleType, vehicleRegNo, driverLicenceNo } = newDriver;

    // Validation regex patterns
    const nicRegex = /^(?:\d{12}|\d{9}[vV])$/; // 12 digits or 9 digits with "v" or "V"
    const nameRegex = /^[A-Za-z\s]{1,20}$/; // Only letters, max 20 characters
    const telephoneRegex = /^[0-9]{10}$/; // Exactly 10 digits
    const driverLicenseRegex = /^[A-Za-z]\d{7}$/; // One letter and 7 digits

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(birthday).getFullYear();

    // NIC Validation
    if (!nicRegex.test(nic)) {
      setMessage({ type: 'error', text: 'NIC must be either 12 digits or 9 digits followed by "v" or "V"' });
      return false;
    }

    // Name Validation
    if (!nameRegex.test(name)) {
      setMessage({ type: 'error', text: 'Name must contain only letters and be up to 20 characters' });
      return false;
    }

    // Birthday Validation
    if (birthYear > 2005 || birthYear < 1998) {
      setMessage({ type: 'error', text: 'Driver must be born between 1998 and 2005' });
      return false;
    }

    // Telephone Number Validation
    if (!telephoneRegex.test(telephoneNo)) {
      setMessage({ type: 'error', text: 'Telephone number must be exactly 10 digits' });
      return false;
    }

    // Vehicle Registration Number Validation
    if (!validateVehicleRegistrationNumber(vehicleRegNo)) {
      setMessage({ type: 'error', text: 'Vehicle registration number must be in the formats: 2 digits-4 digits, 2 letters-4 letters, or 3 letters-4 letters.' });
      return false;
    }

    // Driver License Number Validation
    if (!driverLicenseRegex.test(driverLicenceNo)) {
      setMessage({ type: 'error', text: 'Driver License must start with one letter followed by 7 digits' });
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
      birthday: driver.birthday.split('T')[0], // Ensure date input format
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
    setMessage({ type: '', text: '' });
  };

  const handleInputChange = (e, field, maxLength, regex = null) => {
    let value = e.target.value;
    if (regex) {
      const regexTest = new RegExp(regex);
      if (!regexTest.test(value)) return;
    }
    if (value.length > maxLength) return;
    setNewDriver({ ...newDriver, [field]: value });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Driver List', 14, 16);

    // Prepare data for the PDF
    const rows = drivers.map(driver => [
      driver.nic,
      driver.name,
      driver.birthday.split('T')[0], // Format date
      driver.telephoneNo,
      driver.vehicleType,
      driver.vehicleRegNo,
      driver.driverLicenceNo,
    ]);

    // Add autoTable to the PDF
    autoTable(doc, {
      head: [['NIC', 'Name', 'DOB', 'Telephone', 'Vehicle Type', 'Vehicle Reg No', 'Driver License No']],
      body: rows,
      startY: 20,
    });

    doc.save('drivers_list.pdf'); // Save the PDF
  };

  // Filter drivers based on the search term
  const filteredDrivers = drivers?.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || driver.nic.includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-4">
      {/* Form Section */}
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
                onChange={(e) => handleInputChange(e, 'nic', 12, '^[0-9vV]*$')}
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
                onChange={(e) => handleInputChange(e, 'name', 20, '^[A-Za-z\\s]*$')}
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
                value={newDriver.birthday}
                onChange={(e) => setNewDriver({ ...newDriver, birthday: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                onChange={(e) => handleInputChange(e, 'telephoneNo', 10, '^[0-9]*$')}
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
                onChange={(e) => handleInputChange(e, 'vehicleType', 20)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {/* Vehicle Registration Number */}
            <div>
              <label htmlFor="vehicleRegNo" className="block text-sm font-medium text-gray-700">Vehicle Registration Number</label>
              <input
                type="text"
                id="vehicleRegNo"
                value={newDriver.vehicleRegNo}
                onChange={(e) => handleInputChange(e, 'vehicleRegNo', 10)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {/* Driver License Number */}
            <div>
              <label htmlFor="driverLicenceNo" className="block text-sm font-medium text-gray-700">Driver License Number</label>
              <input
                type="text"
                id="driverLicenceNo"
                value={newDriver.driverLicenceNo}
                onChange={(e) => handleInputChange(e, 'driverLicenceNo', 8, '^[A-Za-z0-9]*$')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                maxLength={8}
              />
            </div>
          </div>
          {/* Error Message */}
          {message.text && (
            <div className={`mt-4 text-sm font-semibold ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {message.text}
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <button type="button" className="mr-4 px-4 py-2 bg-gray-300 rounded-md" onClick={handleCancelEdit}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200">
              {editingDriver ? 'Update Driver' : 'Add Driver'}
            </button>
          </div>
        </form>
      </div>

      {/* Driver List Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Driver List</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or NIC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">NIC</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">DOB</th>
              <th className="border px-4 py-2">Telephone</th>
              <th className="border px-4 py-2">Vehicle Type</th>
              <th className="border px-4 py-2">Vehicle Reg No</th>
              <th className="border px-4 py-2">Driver License No</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers && filteredDrivers.length > 0 ? (
              filteredDrivers.map(driver => (
                <tr key={driver._id}>
                  <td className="border px-4 py-2">{driver.nic}</td>
                  <td className="border px-4 py-2">{driver.name}</td>
                  <td className="border px-4 py-2">{driver.birthday.split('T')[0]}</td>
                  <td className="border px-4 py-2">{driver.telephoneNo}</td>
                  <td className="border px-4 py-2">{driver.vehicleType}</td>
                  <td className="border px-4 py-2">{driver.vehicleRegNo}</td>
                  <td className="border px-4 py-2">{driver.driverLicenceNo}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleEdit(driver)} className="text-blue-600 hover:underline">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(driver._id)} className="text-red-600 hover:underline ml-2">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="border text-center px-4 py-2">No drivers found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-4">
          <button onClick={downloadPDF} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverVehicleDetails;
