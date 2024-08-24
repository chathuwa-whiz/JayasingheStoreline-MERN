import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCreateDeliveryMutation, useUploadDeliveryImageMutation } from "../redux/api/deliveryApiSlice";
import { useGetOrdersQuery } from "../redux/api/orderApiSlice";
import { toast } from "react-hot-toast";

export default function AddDelivery() {

    const { data: orders, isLoading, isError } = useGetOrdersQuery();

    
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error</div>
    
    // Check if orders exist
    const latestOrder = orders && orders.length > 0 ? orders[orders.length - 1] : null;

    const products = JSON.parse(latestOrder.orderItems[0]);

    console.log(products);
    

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
        if (latestOrder) {
            // Prefill form fields with data from the latest order
            setItemsPrice(latestOrder.itemsPrice || 0);
            setFirstName(latestOrder.firstName || '');
            setLastName(latestOrder.lastName || '');
            setTelephoneNo(latestOrder.telephoneNo || '');
            setAddress(latestOrder.address || '');
            setCity(latestOrder.city || '');
            setProvince(latestOrder.province || '');
            setPostalCode(latestOrder.postalCode || '');
            setDeliveryPrice(latestOrder.deliveryPrice || 0);
        }
    }, [latestOrder]);

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
            deliveryData.append("deliveryItem", products.forEach(product => product.name));
            deliveryData.append("from", "MAINSTORE");
            deliveryData.append("to", latestOrder.address);
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

            {/* Delivery Products */}
            <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Delivery Products</h2>
                {products && products.map((product) => (
                    <div key={product._id} className="mb-4">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p>Price: Rs.{product.newProductPrice}.00</p>
                        <p>Quantity: {product.qty}</p>
                    </div>
                ))}
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
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700">Total Price</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Total price"
                        value={totalPrice}
                        readOnly
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6"
                    onClick={handleSubmit}
                >
                    Create Delivery
                </button>
            </div>
        </div>
    )
}
