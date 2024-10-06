import React, { useState, useEffect } from 'react';
import { useGetDriversQuery, useCreateDriverMutation, useUpdateDriverMutation, useDeleteDriverMutation } from '../redux/api/driverApiSlice';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../asset/logo.png';

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

  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0]; // Convert to yyyy-mm-dd format

  const minDate = new Date(today.getFullYear() - 40, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0]; // Convert to yyyy-mm-dd format

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

  // Updated NIC Validation Handler
  const handleNICChange = (e) => {
    let value = e.target.value;

    if (/^\d{0,9}$/.test(value)) {
      // Allow typing digits up to 9 characters
      setNewDriver({ ...newDriver, nic: value });
    } else if (/^\d{9}[vV]?$/.test(value)) {
      // Allow "v" or "V" after exactly 9 digits
      setNewDriver({ ...newDriver, nic: value });
    }
  };

  const handleTelephoneChange = (e) => {
    const value = e.target.value;
    if (/^0(70|71|72|74|75|76|77|78)\d{0,7}$/.test(value)) {
      setNewDriver({ ...newDriver, telephoneNo: value });
    } else if (value.length < 10) {
      setNewDriver({ ...newDriver, telephoneNo: value });
    }
  };

  const validateForm = () => {
    const { nic, name, birthday, telephoneNo, vehicleType, vehicleRegNo, driverLicenceNo } = newDriver;

    // Validation regex patterns
    const nicRegex = /^(?:\d{12}|\d{9}[vV]?)$/; // 12 digits or 9 digits followed by "v" or "V"
    const nameRegex = /^[A-Za-z\s]{1,20}$/; // Only letters, max 20 characters
    const telephoneRegex = /^(070|071|072|074|075|076|077|078)\d{7}$/; // Must start with specific prefixes
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
    if (birthYear > 2005 || birthYear < 1984) {
      setMessage({ type: 'error', text: 'Driver must be born between 1984 and 2005' });
      return false;
    }

    // Telephone Number Validation
    if (!telephoneRegex.test(telephoneNo)) {
      setMessage({ type: 'error', text: 'Telephone number must start with 070/071/072/074/075/076/077/078 and be exactly 10 digits' });
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
    const doc = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait orientation
    const img = new Image();
    img.src = logo; // Replace with the correct path to your logo
  
    img.onload = function () {
        // Add company details and logo at the top
        doc.addImage(img, 'PNG', 14, 10, 30, 30); // Adjust position and size as needed
        doc.setFontSize(16);
        doc.text('Jayasinghe Storelines PVT (LTD)', 50, 20);
        doc.setFontSize(12);
        doc.text('No. 123, Main Street, Colombo, Sri Lanka', 50, 28);
        doc.text('Contact: +94 11 234 5678 | Email: info@jayasinghe.com', 50, 34);

         // Get current date and time
         const currentDate = new Date();
         const dateString = currentDate.toLocaleDateString(); // Get current date
         const timeString = currentDate.toLocaleTimeString(); // Get current time
 
         // Add issued time before the date
         doc.text(`Issued at: ${timeString} on ${dateString}`, 50, 40);
         
         doc.setFontSize(18);
         doc.text('Drivers List', 50, 50);

        // Prepare data for the PDF
        const rows = drivers.map(driver => [
            driver.nic,
            driver.name,
            driver.birthday.split('T')[0], // Show only the date
            driver.telephoneNo,
            driver.vehicleType,
            driver.vehicleRegNo,
            driver.driverLicenceNo,
        ]);

        // Add autoTable to the PDF
        autoTable(doc, {
            head: [['NIC', 'Name', 'DOB', 'Telephone', 'Vehicle Type', 'Vehicle Reg No', 'Driver License No']],
            body: rows,
            startY: 45, // Adjust to start below the company details and logo
        });

        // Save the PDF
        doc.save('Drivers_List.pdf');
    };

    img.onerror = function () {
        // Handle the case where the image fails to load
        console.error('Image loading failed. PDF will be generated without the logo.');
        generatePDFWithoutLogo(doc); // Pass the doc object to the function
    };
};

const generatePDFWithoutLogo = (doc) => {
    // Make sure the doc object is passed correctly
    doc.setFontSize(16);
    doc.text('Jayasinghe Storelines PVT LTD', 14, 20);
    doc.setFontSize(12);
    doc.text('No. 123, Main Street, Colombo, Sri Lanka', 14, 28);
    doc.text('Contact: +94 11 234 5678 | Email: info@jayasinghe.com', 14, 34);

    const rows = drivers.map(driver => [
        driver.nic,
        driver.name,
        driver.birthday.split('T')[0],
        driver.telephoneNo,
        driver.vehicleType,
        driver.vehicleRegNo,
        driver.driverLicenceNo,
    ]);

    autoTable(doc, {
        head: [['NIC', 'Name', 'DOB', 'Telephone', 'Vehicle Type', 'Vehicle Reg No', 'Driver License No']],
        body: rows,
        startY: 45,
    });

    doc.save('Drivers_List.pdf');
};
``

  // Filter drivers based on the search term
  const filteredDrivers = drivers?.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || driver.nic.includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-4">
      {/* Form Section */}
<div className="border rounded-lg p-6 bg-white shadow-lg transition duration-300 ease-in-out hover:shadow-xl">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800">{editingDriver ? 'Edit Driver' : 'Add New Driver'}</h2>
  <form onSubmit={handleCreateOrUpdate}>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* NIC */}
      <div>
        <label htmlFor="nic" className="block text-sm font-medium text-gray-700">NIC</label>
        <input
          type="text"
          id="nic"
          value={newDriver.nic}
          onChange={(e) => handleInputChange(e, 'nic', 12, '^[0-9vV]*$')}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
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
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
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
          min={minDate}
          max={maxDate}
          onChange={(e) => setNewDriver({ ...newDriver, birthday: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
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
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
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
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
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
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
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
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
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
      <button type="button" className="mr-4 px-4 py-2 bg-gray-300 rounded-md transition duration-200 hover:bg-gray-400" onClick={handleCancelEdit}>
        Cancel
      </button>
      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 shadow-md">
        {editingDriver ? 'Update Driver' : 'Add Driver'}
      </button>
    </div>
  </form>
</div>


      {/* Driver List Section */}
<div className="mt-8">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Driver List</h2>
  <div className="mb-4">
    <input
      type="text"
      placeholder="Search by name or NIC..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
    />
  </div>
  <table className="min-w-full bg-white border border-gray-300 shadow-md">
    <thead>
      <tr className="bg-gray-200">
        <th className="border px-4 py-2 text-left text-gray-600 font-medium">NIC</th>
        <th className="border px-4 py-2 text-left text-gray-600 font-medium">Name</th>
        <th className="border px-4 py-2 text-left text-gray-600 font-medium">DOB</th>
        <th className="border px-4 py-2 text-left text-gray-600 font-medium">Telephone</th>
        <th className="border px-4 py-2 text-left text-gray-600 font-medium">Vehicle Type</th>
        <th className="border px-4 py-2 text-left text-gray-600 font-medium">Vehicle Reg No</th>
        <th className="border px-4 py-2 text-left text-gray-600 font-medium">Driver License No</th>
        <th className="border px-4 py-2 text-left text-gray-600 font-medium">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredDrivers && filteredDrivers.length > 0 ? (
        filteredDrivers.map(driver => (
          <tr key={driver._id} className="hover:bg-gray-100 transition duration-200">
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
          <td colSpan="8" className="border px-4 py-2 text-center text-gray-500">No drivers found.</td>
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
