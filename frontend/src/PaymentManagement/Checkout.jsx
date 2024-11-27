import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import visa from "../../../uploads/paymentPh/visa.png";
import mastercard from "../../../uploads/paymentPh/mastercard.png";

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        setTotalAmount(cart.totalPriceSum);
        setDeliveryPrice(cart.deliveryPrice);
        setTotalDiscount(cart.totalDiscount);
      } catch (error) {
        console.error('Error fetching total price:', error);
        toast.error('Error fetching total price');
      }
    };
    fetchTotalPrice();
  }, [cart]);

  useEffect(() => {
    // Load PayHere SDK
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'cod', or 'payhere'

  const validateForm = () => {
    const errors = {};

    if (selectedPaymentMethod === 'card') {
        // Card Number Validation
        const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        if (!cardNumberPattern.test(cardNumber) || cardNumber.replace(/-/g, '').length > 16) {
            errors.cardNumber = 'Card number must be up to 16 digits with hyphens';
        }

        // Card Name Validation
        const cardNamePattern = /^[a-zA-Z\s]+$/;
        if (!cardNamePattern.test(cardName)) {
            errors.cardName = 'Card name must only contain letters and spaces';
        }

        // Expiration Date Validation (MM/YY)
        const expirationDatePattern = /^(0[1-9]|1[0-9])\/\d{2}$/;
        if (!expirationDatePattern.test(expirationDate)) {
            errors.expirationDate = 'Invalid expiration date format (MM/YY)';
        } else {
            const [month, year] = expirationDate.split('/').map(Number);

            // Check if year is 24 or above
            if (year < 24) {
                errors.expirationDate = 'Year must be 24 or later.';
            }
        }

        // CVV Validation
        const cvvPattern = /^\d{3,4}$/;
        if (!cvvPattern.test(cvv)) {
            errors.cvv = 'CVV must be 3 digits';
        }
    }

    // Set errors and return whether the form is valid
    setErrors(errors);
    return Object.keys(errors).length === 0;
};



  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    setIsLoading(true);

    try {
      if (paymentMethod === 'card') {
        // Validate card details
        if (!cardNumber || !expirationDate || !cvv || !cardName) {
          throw new Error('Please fill in all card details');
        }

        const strippedCardNumber = cardNumber.replace(/\D/g, '');
        if (strippedCardNumber.length < 13 || strippedCardNumber.length > 19) {
          throw new Error('Card number should be between 13 and 19 digits');
        }

        if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
          throw new Error('Expiration date should be in MM/YY format');
        }

        if (!/^\d{3,4}$/.test(cvv)) {
          throw new Error('CVV should be 3 or 4 digits');
        }

        // Process card payment
        await processCardPayment();
      } else if (paymentMethod === 'cod') {
        // Process COD order
        await processCODOrder();
      } else if (paymentMethod === 'payhere') {
        await initPayHerePayment();
        return; // Return early as PayHere will handle the rest
      } else {
        throw new Error('Invalid payment method');
      }

      setIsLoading(false);
      setSuccess('Order placed successfully! Redirecting to home...');

      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');  // Assuming '/' is your home route
      }, 2000);  // 2 second delay before redirect
    } catch (error) {
      setIsLoading(false);
      setError(error.message || 'Payment failed. Please try again.');
    }
  };

  const processCardPayment = async () => {
    // Simulate API call for card payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Add your actual card payment processing logic here
  };

  const processCODOrder = async () => {
    // Simulate API call for COD order processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Add your actual COD order processing logic here
  };

  const initPayHerePayment = () => {
    return new Promise((resolve, reject) => {
      if (typeof window.payhere === 'undefined') {
        reject(new Error('PayHere SDK not loaded'));
        return;
      }

      // Configure your PayHere payment
      const payment = {
        sandbox: true, // Set to false in production
        merchant_id: 'YOUR_MERCHANT_ID',
        return_url: 'http://your-return-url.com',
        cancel_url: 'http://your-cancel-url.com',
        notify_url: 'http://your-notify-url.com',
        order_id: 'ItemNo12345',
        items: 'Door bell wireles',
        amount: '1000.00',
        currency: 'LKR',
        first_name: 'Saman',
        last_name: 'Perera',
        email: 'samanp@gmail.com',
        phone: '0771234567',
        address: 'No.1, Galle Road',
        city: 'Colombo',
        country: 'Sri Lanka',
        delivery_address: 'No. 46, Galle road, Kalutara South',
        delivery_city: 'Kalutara',
        delivery_country: 'Sri Lanka',
        custom_1: '',
        custom_2: ''
      };

      window.payhere.startPayment(payment);

      window.payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed. OrderID:" + orderId);
        setIsLoading(false);
        setSuccess('Payment successful! Redirecting to home...');
        setTimeout(() => navigate('/'), 2000);
        resolve();
      };

      window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
        setIsLoading(false);
        reject(new Error('Payment cancelled'));
      };

      window.payhere.onError = function onError(error) {
        console.log("Error:" + error);
        setIsLoading(false);
        reject(new Error('Payment error'));
      };
    });
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = value
      .slice(0, 16) // limit to 16 digits
      .replace(/(.{4})(?=.)/g, '$1-')
      .trim();
    setCardNumber(formattedValue);

    // Determine card type
    if (value.startsWith('4')) {
      setCardType('visa');
    } else if (value.startsWith('5')) {
      setCardType('mastercard');
    } else {
      setCardType('');
    }
  };

  const handleCardNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setCardName(value);
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/[^0-9/]/g, '');

    if (value.length === 2 && !value.includes('/')) {
      value += '/';
    }

    if (value.length <= 5) {
      if (value.length === 1) {
        // Only allow 0 or 1 as the first digit
        if (!/[01]/.test(value)) {
          value = '';
        }
      } else if (value.length === 2 && !value.includes('/')) {
        // For the second digit, only allow 1-9 if first digit is 0, or 1-2 if first digit is 1
        const firstDigit = value[0];
        const secondDigit = value[1];
        if (firstDigit === '0' && !/[1-9]/.test(secondDigit)) {
          value = value.slice(0, 1);
        } else if (firstDigit === '1' && !/[12]/.test(secondDigit)) {
          value = value.slice(0, 1);
        } else {
          value += '/';
        }
      } else if (value.length === 5) {
        const [month, year] = value.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const enteredYear = parseInt(year, 10);
        
        if (enteredYear < 24 || enteredYear < currentYear) {
          value = value.slice(0, 3);
        }
      }
      
      setExpirationDate(value);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCvv(value.slice(0, 3)); // limit to 3 digits
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-purple-300 flex flex-col relative">
      {/* Order Summary */}
      <div className="absolute top-8 right-8 w-72 bg-white shadow-md rounded-md p-6 z-10">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Subtotal</span>
          <span className="text-gray-900">Rs. {totalAmount}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Shipping</span>
          <span className="text-gray-900">Included</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between mt-4">
          <span className="font-medium text-gray-900">Total Amount</span>
          <span className="text-orange-500 text-xl font-semibold">Rs. {totalAmount}</span>
        </div>
      </div>

      <div className="flex justify-center items-start h-full py-8 flex-grow ml-16">
        <form className="w-2/3 max-w-lg p-6 bg-white shadow-md rounded-md mr-4" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Select Payment Method</h2>
          <div className="flex justify-between mb-4">
            <div
              className={`flex flex-col items-center p-4 cursor-pointer border rounded-md ${
                selectedPaymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => handlePaymentSelection('card')}
            >
              <div className="text-blue-500 text-3xl">💳</div>
              <span className="mt-2 font-medium">Credit/Debit Card</span>
            </div>
            <div
              className={`flex flex-col items-center p-4 cursor-pointer border rounded-md ${
                selectedPaymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => handlePaymentSelection('cod')}
            >
              <div className="text-blue-500 text-3xl">💵</div>
              <span className="mt-2 font-medium">Cash On Delivery</span>
            </div>
            <div
              className={`flex flex-col items-center p-4 cursor-pointer border rounded-md ${
                selectedPaymentMethod === 'payhere' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => handlePaymentSelection('payhere')}
            >
              <div className="text-blue-500 text-3xl">💳</div>
              <span className="mt-2 font-medium">PayHere</span>
            </div>
          </div>

          {selectedPaymentMethod === 'card' && (
  <div>
    <h3 className="text-lg font-semibold mb-2 text-blue-600">Card Details</h3>
    
    {/* Card Number Input */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Card Number</label>
      <div className="relative">
        <input
          type="text"
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Card number (e.g., 1234-5678-9012-3456)"
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {cardType === 'visa' && <img src={visa} alt="Visa" className="h-6" />}
          {cardType === 'mastercard' && <img src={mastercard} alt="MasterCard" className="h-6" />}
        </div>
      </div>
      {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
    </div>

    {/* Cardholder Name Input */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
      <input
        type="text"
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
          errors.cardName ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="Cardholder name"
        value={cardName}
        onChange={handleCardNameChange}
      />
      {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}
    </div>

    {/* Expiration Date and CVV Inputs */}
    <div className="flex mb-4">
      {/* Expiration Date Input */}
      <div className="w-1/2 pr-2">
        <label className="block text-sm font-medium text-gray-700">Expiration Date (MM/YY)</label>
        <input
          type="text"
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
            errors.expirationDate ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="MM/YY"
          value={expirationDate}
          onChange={handleExpirationDateChange}
        />
        {errors.expirationDate && <p className="text-red-500 text-sm">{errors.expirationDate}</p>}
      </div>

      {/* CVV Input */}
      <div className="w-1/2 pl-2">
        <label className="block text-sm font-medium text-gray-700">CVV</label>
        <input
          type="text"
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
            errors.cvv ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="CVV (3 or 4 digits)"
          value={cvv}
          onChange={handleCvvChange}
        />
        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
      </div>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md mt-4 hover:bg-blue-700"
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : 'Make Payment'}
    </button>
    {error && <p className="error">{error}</p>}
    {success && <p className="success">{success}</p>}
  </div>
)}


          {selectedPaymentMethod === 'cod' && (
            <div>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>You may pay in cash to our courier upon receiving your parcel at the doorstep.</li>
                <li>Before agreeing to receive the parcel, check if your delivery status has been updated to 'Out for Delivery'.</li>
                <li>Before receiving, confirm that the airway bill shows that the parcel is from Daraz.</li>
                <li>Before you make payment to the courier, confirm your order number, sender information, and tracking number on the parcel.</li>
              </ul>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 mt-4 rounded-md hover:from-blue-600 hover:to-purple-600 focus:outline-none"
              >
                Confirm Order
              </button>
            </div>
          )}

          {selectedPaymentMethod === 'payhere' && (
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-md mt-4 hover:bg-green-700"
            >
              Pay Now
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Checkout;