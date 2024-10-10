import React, { useState, useEffect } from 'react';
import { useGetDriversQuery, useCreateDriverMutation, useUpdateDriverMutation, useDeleteDriverMutation } from '../redux/api/driverApiSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
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

  const areaCodes = {
    '011': 'Colombo', '031': 'Negombo', '038': 'Panadura', '055': 'Badulla',
    '021': 'Jaffna', '032': 'Puttalam', '041': 'Matara', '057': 'Bandarawela',
    '023': 'Mannar', '033': 'Gampaha', '045': 'Ratnapura', '063': 'Ampara',
    '024': 'Vavuniya', '034': 'Kalutara', '047': 'Hambantota', '065': 'Batticaloa',
    '025': 'Anuradhapura', '035': 'Kegalle', '051': 'Hatton', '066': 'Matale',
    '026': 'Trincomalee', '036': 'Avissawella', '052': 'Nuwara Eliya', '067': 'Kalmunai',
    '027': 'Polonnaruwa', '037': 'Kurunegala', '054': 'Nawalapitiya', '081': 'Kandy'
  };

  const networkCodes = ['070', '071', '072', '074', '076', '077', '078'];

  const formatTelephoneNo = (value) => {
    // Remove any non-digit characters
    let formatted = value.replace(/\D/g, '');
    
    // Check if it's a mobile number or landline
    if (networkCodes.includes(formatted.slice(0, 3))) {
      // Mobile number format: 07X-XXXXXXX
      if (formatted.length > 3) {
        formatted = formatted.slice(0, 3) + '-' + formatted.slice(3, 10);
      }
    } else {
      // Landline format: 0XX-XXXXXXX
      if (formatted.length > 3) {
        formatted = formatted.slice(0, 3) + '-' + formatted.slice(3, 10);
      }
    }
    
    return formatted.slice(0, 11); // Limit to 11 characters (including hyphen)
  };

  const getAreaName = (telephoneNo) => {
    const areaCode = telephoneNo.slice(0, 3);
    return areaCodes[areaCode] || '';
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const formatVehicleRegNo = (value) => {
    // Remove any existing hyphens and uppercase the input
    let sanitizedValue = value.replace('-', '').toUpperCase();
    
    if (/^\d{1,6}$/.test(sanitizedValue)) {
      // Format 12-1234
      if (sanitizedValue.length > 2) {
        return sanitizedValue.slice(0, 2) + '-' + sanitizedValue.slice(2, 6);
      }
    } else if (/^[A-Z]{2}\d{0,4}$/.test(sanitizedValue)) {
      // Format AB-1234
      if (sanitizedValue.length > 2) {
        return sanitizedValue.slice(0, 2) + '-' + sanitizedValue.slice(2, 6);
      }
    } else if (/^[A-Z]{3}\d{0,4}$/.test(sanitizedValue)) {
      // Format ABC-1234
      if (sanitizedValue.length > 3) {
        return sanitizedValue.slice(0, 3) + '-' + sanitizedValue.slice(3, 7);
      }
    }
    return sanitizedValue;
  };

  const formatDriverLicenceNo = (value) => {
    // Ensure the first character is a capital letter
    let formatted = value.toUpperCase();
    
    // If the first character is not a letter, remove it
    if (!/^[A-Z]/.test(formatted)) {
      formatted = formatted.slice(1);
    }
    
    // Remove any non-alphanumeric characters
    formatted = formatted.replace(/[^A-Z0-9]/g, '');
    
    // Limit to 8 characters total
    return formatted.slice(0, 8);
  };

  const handleInputChange = (e, field) => {
    let value = e.target.value;
    
    if (field === 'name') {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (field === 'birthday') {
      // When birthday changes, clear the NIC to ensure it's re-entered correctly
      setNewDriver(prev => ({ ...prev, birthday: value, nic: '' }));
      return;
    } else if (field === 'nic') {
      const birthYear = new Date(newDriver.birthday).getFullYear();
      if (birthYear < 2001) {
        // For birth years before 2001
        value = value.slice(0, 10).replace(/[^0-9V]/gi, '');
        if (value.length >= 2) {
          const yearPrefix = value.slice(0, 2);
          if (yearPrefix !== String(birthYear).slice(-2)) {
            value = String(birthYear).slice(-2) + value.slice(2);
          }
        }
        if (value.length === 10 && !/V$/i.test(value)) {
          value = value.slice(0, 9) + 'V';
        }
      } else {
        // For birth years 2001 and after
        value = value.slice(0, 12).replace(/\D/g, '');
        if (value.length >= 2 && value.slice(0, 2) !== '20') {
          value = '20' + value.slice(2);
        }
      }
    } else if (field === 'vehicleRegNo') {
      value = formatVehicleRegNo(value);
    } else if (field === 'driverLicenceNo') {
      value = formatDriverLicenceNo(value);
    } else if (field === 'telephoneNo') {
      value = formatTelephoneNo(value);
    }
    
    setNewDriver(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

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
        startY: 55, // Adjust to start below the company details and logo
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
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name (English letters only)</label>
              <input
                type="text"
                id="name"
                value={newDriver.name}
                onChange={(e) => handleInputChange(e, 'name')}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
                required
                pattern="[A-Za-z\s]+"
                title="Please enter English letters only"
              />
            </div>
            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dob"
                value={newDriver.birthday}
                onChange={(e) => handleInputChange(e, 'birthday')}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
                required
                min={minDate}
                max={maxDate}
              />
              <p className="mt-1 text-sm text-gray-500">
                Driver must be between 18 and 40 years old
              </p>
            </div>
            {/* NIC */}
            <div>
              <label htmlFor="nic" className="block text-sm font-medium text-gray-700">NIC</label>
              <input
                type="text"
                id="nic"
                value={newDriver.nic}
                onChange={(e) => handleInputChange(e, 'nic')}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
                required
                placeholder={new Date(newDriver.birthday).getFullYear() < 2001 ? "YYXXXXXXXXV" : "20XXXXXXXXXX"}
              />
              <p className="mt-1 text-sm text-gray-500">
                {new Date(newDriver.birthday).getFullYear() < 2001 
                  ? "10 digits with 'V' at the end, starting with birth year's last 2 digits" 
                  : "12 digits, starting with '20'"}
              </p>
            </div>
            {/* Telephone Number */}
            <div>
              <label htmlFor="telephoneNo" className="block text-sm font-medium text-gray-700">Telephone/Mobile Number</label>
              <div className="relative">
                <input
                  type="text"
                  id="telephoneNo"
                  value={newDriver.telephoneNo}
                  onChange={(e) => handleInputChange(e, 'telephoneNo')}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
                  required
                  placeholder="0XX-XXXXXXX"
                />
                {newDriver.telephoneNo && getAreaName(newDriver.telephoneNo) && (
                  <span className="absolute right-2 top-2 text-sm text-gray-500">
                    {getAreaName(newDriver.telephoneNo)}
                  </span>
                )}
              </div>
            </div>
            {/* Vehicle */}
            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle</label>
              <input
                type="text"
                id="vehicleType"
                value={newDriver.vehicleType}
                onChange={(e) => handleInputChange(e, 'vehicleType')}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
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
                onChange={(e) => handleInputChange(e, 'vehicleRegNo')}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
                required
                placeholder="12-1234 or AB-1234 or ABC-1234"
              />
              <p className="mt-1 text-sm text-gray-500">
                Format: 12-1234, AB-1234, or ABC-1234
              </p>
            </div>
            {/* Driver License Number */}
            <div>
              <label htmlFor="driverLicenceNo" className="block text-sm font-medium text-gray-700">Driver License Number</label>
              <input
                type="text"
                id="driverLicenceNo"
                value={newDriver.driverLicenceNo}
                onChange={(e) => handleInputChange(e, 'driverLicenceNo')}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none p-2 transition duration-200"
                required
                placeholder="A1234567"
              />
              <p className="mt-1 text-sm text-gray-500">
                Format: 1 capital letter followed by 7 digits (8 characters total)
              </p>
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
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">Vehicle</th>
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