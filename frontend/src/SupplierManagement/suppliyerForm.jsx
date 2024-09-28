import React, { useState } from 'react';

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    codeNumber: '',
    productName: '',
    price: '',
    category: '',
    quantity: '',
    bankAccountNumber: '',
    bankName: '',
    moreDetails: '',
  });

  const [errors, setErrors] = useState({
    bankAccountNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate Bank Account Number
    if (name === 'bankAccountNumber') {
      const regex = /^[0-9]*$/; // Only digits allowed
      if (!regex.test(value)) {
        setErrors((prevState) => ({
          ...prevState,
          bankAccountNumber: 'Account number must contain only numbers.',
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          bankAccountNumber: '',
        }));
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check
    if (errors.bankAccountNumber || formData.bankAccountNumber === '') {
      alert('Please fix errors before submitting');
      return;
    }

    // Handle form submission logic
    console.log('Form data:', formData);
  };

  return (
    <div className="p-8 overflow-auto bg-gray-200">
      <h2 className="text-2xl font-bold mb-8">Supplier Form</h2>
    <div className="w-full p-8">
      <h2 className="text-2xl font-bold mb-8">Supplier Form - Bank Transfer</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Code Number</label>
            <input
              type="text"
              name="codeNumber"
              value={formData.codeNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a category</option>
              <option value="category1">Electronics</option>
              <option value="category2">Clothing</option>
              <option value="category2">Furniture</option>
              {/* Add more categories as needed */}
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Bank Transfer Section */}
        <div className="border rounded p-4 mb-4">
          <h3 className="text-lg font-semibold mb-4">Bank Transfer Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Bank Account Number</label>
            <input
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              pattern="[0-9]*" // restrict input to numbers only
            />
            {errors.bankAccountNumber && (
              <p className="text-red-500 text-sm">{errors.bankAccountNumber}</p>
            )}
          </div>
        </div>

        {/* Product Media Section */}
        <div className="border rounded -p-4 mb-4">
          <h3 className="text-lg font-semibold mb-4 text-orange-500">Product Media</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">More Details</label>
          <textarea
            name="moreDetails"
            value={formData.moreDetails}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send Details
        </button>
      </form>
    </div>
  );
};

export default SupplierForm;
