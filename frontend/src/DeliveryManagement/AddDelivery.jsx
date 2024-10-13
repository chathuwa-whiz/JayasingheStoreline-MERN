import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCreateDeliveryMutation } from "../redux/api/deliveryApiSlice";
import { useGetOrdersQuery, useUpdateOrderMutation } from '../redux/api/orderApiSlice';
import { toast } from "react-hot-toast";

export default function AddDelivery() {
    const [image, setImage] = useState(null);
    const [orderId, setOrderId] = useState('');
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
    const [deliveryStatus, setDeliveryStatus] = useState('Pending');
    const [Items, setItems] = useState([]);

    console.log("Items:", Items);

    const [createDelivery] = useCreateDeliveryMutation();
    const { data: orders, isLoading, isError } = useGetOrdersQuery();
    const navigate = useNavigate();
    const [updateOrder] = useUpdateOrderMutation();
    useEffect(() => {
        setTotalPrice(parseFloat(itemsPrice) + parseFloat(deliveryPrice));
    }, [itemsPrice, deliveryPrice]);

    const handleOrderClick = (order) => {
        setFirstName(order.firstName);
        setLastName(order.lastName);
        setTelephoneNo(order.telephoneNo);
        setAddress(order.address);
        setCity(order.city);
        setProvince(order.province);
        setPostalCode(order.postalCode);
        setItemsPrice(order.itemsPrice);
        setDeliveryPrice(order.deliveryPrice);
        setItems(JSON.parse(order.orderItems));
        setOrderId(order.orderId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const deliveryData = new FormData();
            if (image) {
                deliveryData.append("image", image);
            }
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
            deliveryData.append("deliveryStatus", deliveryStatus);
            deliveryData.append("deliveryItem", JSON.stringify(Items));
            deliveryData.append("orderId", orderId);
            const response = await createDelivery(deliveryData);
            if (response.error) {
                toast.error("Delivery creation failed. Try Again.");
                console.log("Delivery creation error:", response.error);
            } else {
                toast.success("Delivery created successfully");
                setTimeout(() => {
                    toast.dismiss();
                    navigate("/delivery/deliverydetail");
                }, 2000);
            }
        } catch (error) {
            console.error("Delivery creation error:", error);
            toast.error("Delivery creation failed. Try Again.");
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Delivery</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pending Orders List */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-blue-600 text-white p-4">
                        <h2 className="text-xl font-semibold">Pending Orders</h2>
                    </div>
                    <div className="p-4 h-[calc(100vh-200px)] overflow-y-auto">
                        {isLoading ? (
                            <p className="text-gray-600">Loading orders...</p>
                        ) : isError ? (
                            <p className="text-red-500">Error loading orders</p>
                        ) : orders?.length > 0 ? (
                            orders.filter(order => order.status === 'Pending').map(order => (
                                <div
                                    key={order._id}
                                    className="mb-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition duration-300"
                                    onClick={() => handleOrderClick(order)}
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">{order.firstName} {order.lastName}</h3>
                                    <p className="text-gray-600">Order ID: {order.orderId}</p>
                                    <p className="text-gray-600">Items Price: Rs.{order.itemsPrice}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No pending orders available</p>
                        )}
                    </div>
                </div>

                {/* Delivery Information */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-green-600 text-white p-4">
                        <h2 className="text-xl font-semibold">Delivery Information</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">First Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                                    placeholder="Enter first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                                    placeholder="Enter last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Telephone Number</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                                placeholder="Enter telephone number"
                                value={telephoneNo}
                                onChange={(e) => setTelephoneNo(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Address</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                                placeholder="Enter address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">City</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                                    placeholder="Enter city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Province</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                                    placeholder="Enter province"
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Postal Code</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                                    placeholder="Enter postal code"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Items</label>
                            {Items.map((item) => (
                                <div key={item._id} className="flex space-x-4 mb-2">
                                    <input
                                        type="text"
                                        className="flex-grow p-3 border rounded-lg bg-gray-50"
                                        value={item.name}
                                        disabled
                                    />
                                    <input
                                        type="number"
                                        className="w-24 p-3 border rounded-lg bg-gray-50"
                                        value={item.qty}
                                        disabled
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-500 transition duration-300"
                        >
                            Submit Delivery
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}