import React, { useState, useEffect } from 'react';
import { useAllProductsQuery } from '../redux/api/productApiSlice';
import { Pie, Line } from 'react-chartjs-2';
import { FaBell } from 'react-icons/fa';
import { DashboardHeader } from '../Shared/Header';

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Fetch all products
  const { data: products, isLoading: productsLoading, isError: productsError } = useAllProductsQuery();

  useEffect(() => {
    if (products) {
      const lowStockNotifications = products
        .filter(product => product.currentQty < 5)
        .map(product => ({
          id: product._id,
          message: `Low stock alert: ${product.name} (${product.currentQty} remaining)`,
          type: 'warning'
        }));
      setNotifications(lowStockNotifications);
    }
  }, [products]);

  if (productsLoading) return <div>Loading...</div>;
  if (productsError) return <div>Something went wrong</div>;

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

  // Best-Selling Products (Mocked for illustration)
  const bestSellingProducts = products.slice(0, 5); // Assuming top 5 for now

  // Data for charts
  const salesByCategoryData = {
    labels: categories,
    datasets: [{
      data: categories.map(category => 
        products.filter(product => product.category === category).length),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      hoverBackgroundColor: ['#FF7384', '#46A2EB', '#FFDE56', '#5BC0C0', '#A966FF'],
    }]
  };

  // Mocked Stock Trend Data
  const stockTrendData = {
    labels: products.map(product => product.name),
    datasets: [{
      label: 'Stock Quantity',
      data: products.map(product => product.currentQty),
      fill: true,
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      tension: 0.4,
    }]
  };

  return (
    <div className="overflow-auto bg-gray-100 p-6 rounded-lg relative">
      {/* Notification Icon */}
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 bg-white rounded-full shadow-lg"
        >
          <FaBell className="text-gray-600" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20">
            <div className="py-2">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} className="px-4 py-2 hover:bg-gray-100">
                    <p className={`text-sm ${notification.type === 'warning' ? 'text-yellow-600' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-700">No new notifications</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-green-800">{products.length}</h2>
          <p className="text-lg text-gray-700">Total Products</p>
          {/* <p className="text-green-600">+18% +3.8k this week</p> */}
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-yellow-800">{categories.length}</h2>
          <p className="text-lg text-gray-700">Total Categories</p>
          {/* <p className="text-yellow-600">+18% +2.8k this week</p> */}
        </div>
        <div className="bg-blue-100 p-6 rounded-lg text-center shadow-lg overflow-auto">
          <h2 className="text-3xl font-bold text-blue-800">{priceFormatter.format(stockValue)}</h2>
          <p className="text-lg text-gray-700">Total Stock Value</p>
          {/* <p className="text-blue-600">+18% +7.8k this week</p> */}
        </div>
        <div className="bg-red-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-red-800">{lowStock}</h2>
          <p className="text-lg text-gray-700">Low Stock</p>
          {/* <p className="text-red-600">+18% +1.2k this week</p> */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Stock Trends</h3>
          <div className="relative h-64">
            <Line data={stockTrendData} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Sales by Category</h3>
          <div className="relative h-64 flex items-center justify-center">
            <Pie data={salesByCategoryData} />
          </div>
        </div>
      </div>

      {/* Best-Selling Products */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Best-Selling Products</h3>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2">Product Name</th>
              <th className="px-4 py-2 border-b-2">Category</th>
              <th className="px-4 py-2 border-b-2">Stock Remaining</th>
            </tr>
          </thead>
          <tbody>
            {bestSellingProducts.map(product => (
              <tr key={product._id} className="text-center hover:bg-gray-100">
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">{product.currentQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
