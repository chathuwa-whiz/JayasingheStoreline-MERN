import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCreateDeliveryMutation, useUploadDeliveryImageMutation } from "../redux/api/deliveryApiSlice";
import { useGetOrdersQuery } from "../redux/api/orderApiSlice";
import { toast } from "react-hot-toast";

export default function AddDelivery() {

    const { data: orders, isLoading, isError } = useGetOrdersQuery();


    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [itemsPrice, setItemsPrice] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [telephoneNo, setTelephoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const navigate = useNavigate();

    const [uploadDeliveryImage] = useUploadDeliveryImageMutation();
    const [createDelivery] = useCreateDeliveryMutation();

    useEffect(() => {
        setTotalPrice(parseFloat(itemsPrice) + parseFloat(deliveryPrice));
    }, [itemsPrice, deliveryPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const deliveryData = new FormData();
            deliveryData.append("image", image);
            deliveryData.append("itemsPrice", itemsPrice);
            deliveryData.append("deliveryPrice", deliveryPrice);
            deliveryData.append("totalPrice", totalPrice);
            deliveryData.append("firstName", firstName);
            deliveryData.append("lastName", lastName);
            deliveryData.append("telephoneNo", telephoneNo);
            deliveryData.append("address", address);
            deliveryData.append("city", city);
            deliveryData.append("province", province);
            deliveryData.append("postalCode", postalCode);
            deliveryData.append("deliveryItem", "item");
            deliveryData.append("from", "From");
            deliveryData.append("to", "To");
            deliveryData.append("driver", "Driver");
            deliveryData.append("vehicleType", "Vehicle Type");

            const data = await createDelivery(deliveryData);
            
            if (data.error) {
                console.log(data.error);                
                toast.error("Delivery creation failed. Try Again.");
            } else {
                toast.success(`Delivery created successfully`);
                setTimeout(() => {
                    toast.dismiss();
                    window.location.href = "/delivery/deliverydetail";
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            toast.error("Delivery creation failed. Try Again.");
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        
        try {
            const res = await uploadDeliveryImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    return (
        <div className="p-8 grid grid-cols-2 gap-10">
            {/* General Information */}
            <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Telephone Number</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter telephone number"
                        value={telephoneNo}
                        onChange={(e) => setTelephoneNo(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-700">City</label>
                        <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Province</label>
                        <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                            placeholder="Enter province"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Postal Code</label>
                        <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                            placeholder="Enter postal code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Delivery Media */}
            <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Delivery Media</h2>
                <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg bg-blue-50">
                    <p className="mb-2">Delivery Photo</p>
                    <input 
                        type="file" 
                        name='image'
                        accept='image/*'
                        onChange={uploadFileHandler} 
                        className="px-4 py-2 border rounded-lg text-blue-500 border-blue-500"
                    />
                    {imageUrl && (
                        <div className="mt-4">
                            <img src={imageUrl} alt="Delivery" className="max-h-40 object-contain mx-auto" />
                        </div>
                    )}
                </div>
            </div>

            {/* Pricing */}
            <div className="border rounded-lg p-4 col-span-2">
                <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Items Price</label>
                        <input
                            type="number"
                            className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                            placeholder="Enter items price"
                            value={itemsPrice}
                            onChange={(e) => setItemsPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Delivery Price</label>
                        <input
                            type="number"
                            className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                            placeholder="Enter delivery price"
                            value={deliveryPrice}
                            onChange={(e) => setDeliveryPrice(e.target.value)}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-gray-700">Total Price</label>
                        <input
                            type="number"
                            className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                            value={totalPrice}
                            readOnly
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="col-span-2 flex justify-end space-x-4">
                <button 
                    type="button" 
                    className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                    onClick={() => navigate("/delivery")}
                >
                    Discard Changes
                </button>
                <button 
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                    Add Delivery
                </button>
            </div>
        </div>
    )
}
