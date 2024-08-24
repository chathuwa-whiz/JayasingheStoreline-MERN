import React from 'react';
import { Link } from 'react-router-dom';
import { useAllProductsQuery } from '../redux/api/productApiSlice';
import { useGetOrdersQuery } from '../redux/api/orderApiSlice';


export default function () {

  // fetch all products
  const { data: products, isLoading, isError } = useAllProductsQuery();
  console.log(products);
  
  let category = [];
  
  if(isLoading) return <div>Loading...</div>;
  if(isError) return <div>Something went wrong</div>;

  for(const product of products){}

  return (
    <>
    <div className="overflow-auto bg-gray-100 p-5 rounded-lg">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Chathushka Navod</h1>
        <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipiscing</p>
      </header>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">{products.length}</h2>
          <p className="text-lg">Total Products</p>
          <p className="text-green-600">+18% +3.8k this week</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">1,234</h2>
          <p className="text-lg">Total Categories</p>
          <p className="text-yellow-600">+18% +2.8k this week</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">567</h2>
          <p className="text-lg">Total Stock Value</p>
          <p className="text-blue-600">+18% +7.8k this week</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-bold">123</h2>
          <p className="text-lg">Low Stock</p>
          <p className="text-red-600">+18% +1.2k this week</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Revenue Stats</h3>
          <div className="relative h-64">
            {/* Insert chart component or image here */}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Sales by Category</h3>
          <div className="relative h-64">
            {/* Insert chart component or image here */}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
