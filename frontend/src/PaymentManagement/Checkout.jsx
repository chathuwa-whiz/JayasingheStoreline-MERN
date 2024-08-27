import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import visa from "../../../uploads/products/paymentPh/visa.png";
import mastercard from "../../../uploads/products/paymentPh/mastercard.png";

export default function Checkout() {
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
      }
    };
    fetchTotalPrice();
  }, [cart]);

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState('');

  const validateForm = () => {
    const errors = {};

    if (selectedPaymentMethod === 'card') {
      const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
      if (!cardNumberPattern.test(cardNumber) || cardNumber.replace(/-/g, '').length > 16) {
        errors.cardNumber = 'Card number must be up to 16 digits with hyphens';
      }

      const cardNamePattern = /^[a-zA-Z\s]+$/;
      if (!cardNamePattern.test(cardName)) {
        errors.cardName = 'Card name must only contain letters and spaces';
      }

      const expirationDatePattern = /^\d{2}\/\d{2}$/;
      if (!expirationDatePattern.test(expirationDate)) {
        errors.expirationDate = 'Invalid expiration date format';
      }

      const cvvPattern = /^\d{3,4}$/;
      if (!cvvPattern.test(cvv)) {
        errors.cvv = 'CVV must be 3 or 4 digits';
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (selectedPaymentMethod === 'cod') {
      toast.success('Order confirmed successfully!');
      setSelectedPaymentMethod(null);
      setCardNumber('');
      setCardName('');
      setExpirationDate('');
      setCvv('');
      setErrors({});
      setTimeout(() => {
        navigate('/order-confirmation'); // Dummy link, replace with actual route
      }, 2000);
      return;
    }

    const paymentData = {
      paymentMethod: selectedPaymentMethod,
      cardNumber,
      cardName,
      expirationDate,
      cvv
    };

    try {
      const response = await fetch('api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Payment successful');
        setSelectedPaymentMethod(null);
        setCardNumber('');
        setCardName('');
        setExpirationDate('');
        setCvv('');
        setErrors({});
      } else {
        toast.error(result.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment failed');
    }
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
              className={`flex flex-col items-center p-4 cursor-pointer border rounded-md 
              ${selectedPaymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
              onClick={() => handlePaymentSelection('card')}
            >
              <div className="text-blue-500 text-3xl">💳</div>
              <span className="mt-2 font-medium">Credit/Debit Card</span>
            </div>
            <div
              className={`flex flex-col items-center p-4 cursor-pointer border rounded-md 
              ${selectedPaymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
              onClick={() => handlePaymentSelection('cod')}
            >
              <div className="text-blue-500 text-3xl">💵</div>
              <span className="mt-2 font-medium">Cash On Delivery</span>
            </div>
          </div>

          {selectedPaymentMethod === 'card' && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Card Details</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Card number</label>
                <div className="relative">
                  <input
                    type="text"
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Card number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {cardType === 'visa' && (
                      <img src={visa} alt="Visa" className="h-6" />
                    )}
                    {cardType === 'mastercard' && (
                      <img src={mastercard} alt="MasterCard" className="h-6" />
                    )}
                  </div>
                </div>
                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Card name</label>
                <input
                  type="text"
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Card name"
                  value={cardName}
                  onChange={handleCardNameChange}
                />
                {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}
              </div>
              <div className="mb-4 flex">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm font-medium text-gray-700">Expiration date</label>
                  <input
                    type="text"
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.expirationDate ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="MM/YY"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                  />
                  {errors.expirationDate && <p className="text-red-500 text-sm">{errors.expirationDate}</p>}
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="CVV"
                    value={cvv}
                    onChange={handleCvvChange}
                  />
                  {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          )}

          {selectedPaymentMethod === 'cod' && (
            <div className="mb-4 p-4 border border-gray-300 rounded-md">
              <h3 className="text-lg font-semibold text-blue-600">Cash On Delivery Instructions</h3>
              <p className="mt-2 text-gray-700">1. Ensure you have the exact amount ready for payment on delivery.</p>
              <p className="mt-2 text-gray-700">2. Our delivery person will confirm the amount before handing over the order.</p>
              <p className="mt-2 text-gray-700">3. If you have any issues with the payment, please contact our support team.</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}
