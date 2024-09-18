import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateSupplierMutation, useUploadSupplierImageMutation } from "../redux/api/supplierApiSlice";
import toast from 'react-hot-toast';

export default function SupplierDetailsForm() {
  const navigate = useNavigate();
  const [createSupplier] = useCreateSupplierMutation();
  const [uploadSupplierImage] = useUploadSupplierImageMutation();

  const [supplierName, setSupplierName] = useState('');
  const [NIC, setNIC] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [Gender, setGender] = useState('');
  const [supplierMedia, setSupplierMedia] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateNIC = (NIC) => /(^\d{9}[vV]$)|(^\d{12}$)/.test(NIC);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone); // Assumes a 10-digit phone number
  const validateName = (name) => name.length >= 3;

  const validateForm = () => {
    const newErrors = {};
    if (!validateName(supplierName)) {
      newErrors.supplierName = "Name should be at least 3 characters long.";
    }
    if (!validateNIC(NIC)) {
      newErrors.NIC = "NIC must be either 9 digits followed by 'v/V' or 12 digits.";
    }
    if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits long.";
    }
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Exit if the form is invalid
    }

    try {
      const supplierData = new FormData();
      supplierData.append("name", supplierName);
      supplierData.append("SNIC", NIC);
      supplierData.append("email", email);
      supplierData.append("gender", Gender);
      supplierData.append("phone", phoneNumber);
      supplierData.append("type", Type);
      supplierData.append("image", supplierMedia);

      const data = await createSupplier(supplierData);
      if (data.error) {
        console.log("error data : ", data);
        toast.error("Supplier create failed. Try Again.");
      } else {
        toast.success("Supplier created successfully");
        setTimeout(() => {
          navigate("/supplier/SupplierList");
        }, 2000);
      }
      console.log("data : ", data);
      
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleMediaChange = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
        const res = await uploadSupplierImage(formData).unwrap();
        toast.success(res.message);
        setSupplierMedia(res.image);
        setImageUrl(res.image);
    } catch (error) {
        toast.error(error?.data?.message || error.error);
    }
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
                {errors.supplierName && <p className="text-red-500 text-sm">{errors.supplierName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="SupplierID"> NIC</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="SupplierID"
                  type="text"
                  value={NIC}
                  onChange={(e) => setNIC(e.target.value)}
                />
                {errors.NIC && <p className="text-red-500 text-sm">{errors.NIC}</p>}
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
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
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
                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                name='image'
                accept='image/*'
                onChange={handleMediaChange}
              />
              {imageUrl && (
                  <div className="mt-4">
                      <img src={imageUrl} alt="Product" className="max-h-40 object-contain mx-auto" />
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
