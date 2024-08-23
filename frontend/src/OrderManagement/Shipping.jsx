import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from "../redux/api/orderApiSlice";
import { useSelector } from 'react-redux';


const DeliveryInformationForm = () => {
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();

  // redux states
  const cart = useSelector((state) => state.cart);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephoneNo, setTeleNo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = new FormData();
      
      // append data
      orderData.append("itemsPrice", cart.itemsPriceSum);
      orderData.append("deliveryPrice", cart.deliveryPrice);
      orderData.append("discount", cart.totalDiscount);
      orderData.append("totalPrice", cart.totalPriceSum);
      orderData.append("orderItems", cart.cartItems);
      orderData.append("status", "Pending");
      orderData.append("firstName", firstName);
      orderData.append("lastName", lastName);
      orderData.append("telephoneNo", telephoneNo);
      orderData.append("address", address);
      orderData.append("city", city);
      orderData.append("province", province);
      orderData.append("postalCode", postalCode);
      orderData.append("paymentMethod", paymentMethod);
      
      console.log(cart);
      

      const data = await createOrder(orderData);
      console.log('Order created successfully:', data);
      navigate('/placeorder');
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Information</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your first name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your last name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephoneNo">Telephone Number</label>
          <input
            id="telephoneNo"
            name="telephoneNo"
            type="text"
            value={telephoneNo}
            onChange={(e) => setTeleNo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your telephone number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your address"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your city"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">Province</label>
          <input
            id="province"
            name="province"
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your province"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your postal code"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
            Select Payment Method
          </label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2 leading-tight"
            />
            <span className="text-gray-700">PayPal</span>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="creditCard"
              name="paymentMethod"
              value="Credit Card"
              checked={paymentMethod === 'Credit Card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2 leading-tight"
            />
            <span className="text-gray-700">Credit Card</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryInformationForm;
