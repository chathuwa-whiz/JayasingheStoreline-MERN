import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const SupplierDetailsForm = () => {
  const [supplierName, setSupplierName] = useState('');
  const [ SupplierID, setSupplierID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Type ,setType] = useState('');
  const [Date ,setDate] = useState('');
  const [email, setEmail] = useState('');
  const [Gender, setGender] = useState('');
  const [supplierMedia, setSupplierMedia] = useState(null);
  
  const handleSubmit = () => {
    e.preventDefault();
    console.log('Supplier Details:', supplierName,  SupplierID, phoneNumber, Type, Date,email,Gender,supplierMedia);
   
  };
  const handleMediaChange = (e) => {
    setSupplierMedia(e.target.files[0]);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Supplier Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supplierName">
            Supplier Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="supplierName"
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor=" SupplierID">
            Supplier ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id=" SupplierID"
            type="text"
            value={ SupplierID}
            onChange={(e) => setSupplierID(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor=" Type">
            Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Type "
            type="text"
            value={ Type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor=" Date">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Date "
            type="text"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor=" Gender">
            Gender
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Gender "
            type="text"
            value={ Gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        {/* Supplier Media field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supplierMedia">
            Supplier Media
          </label>
          <input
            className="supplier-media shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="supplierMedia"
            type="file"
            onChange={handleMediaChange}
          />
        </div>
        
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
    
  );
};

export default SupplierDetailsForm;