import React, { useEffect, useState } from 'react';
import { useGetSupplierByIdQuery, useUpdateSupplierMutation, useDeleteSupplierMutation, useUploadSupplierImageMutation } from "../redux/api/supplierApiSlice";
import { useParams } from 'react-router';
import toast from "react-hot-toast";

export default function SupplierDetailsForm() {

  const params = useParams();

  const {data: supplierData} = useGetSupplierByIdQuery(params._id);
  const [updateSupplier] = useUpdateSupplierMutation();
  const [deleteSupplier] = useDeleteSupplierMutation();
  const [uploadSupplierImage] = useUploadSupplierImageMutation();

  console.log(supplierData);
  

  const [supplierName, setSupplierName] = useState(supplierData?.name);
  const [SupplierID, setSupplierID] = useState(supplierData?._id);
  const [phoneNumber, setPhoneNumber] = useState(supplierData?.phone);
  const [Type ,setType] = useState(supplierData?.type);
  const [Date ,setDate] = useState(supplierData?.updatedAt);
  const [email, setEmail] = useState(supplierData?.email);
  const [Gender, setGender] = useState(supplierData?.gender);
  const [supplierMedia, setSupplierMedia] = useState(supplierData?.image);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if(supplierData && supplierData._id) {
      setSupplierName(supplierData.name);
      setSupplierID(supplierData._id);
      setPhoneNumber(supplierData.phone);
      setType(supplierData.type);
      setDate(supplierData.updatedAt);
      setEmail(supplierData.email);
      setGender(supplierData.gender);
      setSupplierMedia(supplierData.image);
    }
  }, [supplierData]);

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this supplier?"
      );
      if (!answer) return;

      const data = await deleteSupplier(params._id);

      if(data.error) {
        toast.error("Delete failed. Try again.", data.error);
        return;
      } else {
        toast.success(`supplier is deleted`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("name", supplierName);
      formData.append("image", supplierMedia);
      formData.append("phone", phoneNumber);
      formData.append("email", email);
      formData.append("gender", Gender);
      formData.append("type", Type);

      const data = await updateSupplier({supplierId: params._id, formData});

      if(data?.error) {
        toast.error("Supplier update Failed");
      } else {
        toast.success("Supplier Updated");
        setTimeout(() => {
          toast.dismiss();
          window.location.href = "/supplier/supplierlist";
        })
      }
    } catch (error) {
      console.log("ERROR : ", error);      
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
            name='image'
            accept='image/*'
            onChange={handleMediaChange}
          />
          {imageUrl && (
            <img src={imageUrl} alt="Supplier Media" className="mt-2 h-20" />
          )}
        </div>
        
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Update
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleDelete}
        >
          Delete
        </button>
      </form>
    </div>
    
  );
}