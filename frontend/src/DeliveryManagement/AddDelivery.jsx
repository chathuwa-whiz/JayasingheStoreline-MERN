import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCreateDeliveryMutation } from "../redux/api/deliveryApiSlice";
import { toast } from "react-hot-toast";

export default function AddDelivery() {
    const [image, setImage] = useState(null);
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

    const [createDelivery] = useCreateDeliveryMutation();
    const navigate = useNavigate();

    useEffect(() => {
        setTotalPrice(parseFloat(itemsPrice) + parseFloat(deliveryPrice));
    }, [itemsPrice, deliveryPrice]);

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

            const response = await createDelivery(deliveryData);
            if (response.error) {
                toast.error("Delivery creation failed. Try Again.");
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
                </div>
            </div>

            {/* Delivery Products */}
            <div className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Delivery Products</h2>
                {/* Placeholder for product information */}
                {/* {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-gray-600">Price: Rs.{product.newProductPrice}.00</p>
                            <p className="text-gray-600">Quantity: {product.qty}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-600">No products available for delivery</div>
                )} */}
            </div>

            {/* Pricing */}
            <div className="border rounded-lg p-6 col-span-2 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Pricing</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Items Price</label>
                        <input
                            type="number"
                            className="w-full p-3 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                            placeholder="Enter items price"
                            value={itemsPrice}
                            onChange={(e) => setItemsPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Delivery Price</label>
                        <input
                            type="number"
                            className="w-full p-3 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                            placeholder="Enter delivery price"
                            value={deliveryPrice}
                            onChange={(e) => setDeliveryPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <label className="block text-gray-700 font-medium">Total Price</label>
                    <input
                        type="number"
                        className="w-full p-3 mt-1 border rounded-lg bg-gray-200 cursor-not-allowed"
                        placeholder="Total price"
                        value={totalPrice}
                        disabled
                    />
                </div>
            </div>

            {/* Proof of Delivery */}
            <div className="border rounded-lg p-6 col-span-2 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Proof of Delivery</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Upload Image (PNG/JPG)</label>
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        className="w-full p-3 mt-1 border rounded-lg bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-2 flex justify-end mt-8">
                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-200"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
