import React, { useEffect, useState } from 'react';
import { useGetSupplierByIdQuery, useUpdateSupplierMutation, useDeleteSupplierMutation, useUploadSupplierImageMutation } from "../redux/api/supplierApiSlice";
import { useParams } from 'react-router';
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from 'react-icons/fa';

const areaCodes = {
  '011': 'Colombo', '031': 'Negombo', '038': 'Panadura', '055': 'Badulla',
  // ... (rest of the area codes)
};

const networkCodes = {
  '070': 'Mobitel', '071': 'Mobitel', '072': 'Hutch', '074': 'Dialog',
  '076': 'Dialog', '077': 'Dialog', '078': 'Hutch'
};

const supplierTypes = [
  "Manufacturer", "Wholesaler", "Distributor", "Importer",
  "Artisan/Craftsman", "Farmer/Producer", "Service Provider",
  "Dropshipper", "Retailer", "Other"
];

export default function SupplierDetailsForm() {
  const params = useParams();
  const { data: supplierData } = useGetSupplierByIdQuery(params._id);
  const [updateSupplier] = useUpdateSupplierMutation();
  const [deleteSupplier] = useDeleteSupplierMutation();
  const [uploadSupplierImage] = useUploadSupplierImageMutation();

  const [supplierName, setSupplierName] = useState('');
  const [SupplierID, setSupplierID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [Gender, setGender] = useState('');
  const [supplierMedia, setSupplierMedia] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [areaName, setAreaName] = useState('');

  useEffect(() => {
    if (supplierData) {
      setSupplierName(supplierData.name);
      setSupplierID(supplierData.nic);
      setPhoneNumber(supplierData.phone);
      setType(supplierData.type);
      setEmail(supplierData.email);
      setGender(supplierData.gender);
      setSupplierMedia(supplierData.image);
      setImageUrl(supplierData.image);
    }
  }, [supplierData]);

  // Updated validation functions
  const validateNIC = (nic) => {
    if (typeof nic !== 'string') {
      return false; // Invalid NIC if it's not a string
    }
    
    nic = nic.toLowerCase();
    
    if (nic.startsWith('2')) {
      return /^\d{12}$/.test(nic);
    } else {
      return /^\d{9}v$/.test(nic);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  };

  const validateName = (name) => {
    return name.length >= 3;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateName(supplierName)) {
      newErrors.supplierName = "Supplier name should be at least 3 characters long.";
    }
    if (!validateNIC(SupplierID)) {
      newErrors.SupplierID = "NIC must be either 9 digits followed by 'v/V' or 12 digits.";
    }
    if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    } else {
      const code = phoneNumber.substring(0, 3);
      if (!areaCodes[code] && !networkCodes[code]) {
        newErrors.phoneNumber = "Invalid phone number format.";
      }
    }
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!Type) {
      newErrors.Type = "Please select a supplier type.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    try {
      const formData = new FormData();
      formData.append("name", supplierName);
      formData.append("nic", SupplierID);
      formData.append("phone", phoneNumber);
      formData.append("email", email);
      formData.append("gender", Gender);
      formData.append("type", Type);
      formData.append("image", supplierMedia);

      const data = await updateSupplier({ supplierId: params._id, formData });

      if (data?.error) {
        toast.error("Supplier update failed. Try again.");
      } else {
        toast.success("Supplier updated successfully.");
        setTimeout(() => {
          toast.dismiss();
          window.location.href = "/supplier/supplierlist";
        }, 2000);
      }
    } catch (error) {
      console.log("ERROR : ", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this supplier?");
      if (!answer) return;

      const data = await deleteSupplier(params._id);

      if (data.error) {
        toast.error("Delete failed. Try again.");
        return;
      } else {
        toast.success("Supplier deleted successfully.");
        setTimeout(() => {
          toast.dismiss();
          window.location.href = "/supplier/supplierlist";
        }, 2000);
      }

    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
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

  const handleNameChange = (e) => {
    const value = e.target.value;
    setSupplierName(value);
  };

  const handleNICChange = (e) => {
    let value = e.target.value.toLowerCase();
    
    if (value.startsWith('2')) {
      value = value.replace(/[^\d]/g, '').slice(0, 12);
    } else {
      value = value.replace(/[^\d]/g, '').slice(0, 9);
      if (value.length === 9 && !value.endsWith('v')) {
        value += 'v';
      }
    }
    
    setSupplierID(value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
      
      if (value.length >= 3) {
        const code = value.substring(0, 3);
        if (areaCodes[code]) {
          setAreaName(areaCodes[code]);
        } else if (networkCodes[code]) {
          setAreaName(networkCodes[code]);
        } else {
          setAreaName('');
        }
      } else {
        setAreaName('');
      }
    } else {
      toast.error('Phone number must be numeric and no longer than 10 digits');
    }
  };

  return (
    <div className="flex bg-gray-200 min-h-screen">
      <div className="w-3/4 p-8">
        <h2 className="text-2xl font-bold mb-6">Supplier Update Details</h2>
        <div className="flex">
          <div className="w-2/3 pr-8">
            <h3 className="text-lg font-semibold mb-4 text-orange-500">General Information</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="supplierName">Supplier Name</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="supplierName"
                  type="text"
                  value={supplierName}
                  onChange={handleNameChange}
                />
                {errors.supplierName && <p className="text-red-500 text-sm">{errors.supplierName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="SupplierID">NIC</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="SupplierID"
                  type="text"
                  value={SupplierID}
                  onChange={handleNICChange}
                  maxLength={12}
                />
                {errors.SupplierID && <p className="text-red-500 text-sm">{errors.SupplierID}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">Phone Number</label>
                <div className="relative">
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    maxLength={10}
                  />
                  {areaName && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      {areaName}
                    </span>
                  )}
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="Type">Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  id="Type"
                  value={Type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Select Supplier Type</option>
                  {supplierTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                {errors.Type && <p className="text-red-500 text-sm">{errors.Type}</p>}
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
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  id="Gender"
                  value={Gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-orange-500 text-white px-6 py-2 rounded font-medium"
                  type="submit"
                >
                  Update Supplier
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded font-medium"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete Supplier
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/3">
            <h3 className="text-lg font-semibold mb-4 text-orange-500">Supplier Image</h3>
            <div className="border-2 border-dashed border-orange-300 rounded-md p-4 text-center">
              <input
                type="file"
                id="supplierMedia"
                accept="image/*"
                onChange={handleMediaChange}
                className="hidden"
              />
              <label
                htmlFor="supplierMedia"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="Supplier" className="w-full h-48 object-cover rounded-md mb-4" />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                    <FaCloudUploadAlt className="text-5xl text-orange-500" />
                  </div>
                )}
                <span className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
                  {imageUrl ? 'Change Image' : 'Upload Image'}
                </span>
              </label>
              {imageUrl && (
                <button
                  onClick={() => {
                    setImageUrl(null);
                    setSupplierMedia('');
                  }}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Remove Image
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Max file size: 5MB. Supported formats: JPG, PNG, GIF.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}