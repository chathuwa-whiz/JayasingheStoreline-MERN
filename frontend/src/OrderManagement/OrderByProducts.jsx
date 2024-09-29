import React, { useState, useEffect } from 'react';
import { useAllProductsQuery } from '../redux/api/productApiSlice'; // Adjust the import based on your setup

export default function Products() {
  const { data: products, isLoading: productsLoading, isError: productsError } = useAllProductsQuery();

  // State to store loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Format Prices
  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
  });

  useEffect(() => {
    // Handle loading and error states based on API data
    if (productsLoading) {
      setIsLoading(true);
    } else if (productsError) {
      setIsError(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [productsLoading, productsError]);

  // Display loading or error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Get order summary data by product name
  const getOrderSummaryByProductName = (productName) => {
    const product = products.find(p => p.name === productName);
    return product ? { totalOrders: product.totalOrders, totalRevenue: product.totalOrders * product.sellingPrice } : { totalOrders: 0, totalRevenue: 0 };
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
    <div className="rounded-lg p-8">
      <table className="min-w-full border rounded-lg bg-white">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Product ID</th>
            <th className="py-2 px-4 text-left">Product Name</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-left">Selling Price</th>
            <th className="py-2 px-4 text-left">Buying Price</th>
            <th className="py-2 px-4 text-left">Total Orders</th>
            <th className="py-2 px-4 text-left">Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => {
            const { totalOrders, totalRevenue } = getOrderSummaryByProductName(product.name);

            return (
              <tr key={product._id} className="border-b border-gray-200">
                <td className="py-2 px-4">{indexOfFirstProduct + index + 1}</td>
                <td className="py-2 px-4">
                  <img src={product.image} alt={product.name} className="w-10 h-10" />
                </td>
                <td className="py-2 px-4">{product.sku}</td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4">{priceFormatter.format(product.sellingPrice)}</td>
                <td className="py-2 px-4">{priceFormatter.format(product.buyingPrice)}</td>
                <td className="py-2 px-4">{totalOrders}</td>
                <td className="py-2 px-4">{priceFormatter.format(totalRevenue)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}
