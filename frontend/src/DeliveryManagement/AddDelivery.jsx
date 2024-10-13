import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCreateDeliveryMutation } from "../redux/api/deliveryApiSlice";
import { useGetOrdersQuery, useUpdateOrderMutation } from '../redux/api/orderApiSlice';
import { toast } from "react-hot-toast";
import { FaMoon, FaSun } from 'react-icons/fa';

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
    const [darkMode, setDarkMode] = useState(false);

    console.log("Items:", Items);

    const [createDelivery] = useCreateDeliveryMutation();
    const { data: orders, isLoading, isError } = useGetOrdersQuery();
    const navigate = useNavigate();
    const [updateOrder] = useUpdateOrderMutation();
    useEffect(() => {
        setTotalPrice(parseFloat(itemsPrice) + parseFloat(deliveryPrice));
    }, [itemsPrice, deliveryPrice]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

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

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`p-8 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Add New Delivery</h1>
                <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-yellow-400'}`}
                >
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pending Orders List */}
                <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className={`p-4 ${darkMode ? 'bg-blue-800' : 'bg-blue-600'} text-white`}>
                        <h2 className="text-xl font-semibold">Pending Orders</h2>
                    </div>
                    <div className="p-4 h-[calc(100vh-200px)] overflow-y-auto">
                        {isLoading ? (
                            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Loading orders...</p>
                        ) : isError ? (
                            <p className="text-red-500">Error loading orders</p>
                        ) : orders?.length > 0 ? (
                            orders.filter(order => order.status === 'Pending').map(order => (
                                <div
                                    key={order._id}
                                    className={`mb-4 p-4 border rounded-lg cursor-pointer transition duration-300 ${
                                        darkMode 
                                            ? 'border-gray-700 hover:bg-gray-700' 
                                            : 'border-gray-200 hover:bg-blue-50'
                                    }`}
                                    onClick={() => handleOrderClick(order)}
                                >
                                    <h3 className="text-lg font-semibold">{order.firstName} {order.lastName}</h3>
                                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Order ID: {order.orderId}</p>
                                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Items Price: Rs.{order.itemsPrice}</p>
                                </div>
                            ))
                        ) : (
                            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>No pending orders available</p>
                        )}
                    </div>
                </div>

                {/* Delivery Information */}
                <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className={`p-4 ${darkMode ? 'bg-green-800' : 'bg-green-600'} text-white`}>
                        <h2 className="text-xl font-semibold">Delivery Information</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
                            <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name</label>
                            <input
                                type="text"
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                                    darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'bg-gray-50 border-gray-300 text-gray-900'
                                }`}
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
                            <input
                                type="text"
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                                    darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'bg-gray-50 border-gray-300 text-gray-900'
                                }`}
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Telephone Number</label>
                            <input
                                type="text"
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                                    darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'bg-gray-50 border-gray-300 text-gray-900'
                                }`}
                                placeholder="Enter telephone number"
                                value={telephoneNo}
                                onChange={(e) => setTelephoneNo(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
                            <input
                                type="text"
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                                    darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'bg-gray-50 border-gray-300 text-gray-900'
                                }`}
                                placeholder="Enter address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>City</label>
                                <input
                                    type="text"
                                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                                        darkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white' 
                                            : 'bg-gray-50 border-gray-300 text-gray-900'
                                    }`}
                                    placeholder="Enter city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Province</label>
                                <input
                                    type="text"
                                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                                        darkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white' 
                                            : 'bg-gray-50 border-gray-300 text-gray-900'
                                    }`}
                                    placeholder="Enter province"
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Postal Code</label>
                                <input
                                    type="text"
                                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                                        darkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white' 
                                            : 'bg-gray-50 border-gray-300 text-gray-900'
                                    }`}
                                    placeholder="Enter postal code"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Items</label>
                            {Items.map((item) => (
                                <div key={item._id} className="flex space-x-4 mb-2">
                                    <input
                                        type="text"
                                        className={`flex-grow p-3 border rounded-lg ${
                                            darkMode 
                                                ? 'bg-gray-700 border-gray-600 text-white' 
                                                : 'bg-gray-50 border-gray-300 text-gray-900'
                                        }`}
                                        value={item.name}
                                        disabled
                                    />
                                    <input
                                        type="number"
                                        className={`w-24 p-3 border rounded-lg ${
                                            darkMode 
                                                ? 'bg-gray-700 border-gray-600 text-white' 
                                                : 'bg-gray-50 border-gray-300 text-gray-900'
                                        }`}
                                        value={item.qty}
                                        disabled
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className={`w-full font-semibold py-3 rounded-lg transition duration-300 ${
                                darkMode 
                                    ? 'bg-green-700 text-white hover:bg-green-600' 
                                    : 'bg-green-600 text-white hover:bg-green-500'
                            }`}
                        >
                            Submit Delivery
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
