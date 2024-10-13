import React, { useState } from 'react';
import { useAllProductsQuery } from '../redux/api/productApiSlice';
import { useGetOrdersQuery } from '../redux/api/orderApiSlice';
import { useGetDeliveriesQuery } from '../redux/api/deliveryApiSlice';
import { Pie, Line } from 'react-chartjs-2';
import { FaBell } from 'react-icons/fa';

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  // Fetch all products
  const { data: products, isLoading: productsLoading, isError: productsError } = useAllProductsQuery();

  // Fetch all orders
  const { data: orders, isLoading: ordersLoading, isError: ordersError } = useGetOrdersQuery();

  // Fetch all deliveries
  const { data: deliveries, isLoading: deliveriesLoading, isError: deliveriesError } = useGetDeliveriesQuery();

  if (productsLoading || ordersLoading || deliveriesLoading) return <div>Loading...</div>;
  if (productsError || ordersError || deliveriesError) return <div>Something went wrong</div>;

  // Data calculations
  const categoryList = [];
  let stockValue = 0;
  let lowStock = 0;

  // Format Prices
  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
  });

  for (const product of products) {
    categoryList.push(product.category);
    stockValue += product.buyingPrice * product.currentQty;
    if (product.currentQty < 5) {
      lowStock++;
    }
  }
  const categories = [...new Set(categoryList)];

  // Calculate total orders, completed orders, and pending orders
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'Completed').length;
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;

  // Calculate total revenue from orders
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  // Data for charts
  const ordersPieChartData = {
    labels: ['Completed Orders', 'Pending Orders'],
    datasets: [
      {
        data: [completedOrders, pendingOrders],
        backgroundColor: ['#99FF99', '#FF6666'],
        hoverBackgroundColor: ['#3CB371', '#FF7384'],
      },
    ],
  };

  const revenueData = {
    labels: orders.map(order => new Date(order.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Revenue',
        data: orders.map(order => order.totalPrice),
        fill: true,
        backgroundColor: 'rgb(219, 234, 254)',
        borderColor: 'rgb(30, 64, 175)',
        tension: 0.4,
      },
    ],
  };

  // Sort orders by creation date in descending order for recent orders
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="relative overflow-auto bg-gray-100 p-6 rounded-lg">
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
                    {/* <p className="text-sm text-gray-600">Order ID: {delivery.orderId}</p> */}
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

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-green-800">{totalOrders}</h2>
          <p className="text-lg text-gray-700">Total Orders</p>
          <p className="text-green-600">+18% +3.8k this week</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-yellow-800">{completedOrders}</h2>
          <p className="text-lg text-gray-700">Completed Orders</p>
          <p className="text-yellow-600">+18% +2.8k this week</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-red-800">{pendingOrders}</h2>
          <p className="text-lg text-gray-700">Pending Orders</p>
          <p className="text-red-600">+18% +1.2k this week</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg text-center shadow-lg overflow-auto">
          <h2 className="text-3xl font-bold text-blue-800">{priceFormatter.format(totalRevenue)}</h2>
          <p className="text-lg text-gray-700">Order Revenue</p>
          <p className="text-blue-600">+18% +7.8k this week</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Order Status Distribution</h3>
          <div className="relative h-64 flex items-center justify-center">
            <Pie data={ordersPieChartData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Revenue Stats</h3>
          <div className="relative h-64">
            <Line data={revenueData} />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h3>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2">Order ID</th>
              <th className="px-4 py-2 border-b-2">Date</th>
              <th className="px-4 py-2 border-b-2">Total</th>
              <th className="px-4 py-2 border-b-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.slice(0, 5).map(order => (
              <tr key={order._id} className="text-center hover:bg-gray-100">
                <td className="border px-4 py-2">{order.orderId}</td>
                <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{priceFormatter.format(order.totalPrice)}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                      order.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="mt-12 text-center text-gray-600">
        <p>&copy; 2024 Jayasinghe Storeline. All rights reserved.</p>
      </footer>
    </div>
  );
}
