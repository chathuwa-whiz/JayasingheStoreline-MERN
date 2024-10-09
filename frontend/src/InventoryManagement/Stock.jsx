import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch } from "react-icons/fa";
import { useAllProductsQuery } from '../redux/api/productApiSlice';

export default function Stock() {
  // Fetch all products
  const { data: products, isLoading, isError } = useAllProductsQuery();
  console.log(products);
  
  // Format Prices
  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    return products
      ? products
          .filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      : [];
  }, [products, searchTerm]);

  // Calculate total pages based on filtered products
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

  // Get current products for the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="rounded-lg p-8">
      {/* Search input */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by name or SKU"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-l-md w-full"
        />
        <button className="bg-orange-500 text-white p-2 rounded-r-md">
          <FaSearch />
        </button>
      </div>

      <table className="min-w-full overflow-y-auto min-h-full border rounded-lg bg-white">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">SKU</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Received QTY</th>
            <th className="py-2 px-4 text-left">Current QTY</th>
            <th className="py-2 px-4 text-left">Unit Price (Bought Price)</th>
            <th className="py-2 px-4 text-left">Inbound Time</th>
            <th className="py-2 px-4 text-left">Add</th>
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
              <td className="py-2 px-4">
                <span className={`py-1 px-2 rounded-md text-white ${
                    product.countInStock > 20 ? 'bg-green-500' :
                    product.countInStock > 10 ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                    {product.countInStock}
                </span>
              </td>
              <td className="py-2 px-4">
                <span className={`py-1 px-2 rounded-md text-white ${
                    product.currentQty > 20 ? 'bg-green-500' :
                    product.currentQty > 10 ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                    {product.currentQty}
                </span>
              </td>              
              <td className="py-2 px-4">{priceFormatter.format(product.buyingPrice)}</td>
              <td className="py-2 px-4">{new Date(product.updatedAt).toLocaleDateString()}</td>
              <td className="py-2 px-4">
                <Link to={`/inventory/addstock/${product._id}`} className="flex items-center justify-center bg-green-500 text-white rounded-md p-2">
                  <FaPlus />
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
  )
}
