import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useCreateProductMutation,  useUploadProductImageMutation} from "../redux/api/productApiSlice";
import {useFetchCategoriesQuery} from "../redux/api/categoryApiSlice";
import {toast} from "react-hot-toast";

export default function AddProducts() {

    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [empStatus, setEmploymentStatus] = useState('');
    const [basicSalary, setBasicSalary] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [bankDetails, setBankDetails] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [skills, setSkills] = useState('');
    const [note, setNote] = useState('');
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const productData = new FormData();
          productData.append("image", image);
          productData.append("id", id);
          productData.append("name", name);
          productData.append("dob", dob);
          productData.append("gender", gender);
          productData.append("contactNumber", contactNumber);
          productData.append("email", email);
          productData.append("address", address);
          productData.append("jobTitle", jobTitle);
          productData.append("empStatus", empStatus);
          productData.append("basicSalary", basicSalary);
          productData.append("joinDate", joinDate);
          productData.append("bankDetails", bankDetails);
          productData.append("emergencyContact", emergencyContact);
          productData.append("skills", skills);
          productData.append("note", note);

          
          const data = await createProduct(productData);
          console.log("data : ", data);
    
          if (data.error) {

            toast.error("Product create failed. Try Again.");

          } else {

            toast.success(`product is created`);
            setTimeout(() => {
                toast.dismiss();
                window.location.href = "/inventory/products";
            }, 2000);

          }
        } catch (error) {
          console.error(error);
          toast.error("Product create failed. Try Again.");
        }
    };
    
      const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
    
        try {
          const res = await uploadProductImage(formData).unwrap();
          toast.success(res.message);
          setImage(res.image);
          setImageUrl(res.image);
        } catch (error) {
          toast.error(error?.data?.message || error.error);
        }
      };

  return (
    <div className="p-8 grid grid-cols-2 gap-10">
        {/* General Information */}
        <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Employee General Information</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Employee ID</label>
                <input
                    type="text"
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    placeholder="HR0011"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <label className="block text-gray-700">Full Name</label>
                <input
                    type="text"
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    placeholder="Kande Gamarallage Deshan Abhishek Nissanka"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="block text-gray-700">Date of Birth</label>
                <input
                    type="date"
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    placeholder="2001/09/25"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                />
                <label className="block text-gray-700">Gender</label>
                <input
                    type="text"
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    placeholder="Male / Female"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />
                <label className="block text-gray-700">Contact Number</label>
                <input
                    type="number"
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    placeholder="+94706625702"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
                <label className="block text-gray-700">E-Mail</label>
                <input
                    type="email"
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    placeholder="deshan@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="block text-gray-700">Recidantial Address</label>
                <input
                    type="text"
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    placeholder="I 146/2,Welivita, Malabe"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
        </div>

        {/* Product Media */}
        <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Employee Profile Photo</h2>
            <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg bg-blue-50">
                <p className="mb-2">Profile Photo</p>
                <input 
                    type="file" 
                    name='image'
                    accept='image/*'
                    onChange={uploadFileHandler} 
                    className="px-4 py-2 border rounded-lg text-blue-500 border-blue-500"
                />
                {imageUrl && (
                    <div className="mt-4">
                        <img src={imageUrl} alt="Profile Photo" className="max-h-40 object-contain mx-auto" />
                    </div>
                )}
            </div>
        </div>

        {/* Pricing */}
        <div className="border rounded-lg p-4 col-span-1">
            <h2 className="text-xl font-semibold mb-4">Position Related</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">Job Title</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Human Resource Manager"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Employment Status</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Full time / Part time"
                        value={empStatus}
                        onChange={(e) => setEmploymentStatus(e.target.value)}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700">Basic Salary</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Rs.65,575.00"
                        value={basicSalary}
                        onChange={(e) => setBasicSalary(e.target.value)}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700">Date of Join</label>
                    <input
                        type="date"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="2024/01/01"
                        value={joinDate}
                        onChange={(e) => setJoinDate(e.target.value)}
                    />
                </div>
            </div>
        </div>

        {/* Category */}
        <div className="border rounded-lg p-4 col-span-1">
            <h2 className="text-xl font-semibold mb-4">Payroll Details</h2>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-gray-700">Bank Details</label>
                    <textarea
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    rows="4"
                    placeholder="Name:
Bank:
Branch:
Account Number:"
                    value={bankDetails}
                    onChange={(e) => setBankDetails(e.target.value)}
                    />
                </div>
            </div>
        </div>

        {/* Inventory */}
        <div className="border rounded-lg p-4 col-span-2">
            <h2 className="text-xl font-semibold mb-4">Other Details</h2>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-gray-700">Emergency Contact Number</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="+94706625702"
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Skills</label>
                    <textarea
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    rows="4"
                    placeholder="Any Skill"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Notes</label>
                    <textarea
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    rows="4"
                    placeholder="Any Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    />
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="col-span-2 flex justify-end space-x-4">
            <button 
                type="button" 
                className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                onClick={() => navigate("/employee")}
            >
                Discard Changes
            </button>
            <button 
                onClick={handleSubmit}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
                Add New Head
            </button>
        </div>
    </div>
  )
}
