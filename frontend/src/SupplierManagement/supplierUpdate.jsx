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
  const [Date, setDate] = useState('');
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
      setDate(supplierData.updatedAt);
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
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Supplier Update Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supplierName">
            Supplier Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.supplierName ? 'border-red-500' : ''}`}
            id="supplierName"
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
          {errors.supplierName && <p className="text-red-500 text-sm">{errors.supplierName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="SupplierID">
            NIC
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.SupplierID ? 'border-red-500' : ''}`}
            id="SupplierID"
            type="text"
            value={SupplierID}
            onChange={(e) => setSupplierID(e.target.value)}
          />
          {errors.SupplierID && <p className="text-red-500 text-sm">{errors.SupplierID}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phoneNumber ? 'border-red-500' : ''}`}
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Type">
            Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Type"
            type="text"
            value={Type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Date">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Date"
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Gender">
            Gender
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Gender"
            value={Gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supplierImage">
            Supplier Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="supplierImage"
            type="file"
            onChange={handleMediaChange}
          />
          {imageUrl && <img src={imageUrl} alt="Supplier" className="mt-2 w-32 h-32 object-cover rounded" />}
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Supplier
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete Supplier
          </button>
        </div>
      </form>
    </div>
  );
}
