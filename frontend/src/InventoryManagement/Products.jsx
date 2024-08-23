import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { useAllProductsQuery } from '../redux/api/productApiSlice';

export default function Products() {
  // Fetch all products
  const { data: products, isLoading, isError } = useAllProductsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  // Calculate the indices of the products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product._id} className="border-b border-gray-200">
              <td className="py-2 px-4">{indexOfFirstProduct + index + 1}</td>
              <td className="py-2 px-4">
                <img src={product.image} alt={product.name} className="w-10 h-10" />
              </td>
              <td className="py-2 px-4">{product.sku}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">{`Rs.${product.sellingPrice.toFixed(2)}`}</td>
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
