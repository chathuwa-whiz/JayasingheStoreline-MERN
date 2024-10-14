import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { useAllProductsQuery } from '../redux/api/productApiSlice';
import { ProductsHeader } from '../Shared/Header';

export default function Products() {
  // Fetch all products
  const { data: products, isLoading, isError } = useAllProductsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState(''); // Add search term state

  // Format Prices
  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  // Sort products by createdAt in descending order (latest first)
  const sortedProducts = products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Filter products based on search term
  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the indices of the products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="rounded-lg p-8">
      {/* <ProductsHeader products={products} /> */}

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 on new search
          }}
          placeholder="Search products..."
          className="px-4 py-2 border rounded-lg w-full"
        />
      </div>

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
              <td className="py-2 px-4">{priceFormatter.format(product.sellingPrice)}</td>
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
