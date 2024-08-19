import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {FaEye, FaPen, FaTrash} from "react-icons/fa";
import moment from "moment";
import { useAllProductsQuery } from '../redux/api/productApiSlice';


export default function Products() {

  const {data: products, isLoading, isError} = useAllProductsQuery();

  console.log(products);
  
  if(isLoading) return <div>Loading...</div>

  if(isError) return <div>Something went wrong</div>

    
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
            <tr key={product._id} className="border-b border-gray-200">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">
                <img src={product.image} alt={product.name} className="w-10 h-10" />
              </td>
              <td className="py-2 px-4">{product.sku}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">{`Rs.${product.sellingPrice.toFixed(2)}`}</td>
              <td className="py-2 px-4">
                <span className={`py-1 px-2 rounded-md text-white ${
                    product.countInStock > 20 ? 'bg-green-500' :
                    product.countInStock > 10 ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                    {product.countInStock}
                </span>
              </td>
              <td className="py-2 px-4">
                
                  <Link to={`/inventory/products/update/${product._id}`}>
                    <button className="text-green-500 hover:text-green-700 mx-2">
                      <FaPen />
                    </button>
                  </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
