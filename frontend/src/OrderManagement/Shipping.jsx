import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../redux/api/orderApiSlice';
import { useSelector } from 'react-redux';
import { toast } from "react-hot-toast";

const provinces = [
  'Central',
  'Eastern',
  'Northern',
  'North Western',
  'North Central',
  'Sabaragamuwa',
  'Southern',
  'Uva',
  'Western',
];

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

  // Validation state
  const [errors, setErrors] = useState({});
  const [suggestedProvinces, setSuggestedProvinces] = useState([]);

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

      const data = await createOrder(orderData);
      console.log('Order Data', data);

      if (data.error) {
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

  // Prevent non-alphabetic characters and limit input length
  const handleTextChange = (e, setter, fieldName) => {
    const { value } = e.target;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setter(value);
      if (fieldName === 'province') {
        // Filter suggested provinces based on user input
        setSuggestedProvinces(
          provinces.filter((province) =>
            province.toLowerCase().includes(value.toLowerCase())
          )
        );
      }
    } else {
      toast.error(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} cannot contain numbers`);
    }
  };

  const handleTelephoneChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      if (value.length <= 10) {
        setTeleNo(value);
      } else {
        toast.error('Telephone number cannot exceed 10 digits');
      }
    }
  };

  const handleProvinceSelect = (province) => {
    setProvince(province);
    setSuggestedProvinces([]);
  };

  const handlePostalCodeChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setPostalCode(value);
    } else {
      toast.error('Postal code must contain only numeric characters');
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
                onChange={(e) => handleTextChange(e, setFirstName, 'firstName')}
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
                onChange={(e) => handleTextChange(e, setLastName, 'lastName')}
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
                onChange={handleTelephoneChange}
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
                onChange={(e) => handleTextChange(e, setCity, 'city')}
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
                onChange={(e) => handleTextChange(e, setProvince, 'province')}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out hover:shadow-lg"
                placeholder="Enter province"
              />
              {suggestedProvinces.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10">
                  {suggestedProvinces.map((prov) => (
                    <li
                      key={prov}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleProvinceSelect(prov)}
                    >
                      {prov}
                    </li>
                  ))}
                </ul>
              )}
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
                  onChange={handlePostalCodeChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out hover:shadow-lg"
                  placeholder="10100"
                />
                {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
              </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-900 text-white font-semibold py-3 rounded-md shadow-md hover:bg-blue-800 transition ease-in-out duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryInformationForm;
