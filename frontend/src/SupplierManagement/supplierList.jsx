import React from 'react';
import {FaEye, FaPen, FaTrash} from "react-icons/fa";

export default function Products() {

const products = [
  {
      id: 1,
      image: '/path/to/image1.png',
      sId: '1002030401231',
      name: 'Dining Table',
      Type: 'Furniture',
      Date: 15000,
     
  },
  {
      id: 2,
      image: '/path/to/image2.png',
      sID: '1002030401231',
      name: 'Sofa Set',
      Type: 'Furniture',
      Date: 15000,
     
  },
  {
      id: 3,
      image: '/path/to/image3.png',
      sID: '1002030401231',
      name: 'Microwave oven',
      Type: 'Electronics',
      Date: 15000,
     
  },
  // ...add more products as needed
];

    
  return (
    <div className="p-8 overflow-auto bg-gray-100">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">SID</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Type</th>
            <th className="py-2 px-4 text-left">Date</th>
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
              <td className="py-2 px-4">{product.sId}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.Type}</td>
              <td className="py-2 px-4">{product.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
