import React from 'react';
import {FaEye, FaPen, FaTrash} from "react-icons/fa";

export default function Products() {

const products = [
  {
      id: 1,
      image: '/path/to/image1.png',
      sku: '1002030401231',
      name: 'Dining Table',
      category: 'Furniture',
      price: 15000,
      stock: 16
  },
  {
      id: 2,
      image: '/path/to/image2.png',
      sku: '1002030401231',
      name: 'Sofa Set',
      category: 'Furniture',
      price: 15000,
      stock: 15
  },
  {
      id: 3,
      image: '/path/to/image3.png',
      sku: '1002030401231',
      name: 'Microwave oven',
      category: 'Electronics',
      price: 15000,
      stock: 22
  },
  // ...add more products as needed
];

    
  return (
    <div className="rounded-lg p-8">
      <table className="min-w-full overflow-y-auto min-h-full border rounded-lg bg-white">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">SKU</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Stock</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="border-b border-gray-200">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">
                <img src={product.image} alt={product.name} className="w-10 h-10" />
              </td>
              <td className="py-2 px-4">{product.sku}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">{`Rs.${product.price.toFixed(2)}`}</td>
              <td className="py-2 px-4">
                <span className={`py-1 px-2 rounded-md text-white ${
                    product.stock > 20 ? 'bg-green-500' :
                    product.stock > 10 ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                    {product.stock}
                </span>
              </td>
              <td className="py-2 px-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEye />
                  </button>
                  <button className="text-green-500 hover:text-green-700 mx-2">
                    <FaPen />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
