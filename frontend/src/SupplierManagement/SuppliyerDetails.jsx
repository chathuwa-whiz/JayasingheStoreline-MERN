import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateSupplierMutation } from "../redux/api/supplierApiSlice";

export default function SupplierDetailsForm() {
  const navigate = useNavigate();
  const [createSupplier] = useCreateSupplierMutation();

  const [supplierName, setSupplierName] = useState('');
  const [SupplierID, setSupplierID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Type, setType] = useState('');
  const [Date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [Gender, setGender] = useState('');
  const [supplierMedia, setSupplierMedia] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const supplierData = new FormData();
    supplierData.append("name", supplierName);
    supplierData.append("email", email);
    supplierData.append("gender", Gender);
    supplierData.append("phone", phoneNumber);
    supplierData.append("type", Type);
    supplierData.append("image", supplierMedia);

    await createSupplier(supplierData);
    navigate("/supplier/supplierlist");
  };

  const handleMediaChange = (e) => {
    setSupplierMedia(e.target.files[0]);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      
      <div className="w-3/4 p-8">
        <h2 className="text-2xl font-bold mb-6">Supplier Details</h2>
        <div className="flex">
          <div className="w-2/3 pr-8">
            <h3 className="text-lg font-semibold mb-4">General Information</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="supplierName">Supplier Name</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="supplierName"
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="SupplierID">Supplier NIC</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="SupplierID"
                  type="text"
                  value={SupplierID}
                  onChange={(e) => setSupplierID(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">Phone Number</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="Type">Type</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="Type"
                  type="text"
                  value={Type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="Date">Date</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="Date"
                  type="text"
                  value={Date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="Gender">Gender</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="Gender"
                  type="text"
                  value={Gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
               
                <button
                  className="bg-orange-500 text-white px-6 py-2 rounded font-medium"
                  type="submit"
                >
                  Add Details
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/3">
            <h3 className="text-lg font-semibold mb-4">Supplier Media</h3>
            <div className="border border-dashed border-gray-300 rounded-md h-64 flex items-center justify-center">
              <label
                htmlFor="supplierMedia"
                className="text-orange-500 cursor-pointer"
              >
                Add Images
              </label>
              <input
                className="hidden"
                id="supplierMedia"
                type="file"
                onChange={handleMediaChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
