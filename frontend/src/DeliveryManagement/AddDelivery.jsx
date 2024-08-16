import React, { useState } from "react";

function AddDelivery() {
  const [deliveryItem, setDeliveryItem] = useState("");
  const [description, setDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [unit, setUnit] = useState("");
  const [driver, setDriver] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [photoProduct, setPhotoProduct] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      deliveryItem,
      description,
      productPrice,
      shippingPrice,
      discount,
      unit,
      driver,
      from,
      to,
      time,
      photoProduct,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Add Delivery</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-md">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Delivery Item"
            value={deliveryItem}
            onChange={(e) => setDeliveryItem(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Shipping Price"
            value={shippingPrice}
            onChange={(e) => setShippingPrice(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Driver"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="file"
            onChange={(e) => setPhotoProduct(e.target.files[0])}
            className="border p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddDelivery;
