import React from "react";

const ProductPage = () => {
  return (
    <div className="flex flex-col md:flex-row p-6">
      {/* Left Section: Product Image */}
      <div className="md:w-1/2">
        <img
          src="https://example.com/product-image.jpg" // Replace with actual image URL
          alt="Product"
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Right Section: Product Details */}
      <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
        <h1 className="text-3xl font-bold text-gray-800">Women Casual Shoes</h1>
        <p className="text-lg text-gray-600 line-through mt-2">LKR7,054.44</p>
        <p className="text-4xl font-bold text-red-500">LKR2,892.26</p>
        <p className="text-sm text-green-500 mt-2">59% off</p>
        
        <div className="flex items-center mt-4">
          <span className="text-yellow-500 text-xl">★★★★☆</span>
          <span className="text-gray-600 text-sm ml-2">4.7 (6120 Reviews)</span>
        </div>

        <p className="text-gray-700 mt-6">
          Women Casual Shoes Fashion Breathable Walking Mesh Flat Shoes Sneakers
        </p>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Color: A08White</h3>
          <div className="flex mt-2 space-x-2">
            {/* Color Options */}
            <button className="w-12 h-12 bg-gray-200 border rounded-lg"></button>
            <button className="w-12 h-12 bg-black border rounded-lg"></button>
            <button className="w-12 h-12 bg-pink-300 border rounded-lg"></button>
            <button className="w-12 h-12 bg-green-500 border rounded-lg"></button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Shoe Size:</h3>
          <div className="flex mt-2 space-x-2">
            {/* Size Options */}
            {["36", "37", "38", "39", "40", "41", "42"].map((size) => (
              <button
                key={size}
                className="px-4 py-2 border rounded-lg text-gray-800 hover:bg-gray-200"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <label htmlFor="quantity" className="mr-4 text-lg font-semibold">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="242"
            className="w-16 p-2 border rounded-lg text-center"
          />
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="flex-1 bg-red-500 text-white py-3 rounded-lg text-lg hover:bg-red-600">
            Buy Now
          </button>
          <button className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg text-lg hover:bg-gray-300">
            Add to Cart
          </button>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="flex-1 text-gray-800 py-3 rounded-lg text-lg hover:bg-gray-100">
            <i className="fas fa-heart"></i> Add to Wishlist
          </button>
          <button className="flex-1 text-gray-800 py-3 rounded-lg text-lg hover:bg-gray-100">
            <i className="fas fa-share-alt"></i> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
