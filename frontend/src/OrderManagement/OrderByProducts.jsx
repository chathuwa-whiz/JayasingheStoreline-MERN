import React, { useState, useEffect } from 'react';

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
    <div className="rounded-lg p-8">
      <table className="min-w-full overflow-y-auto min-h-full border rounded-lg bg-white">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Product ID</th>
            <th className="py-2 px-4 text-left">Product Name</th>
            <th className="py-2 px-4 text-left">Product Price</th>
            <th className="py-2 px-4 text-left">Order Quantity</th>
            <th className="py-2 px-4 text-left">Buying Price</th>
            <th className="py-2 px-4 text-left">Selling Price</th>
            <th className="py-2 px-4 text-left">Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id} className="border-b border-gray-200">
              <td className="py-2 px-4">{product.id}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{`Rs.${product.price.toFixed(2)}`}</td>
              <td className="py-2 px-4">{product.orderQuantity}</td>
              <td className="py-2 px-4">{`Rs.${product.buyingPrice.toFixed(2)}`}</td>
              <td className="py-2 px-4">{`Rs.${product.sellingPrice.toFixed(2)}`}</td>
              <td className="py-2 px-4">{`Rs.${calculateTotalRevenue(product.orderQuantity, product.sellingPrice).toFixed(2)}`}</td>
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
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

