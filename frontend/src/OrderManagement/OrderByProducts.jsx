import React, { useState } from 'react';

// Dummy data for products
const products = [
  {
    id: 'PROD001',
    name: 'Product 1',
    price: 500,
    orderQuantity: 10,
    buyingPrice: 400,
    sellingPrice: 600,
  },
  {
    id: 'PROD002',
    name: 'Product 2',
    price: 1000,
    orderQuantity: 5,
    buyingPrice: 800,
    sellingPrice: 1200,
  },
  {
    id: 'PROD003',
    name: 'Product 3',
    price: 200,
    orderQuantity: 20,
    buyingPrice: 150,
    sellingPrice: 250,
  },
  // Add more products as needed
];

export default function OrdersByProduct() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Calculate the indices of the products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateTotalRevenue = (orderQuantity, sellingPrice) => {
    return orderQuantity * sellingPrice;
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
      {/* <h2 className="text-3xl font-bold text-gray-800 mb-6">Orders by Product</h2> */}
      <table className="min-w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="py-3 px-4 text-left font-semibold">Product ID</th>
            <th className="py-3 px-4 text-left font-semibold">Product Name</th>
            <th className="py-3 px-4 text-left font-semibold">Product Price</th>
            <th className="py-3 px-4 text-left font-semibold">Order Quantity</th>
            <th className="py-3 px-4 text-left font-semibold">Buying Price</th>
            <th className="py-3 px-4 text-left font-semibold">Selling Price</th>
            <th className="py-3 px-4 text-left font-semibold">Total Revenue</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {currentProducts.map((product) => (
            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4">{product.id}</td>
              <td className="py-3 px-4">{product.name}</td>
              <td className="py-3 px-4">{`Rs.${product.price.toFixed(2)}`}</td>
              <td className="py-3 px-4">{product.orderQuantity}</td>
              <td className="py-3 px-4">{`Rs.${product.buyingPrice.toFixed(2)}`}</td>
              <td className="py-3 px-4">{`Rs.${product.sellingPrice.toFixed(2)}`}</td>
              <td className="py-3 px-4">{`Rs.${calculateTotalRevenue(product.orderQuantity, product.sellingPrice).toFixed(2)}`}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-orange-400 hover:text-white transition-colors duration-200`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
