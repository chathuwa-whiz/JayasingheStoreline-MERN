import React from 'react'

export default function AddProducts() {
  return (
    <div className="p-8 grid grid-cols-2 gap-10">
        {/* General Information */}
        <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">General Information</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                    type="text"
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    placeholder="Enter product name"
                />
            </div>
            <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    rows="4"
                    placeholder="Enter product description"
                ></textarea>
            </div>
        </div>

        {/* Product Media */}
        <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Product Media</h2>
            <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg bg-blue-50">
                <p className="mb-2">Photo Product</p>
                <button className="px-4 py-2 border rounded-lg text-blue-500 border-blue-500">
                    Add Images
                </button>
            </div>
        </div>

        {/* Pricing */}
        <div className="border rounded-lg p-4 col-span-1">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">Buying Price</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter buying price"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Selling Price</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter selling price"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700">Discount Percentage (%)</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter discount percentage"
                    />
                </div>
            </div>
        </div>

        {/* Category */}
        <div className="border rounded-lg p-4 col-span-1">
            <h2 className="text-xl font-semibold mb-4">Category</h2>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-gray-700">Product Category</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter product category"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Brand Name</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter product Brand Name"
                    />
                </div>
            </div>
        </div>

        {/* Inventory */}
        <div className="border rounded-lg p-4 col-span-2">
            <h2 className="text-xl font-semibold mb-4">Inventory</h2>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-gray-700">SKU</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter SKU"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Barcode</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter barcode"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter quantity"
                    />
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="col-span-2 flex justify-end space-x-4">
            <button className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition">
                Discard Changes
            </button>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                Add Product
            </button>
        </div>
    </div>
  )
}
