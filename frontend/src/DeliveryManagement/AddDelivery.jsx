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
        setOrderId(order._id);
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
            console.log("order response", orderResponse);
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
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50">
            {/* Pending Orders List */}
            <div className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Pending Orders</h2>
                <div className="h-screen overflow-y-auto"> {/* Set a fixed height and enable scrolling */}
                    {isLoading ? (
                        <p>Loading orders...</p>
                    ) : isError ? (
                        <p>Error loading orders</p>
                    ) : orders?.length > 0 ? (
                        orders.filter(order => order.status === 'Pending').map(order => ( // Show all orders, but scroll for more
                            <div
                                key={order._id}
                                className="mb-4 p-3 border rounded cursor-pointer hover:bg-gray-100"
                                onClick={() => handleOrderClick(order)}
                            >
                                <h3 className="text-lg font-semibold text-gray-800">{order.firstName} {order.lastName}</h3>
                                <p className="text-gray-600">{order.orderId}</p>
                                <p className="text-gray-600">Items Price: Rs.{order.itemsPrice}</p>
                            </div>
                        ))
                    ) : (
                        <p>No pending orders available</p>
                    )}
                </div>
            </div>

            {/* General Information */}
            <div className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Delivery Information</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">First Name</label>
                    <input
                        type="text"
                        className="w-full p-3 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Last Name</label>
                    <input
                        type="text"
                        className="w-full p-3 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Telephone Number</label>
                    <input
                        type="text"
                        className="w-full p-3 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                        placeholder="Enter telephone number"
                        value={telephoneNo}
                        onChange={(e) => setTelephoneNo(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Address</label>
                    <input
                        type="text"
                        className="w-full p-3 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium">City</label>
                        <input
                            type="text"
                            className="w-full p-3 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Province</label>
                        <input
                            type="text"
                            className="w-full p-3 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                            placeholder="Enter province"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Postal Code</label>
                        <input
                            type="text"
                            className="w-full p-3 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                            placeholder="Enter postal code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Item</label>
                        {Items.map((item) => (
                            <div key={item._id}>
                                <input
                                    type="text"
                                    className="w-full p-3 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                                    placeholder="Enter Item Name"
                                    value={item.name}
                                    disabled
                                />
                                <input
                                    type="number"
                                    className="w-full p-3 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                                    value={item.qty}
                                    disabled
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition duration-200"
                    onClick={handleSubmit}
                >
                    Submit Delivery
                </button>
            </div>
        </div>
    );
}
