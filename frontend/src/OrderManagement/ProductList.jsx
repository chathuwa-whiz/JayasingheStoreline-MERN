import React from 'react';
import { Link } from 'react-router-dom';
import { useAllProductsQuery } from '../redux/api/productApiSlice';

export default function ProductsList() {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  console.log(products);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
