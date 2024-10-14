import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaSearch, FaBell } from "react-icons/fa";
import { useGetOrdersQuery } from '../redux/api/orderApiSlice';
import { useGetDeliveriesQuery } from '../redux/api/deliveryApiSlice';

export default function Orders() {
  // Fetch all orders
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  // Fetch all deliveries
  const { data: deliveries, isLoading: deliveriesLoading, isError: deliveriesError } = useGetDeliveriesQuery();
  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 13;

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Notification state
  const [showNotifications, setShowNotifications] = useState(false);

  if (isLoading || deliveriesLoading) return <div>Loading...</div>;
  if (isError || deliveriesError) return <div>Something went wrong</div>;

  // Filter orders based on search term
  const filteredOrders = orders.filter((order) => {
    const orderItems = JSON.parse(order.orderItems)
      .map(item => item.name.toLowerCase())
      .join(' ');

    return (
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orderItems.includes(searchTerm.toLowerCase())
    );
  });

  // Suggestion logic for dropdown
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const newSuggestions = orders.filter((order) =>
        order.orderId.toLowerCase().includes(value.toLowerCase()) ||
        order.status.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(newSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  // Calculate current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Handle pagination change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative bg-gray-100 p-8 rounded-lg shadow-lg">
      {/* Notification Icon */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FaBell size={24} />
          {deliveries && deliveries.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {deliveries.length}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
            <div className="py-2">
              <h3 className="text-lg font-semibold text-gray-800 px-4 py-2">Delivery Notifications</h3>
              {deliveries && deliveries.length > 0 ? (
                deliveries.map((delivery) => (
                  <div key={delivery._id} className="px-4 py-2 hover:bg-gray-100">
                    <p className="text-sm text-gray-600">Order ID: {delivery.orderId}</p>
                    <p className="text-sm font-semibold text-gray-800">Status: {delivery.deliveryStatus}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600 px-4 py-2">No deliveries to show.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Search bar with dropdown suggestions */}
      <div className="relative mb-4 w-full sm:w-3/3">
        <div className="flex items-center">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by Order ID, Status, or Items"
            className="pl-10 py-2 border rounded-lg w-full"
          />
        </div>
        {/* Dropdown for suggestions */}
        {suggestions.length > 0 && (
          <div className="bg-white border mt-1 rounded-lg shadow-lg absolute right-0 z-10 max-h-40 overflow-y-auto w-full">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion._id}
                onClick={() => {
                  setSearchTerm(suggestion.orderId);
                  setSuggestions([]); // Clear suggestions after selection
                }}
                className="p-2 hover:bg-orange-300 cursor-pointer"
              >
                {suggestion.orderId} - {suggestion.status}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Orders Table */}
      <table className="min-w-full overflow-y-auto min-h-full border rounded-lg bg-white">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Order Id</th>
            <th className="py-2 px-4 text-left">Items</th>
            <th className="py-2 px-4 text-left">Items Price</th>
            <th className="py-2 px-4 text-left">Discount</th>
            <th className="py-2 px-4 text-left">Total Price</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.length > 0 ? (
            currentOrders.map((order, index) => (
              <tr key={order._id} className="border-b border-gray-200">
                <td className="py-2 px-4">{indexOfFirstOrder + index + 1}</td>
                <td className="py-2 px-4">{order.orderId}</td>
                <td className="py-2 px-4">
                  {JSON.parse(order.orderItems).map((item) => (
                    <div key={item._id}>
                      <p>{item.name} x {item.qty}</p>
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4">{priceFormatter.format(order.itemsPrice)}</td>
                <td className="py-2 px-4">{priceFormatter.format(order.discount)}</td>
                <td className="py-2 px-4">{priceFormatter.format(order.totalPrice)}</td>
                <td className="py-2 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                      order.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <Link to={`/order/orderhistory/update/${order._id}`}>
                    <button className="text-green-500 hover:text-green-700 mx-2">
                      <FaPen />
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="py-4 text-center text-gray-500">
                No results found
              </td>
            </tr>
          )}
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
