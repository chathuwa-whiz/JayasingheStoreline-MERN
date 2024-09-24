import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../redux/api/orderApiSlice';
import { useSelector } from 'react-redux';
import {toast} from "react-hot-toast";

const DeliveryInformationForm = () => {
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();

  const cart = useSelector((state) => state.cart);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephoneNo, setTeleNo] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
 // const [paymentMethod, setPaymentMethod] = useState('');

  // Validation state
  const [errors, setErrors] = useState({});

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!telephoneNo) newErrors.telephoneNo = 'Telephone number is required';
    else if (telephoneNo.length !== 10)
      newErrors.telephoneNo = 'Telephone number must be 10 digits';
    if (!address) newErrors.address = 'Address is required';
    if (!city) newErrors.city = 'City is required';
    if (!province) newErrors.province = 'Province is required';
    if (!postalCode) newErrors.postalCode = 'Postal code is required';

    setErrors(newErrors);

    // If the object is empty, the form is valid
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      toast.error('Please fill all the required fields');
      return;
    } else {
      toast.success('Order placed successfully');
    }

    try {
      const orderData = new FormData();

      orderData.append('itemsPrice', cart.itemsPriceSum);
      orderData.append('deliveryPrice', cart.deliveryPrice);
      orderData.append('discount', cart.totalDiscount);
      orderData.append('totalPrice', cart.totalPriceSum);
      orderData.append('orderItems', JSON.stringify(cart.cartItems));
      orderData.append('status', 'Pending');
      orderData.append('firstName', firstName);
      orderData.append('lastName', lastName);
      orderData.append('telephoneNo', telephoneNo);
      orderData.append('address', address);
      orderData.append('city', city);
      orderData.append('province', province);
      orderData.append('postalCode', postalCode);
      //orderData.append('paymentMethod', paymentMethod);

      const data = await createOrder(orderData);
      console.log('Order Data', data);

      if(data.error) {
        toast.error(data.error);
        return;

      } else {
        toast.success('Order placed successfully');
        setTimeout(() => {
          toast.dismiss();
          navigate('/placeorder');
        });
      }

    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <h2 className="text-center text-4xl font-extrabold text-blue-900 tracking-wide">
          Delivery Information
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 bg-white shadow-2xl rounded-xl p-8 border border-blue-100"
        >
          <div className="grid grid-cols-1 gap-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out hover:shadow-lg"
                placeholder="John"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out hover:shadow-lg"
                placeholder="Doe"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>

            <div>
              <label htmlFor="telephoneNo" className="block text-sm font-medium text-gray-700">
                Telephone Number
              </label>
              <input
                id="telephoneNo"
                name="telephoneNo"
                type="text"
                value={telephoneNo}
                onChange={(e) => setTeleNo(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out hover:shadow-lg"
                placeholder="+94 123 456 789"
              />
              {errors.telephoneNo && (
                <p className="text-red-500 text-xs mt-1">{errors.telephoneNo}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out hover:shadow-lg"
                placeholder="123 Main St"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out hover:shadow-lg"
                placeholder="Colombo"
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                Province
              </label>
              <input
                id="province"
                name="province"
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out hover:shadow-lg"
                placeholder="Western"
              />
              {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out hover:shadow-lg"
                placeholder="00100"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
              )}
            </div>

             {/* <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                Select Payment Method
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    value="PayPal"
                    checked={paymentMethod === 'PayPal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                    PayPal
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="creditCard"
                    name="paymentMethod"
                    type="radio"
                    value="Credit Card"
                    checked={paymentMethod === 'Credit Card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="creditCard" className="ml-3 block text-sm font-medium text-gray-700">
                    Credit Card
                  </label>
                </div>
              </div>
            </div> */}



            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full bg-blue-900 text-white font-semibold py-3 rounded-md shadow-md hover:bg-blue-800 transition ease-in-out duration-300"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryInformationForm;
