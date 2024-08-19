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
     
  },
  {
      id: 2,
      image: '/path/to/image2.png',
      sku: '1002030401231',
      name: 'Sofa Set',
      category: 'Furniture',
      price: 15000,
     
  },
  {
      id: 3,
      image: '/path/to/image3.png',
      sku: '1002030401231',
      name: 'Microwave oven',
      category: 'Electronics',
      price: 15000,
     
  },
  // ...add more products as needed
];

    
  return (
    <div className="pt-20 pl-64 pr-6 pb-4 h-[calc(100vh-4rem)] overflow-auto bg-gray-100">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">SKU</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-left">Price</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
