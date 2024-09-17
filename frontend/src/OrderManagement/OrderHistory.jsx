import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { useGetOrdersQuery } from '../redux/api/orderApiSlice';

export default function Orders() {
  // Fetch all orders
  const { data: orders, isLoading, isError } = useGetOrdersQuery();

  console.log(orders);
  

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 13; // Number of orders to display per page

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  // Calculate the current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Handle pagination change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
      <table className="min-w-full overflow-y-auto min-h-full border rounded-lg bg-white">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Order Id</th>
            <th className="py-2 px-4 text-left">Items</th>
            <th className="py-2 px-4 text-left">Items Price</th>
            <th className="py-2 px-4 text-left">Discount</th>
            <th className="py-2 px-4 text-left">Total Price</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
            <tbody>
      {currentOrders.map((order, index) => (
        <tr key={order._id} className="border-b border-gray-200">
          <td className="py-2 px-4">{indexOfFirstOrder + index + 1}</td>
          <td className="py-2 px-4">{order.orderId}</td>
          <td className="py-2 px-4">
            {order.orderItems?.map((item) => (
              <div key={item._id}>{item.name} - Qty: {item.qty}</div>
            ))}
          </td>

          <td className="py-2 px-4">{`Rs.${order.itemsPrice.toFixed(2)}`}</td>
          <td className="py-2 px-4">{`Rs.${order.discount.toFixed(2)}`}</td>
          <td className="py-2 px-4">{`Rs.${order.totalPrice.toFixed(2)}`}</td>
          <td className="py-2 px-4">{order.status}</td>
          <td className="py-2 px-4">
            <Link to={`/order/orderhistory/update/${order._id}`}>
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
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mx-2 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-2 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`mx-2 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
