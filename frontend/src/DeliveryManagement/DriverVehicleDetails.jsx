import React, { useState, useEffect } from 'react';
import { useGetDriversQuery, useCreateDriverMutation, useUpdateDriverMutation, useDeleteDriverMutation } from '../redux/api/driverApiSlice';
import { FaEdit, FaTrash, FaSearch, FaDownload, FaMoon, FaSun } from 'react-icons/fa';
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
  const [darkMode, setDarkMode] = useState(false);

  const areaCodes = {
    '011': 'Colombo', '031': 'Negombo', '038': 'Panadura', '055': 'Badulla',
    '021': 'Jaffna', '032': 'Puttalam', '041': 'Matara', '057': 'Bandarawela',
    '023': 'Mannar', '033': 'Gampaha', '045': 'Ratnapura', '063': 'Ampara',
    '024': 'Vavuniya', '034': 'Kalutara', '047': 'Hambantota', '065': 'Batticaloa',
    '025': 'Anuradhapura', '035': 'Kegalle', '051': 'Hatton', '066': 'Matale',
    '026': 'Trincomalee', '036': 'Avissawella', '052': 'Nuwara Eliya', '067': 'Kalmunai',
    '027': 'Polonnaruwa', '037': 'Kurunegala', '054': 'Nawalapitiya', '081': 'Kandy'
  };

  const networkCodes = ['070', '071', '072', '074', '075', '076', '077', '078'];

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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const formatVehicleRegNo = (value) => {
    // Remove any existing hyphens and convert input to uppercase
    let sanitizedValue = value.replace('-', '').toUpperCase();
    
    // Check if the sanitized value has exactly 6 characters (12-1234 or AB-1234)
    if (sanitizedValue.length === 6) {
      // Check for the format 12-1234 (2 digits + 4 digits)
      if (/^\d{2}\d{4}$/.test(sanitizedValue)) {
        return sanitizedValue.slice(0, 2) + '-' + sanitizedValue.slice(2);
      }
      // Check for the format AB-1234 (2 letters + 4 digits)
      if (/^[A-Z]{2}\d{4}$/.test(sanitizedValue)) {
        return sanitizedValue.slice(0, 2) + '-' + sanitizedValue.slice(2);
      }
    } 
    // Check if the sanitized value has exactly 7 characters for ABC-1234
    else if (sanitizedValue.length === 7 && /^[A-Z]{3}\d{4}$/.test(sanitizedValue)) {
      return sanitizedValue.slice(0, 3) + '-' + sanitizedValue.slice(3);
    }
    
    // Return sanitized value if no formatting conditions are met
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
      if (birthYear < 2000) {
        // For birth years before 2000 (9 digit + V format)
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
        // For birth years 2000 and after (12 digit format)
        value = value.slice(0, 12).replace(/\D/g, '');
        if (value.length >= 4) {
          const yearPrefix = value.slice(0, 4);
          if (yearPrefix !== String(birthYear)) {
            value = String(birthYear) + value.slice(4);
          }
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
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const img = new Image();
    img.src = logo;

    img.onload = function () {
      const generatePDF = () => {
        // Header
        doc.addImage(img, 'PNG', 14, 10, 30, 30);
        doc.setFontSize(25);
        doc.text('Drivers List Report', pageWidth / 2, 35, { align: 'center' });
        
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString();
        doc.setFontSize(10);
        doc.text(`Date: ${dateString}`, pageWidth - 15, 15, { align: 'right' });
        doc.text('CONFIDENTIAL - INTERNAL USE ONLY', 14, 45);
        doc.text('Contact: +94 11 234 5678 | Email: info@jayasinghe.com', pageWidth - 15, 22, { align: 'right' });

        // Add a line to separate the header
        doc.setLineWidth(0.5);
        doc.line(14, 50, pageWidth - 14, 50);

        // Prepare data for the PDF
        const rows = drivers.map(driver => [
          driver.nic,
          driver.name,
          driver.birthday.split('T')[0],
          driver.telephoneNo,
          driver.vehicleType,
          driver.vehicleRegNo,
          driver.driverLicenceNo,
        ]);

        // Add autoTable to the PDF
        autoTable(doc, {
          head: [['NIC', 'Name', 'DOB', 'Telephone', 'Vehicle Type', 'Vehicle Reg No', 'Driver License No']],
          body: rows,
          startY: 55, // Adjusted to accommodate the header line
          didDrawPage: (data) => {
            // Add a line to separate the footer
            doc.setLineWidth(0.5);
            doc.line(14, pageHeight - 20, pageWidth - 14, pageHeight - 20);

            // Footer
            doc.setFontSize(9);
            doc.text('Jayasinghe Storelines PVT (LTD)', 14, pageHeight - 15);
            doc.text('No. 123, Main Street, Colombo, Sri Lanka', 14, pageHeight - 10);
            doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 14, pageHeight - 15, { align: 'right' });
            doc.text('Version 1.0', pageWidth / 2, pageHeight - 15, { align: 'center' });
            doc.text('This document is confidential and intended for internal use only.', pageWidth / 1.48, pageHeight - 10, { align: 'center' });
          },
        });

        // Save the PDF
        doc.save('Drivers_List_Report.pdf');
      };

      generatePDF();
    };

    img.onerror = function () {
      console.error('Image loading failed. PDF will be generated without the logo.');
      generatePDFWithoutLogo();
    };
  };

  const generatePDFWithoutLogo = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Header (without logo)
    doc.setFontSize(25);
    doc.text('Drivers List Report', pageWidth / 2, 35, { align: 'center' });
    
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Date: ${dateString}`, pageWidth - 15, 15, { align: 'right' });
    doc.text('CONFIDENTIAL - INTERNAL USE ONLY', 14, 45);
    doc.text('Contact: +94 11 234 5678 | Email: info@jayasinghe.com', pageWidth - 15, 22, { align: 'right' });

    // Add a line to separate the header
    doc.setLineWidth(0.5);
    doc.line(14, 50, pageWidth - 14, 50);

    // Prepare data for the PDF
    const rows = drivers.map(driver => [
      driver.nic,
      driver.name,
      driver.birthday.split('T')[0],
      driver.telephoneNo,
      driver.vehicleType,
      driver.vehicleRegNo,
      driver.driverLicenceNo,
    ]);

    // Add autoTable to the PDF
    autoTable(doc, {
      head: [['NIC', 'Name', 'DOB', 'Telephone', 'Vehicle Type', 'Vehicle Reg No', 'Driver License No']],
      body: rows,
      startY: 55, // Adjusted to accommodate the header line
      didDrawPage: (data) => {
        // Add a line to separate the footer
        doc.setLineWidth(0.5);
        doc.line(14, pageHeight - 20, pageWidth - 14, pageHeight - 20);

        // Footer
        doc.setFontSize(8);
        doc.text('Jayasinghe Storelines PVT (LTD)', 14, pageHeight - 15);
        doc.text('No. 123, Main Street, Colombo, Sri Lanka', 14, pageHeight - 10);
        doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 15, pageHeight - 15, { align: 'right' });
        doc.text('Version 1.0', pageWidth / 2, pageHeight - 15, { align: 'center' });
        doc.text('This document is confidential and intended for internal use only.', pageWidth / 2, pageHeight - 10, { align: 'center' });
      },
    });

    // Save the PDF
    doc.save('Drivers_List_Report.pdf');
  };

  // Filter drivers based on the search term
  const filteredDrivers = drivers?.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || driver.nic.includes(searchTerm)
  );

  return (
    <div className={`container mx-auto p-4 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-yellow-400'}`}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Form Section */}
      <div className={`rounded-lg p-6 shadow-lg mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-3xl font-bold mb-6 border-b pb-2 ${darkMode ? 'text-gray-200 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
          {editingDriver ? 'Edit Driver' : 'Add New Driver'}
        </h2>
        <form onSubmit={handleCreateOrUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name (English letters only)</label>
              <input
                type="text"
                id="name"
                value={newDriver.name}
                onChange={(e) => handleInputChange(e, 'name')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
                pattern="[A-Za-z\s]+"
                title="Please enter English letters only"
              />
            </div>
            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date of Birth</label>
              <input
                type="date"
                id="dob"
                value={newDriver.birthday}
                onChange={(e) => handleInputChange(e, 'birthday')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
                min={minDate}
                max={maxDate}
              />
              <p className="mt-1 text-xs text-gray-500">Driver must be between 18 and 40 years old</p>
            </div>
            {/* NIC */}
            <div>
              <label htmlFor="nic" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>NIC</label>
              <input
                type="text"
                id="nic"
                value={newDriver.nic}
                onChange={(e) => handleInputChange(e, 'nic')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
                placeholder={new Date(newDriver.birthday).getFullYear() < 2001 ? "YYXXXXXXXXV" : "20XXXXXXXXXX"}
              />
              <p className="mt-1 text-xs text-gray-500">
                {new Date(newDriver.birthday).getFullYear() < 2001 
                  ? "10 digits with 'V' at the end, starting with birth year's last 2 digits" 
                  : "12 digits, starting with '20'"}
              </p>
            </div>
            {/* Telephone Number */}
            <div>
              <label htmlFor="telephoneNo" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Telephone/Mobile Number</label>
              <div className="relative">
                <input
                  type="text"
                  id="telephoneNo"
                  value={newDriver.telephoneNo}
                  onChange={(e) => handleInputChange(e, 'telephoneNo')}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
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
              <label htmlFor="vehicleType" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Vehicle</label>
              <input
                type="text"
                id="vehicleType"
                value={newDriver.vehicleType}
                onChange={(e) => handleInputChange(e, 'vehicleType')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              />
            </div>
            {/* Vehicle Registration Number */}
            <div>
              <label htmlFor="vehicleRegNo" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Vehicle Registration Number</label>
              <input
                type="text"
                id="vehicleRegNo"
                value={newDriver.vehicleRegNo}
                onChange={(e) => handleInputChange(e, 'vehicleRegNo')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
                placeholder="12-1234 or AB-1234 or ABC-1234"
                maxLength={8}
              />
              <p className="mt-1 text-xs text-gray-500">Format: 12-1234, AB-1234, or ABC-1234</p>
            </div>
            {/* Driver License Number */}
            <div>
              <label htmlFor="driverLicenceNo" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Driver License Number</label>
              <input
                type="text"
                id="driverLicenceNo"
                value={newDriver.driverLicenceNo}
                onChange={(e) => handleInputChange(e, 'driverLicenceNo')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
                placeholder="A1234567"
              />
              <p className="mt-1 text-xs text-gray-500">Format: 1 capital letter followed by 7 digits</p>
            </div>
          </div>
          {/* Error Message */}
          {message.text && (
            <div className={`mt-4 p-2 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message.text}
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <button 
              type="button" 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200" 
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 shadow-md"
            >
              {editingDriver ? 'Update Driver' : 'Add Driver'}
            </button>
          </div>
        </form>
      </div>

      {/* Driver List Section */}
      <div className={`rounded-lg p-6 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-3xl font-bold mb-6 border-b pb-2 ${darkMode ? 'text-gray-200 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
          Driver List
        </h2>
        <div className="mb-4 flex items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by name or NIC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button 
            onClick={downloadPDF} 
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 flex items-center"
          >
            <FaDownload className="mr-2" /> Download PDF
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className={`min-w-full border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
            <thead>
              <tr className={darkMode ? 'bg-gray-800' : 'bg-gray-100'}>
                <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIC</th>
                <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telephone</th>
                <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Reg No</th>
                <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver License No</th>
                <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-600' : 'divide-gray-200'}`}>
              {filteredDrivers && filteredDrivers.length > 0 ? (
                filteredDrivers.map(driver => (
                  <tr key={driver._id} className={`transition duration-200 ${
                    darkMode 
                      ? 'hover:bg-gray-600' 
                      : 'hover:bg-gray-50'
                  }`}>
                    <td className="border px-4 py-2">{driver.nic}</td>
                    <td className="border px-4 py-2">{driver.name}</td>
                    <td className="border px-4 py-2">{driver.birthday.split('T')[0]}</td>
                    <td className="border px-4 py-2">{driver.telephoneNo}</td>
                    <td className="border px-4 py-2">{driver.vehicleType}</td>
                    <td className="border px-4 py-2">{driver.vehicleRegNo}</td>
                    <td className="border px-4 py-2">{driver.driverLicenceNo}</td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handleEdit(driver)} className="text-blue-600 hover:text-blue-800 mr-2">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(driver._id)} className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className={`border px-4 py-2 text-center text-${darkMode ? 'gray-400' : 'gray-500'}`}>No drivers found.</td>
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