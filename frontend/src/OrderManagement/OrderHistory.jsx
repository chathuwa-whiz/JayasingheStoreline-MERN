import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { useGetOrdersQuery } from '../redux/api/orderApiSlice';

export default function Products() {
  // Fetch all products
  const { data: orders, isLoading, isError } = useGetOrdersQuery();

  console.log(orders);
  
  
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Something went wrong</div>;

  // const [currentPage, setCurrentPage] = useState(1);
  // const productsPerPage = 10;

  // // Calculate the indices of the products to display
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // // Calculate total pages
  // const totalPages = Math.ceil(products.length / productsPerPage);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  return (
    <div className="rounded-lg p-8">
      {/* <table className="min-w-full overflow-y-auto min-h-full border rounded-lg bg-white">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Order Id</th>
            <th className="py-2 px-4 text-left">Order Amount</th>
            <th className="py-2 px-4 text-left">Delivery Price</th>
            <th className="py-2 px-4 text-left">Discount</th>
            <th className="py-2 px-4 text-left">Total Price</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Order Status</th>
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
      </div> */}
    </div>
  );
}
