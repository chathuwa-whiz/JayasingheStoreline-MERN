import React, { useEffect, useState } from 'react';
import { useGetSupplierByIdQuery, useUpdateSupplierMutation, useDeleteSupplierMutation, useUploadSupplierImageMutation } from "../redux/api/supplierApiSlice";
import { useParams } from 'react-router';
import toast from "react-hot-toast";

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

  // Validation functions
  const validateNIC = (nic) => /(^\d{9}[vV]$)|(^\d{12}$)/.test(nic);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone); // Assumes a 10-digit phone number
  const validateName = (name) => name.length >= 3;

  const validateForm = () => {
    const newErrors = {};
    if (!validateName(supplierName)) {
      newErrors.supplierName = "Name should be at least 3 characters long.";
    }
    if (!validateNIC(SupplierID)) {
      newErrors.SupplierID = "NIC must be either 9 digits followed by 'v/V' or 12 digits.";
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
                  value={SupplierID}
                  onChange={(e) => setSupplierID(e.target.value)}
                />
                {errors.SupplierID && <p className="text-red-500 text-sm">{errors.SupplierID}</p>}
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
            <h3 className="text-lg font-semibold mb-4 text-orange-500">Supplier Media</h3>
            <div className="mb-4">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Supplier"
                  className="w-full h-auto object-cover mb-4"
                />
              )}
              <label
                className="block text-gray-700 mb-2"
                htmlFor="supplierMedia"
              >
                Upload Supplier Image
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
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
