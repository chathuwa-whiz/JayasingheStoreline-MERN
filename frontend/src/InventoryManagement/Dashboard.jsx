import React from 'react';
import { useAllProductsQuery } from '../redux/api/productApiSlice';
import { useGetOrdersQuery } from '../redux/api/orderApiSlice';
import { Pie, Line } from 'react-chartjs-2';

export default function Dashboard() {

  // Fetch all products
  const { data: products, isLoading: productsLoading, isError: productsError } = useAllProductsQuery();

  // Fetch all orders
  const { data: orders, isLoading: ordersLoading, isError: ordersError } = useGetOrdersQuery();

  if (productsLoading || ordersLoading) return <div>Loading...</div>;
  if (productsError || ordersError) return <div>Something went wrong</div>;

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
  
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

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

  const revenueData = {
    labels: orders.map(order => new Date(order.createdAt).toLocaleDateString()),
    datasets: [{
      label: 'Revenue',
      data: orders.map(order => order.totalPrice),
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.4,
    }]
  };

  return (
    <div className="overflow-auto bg-gray-100 p-6 rounded-lg">

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-green-800">{products.length}</h2>
          <p className="text-lg text-gray-700">Total Products</p>
          <p className="text-green-600">+18% +3.8k this week</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-yellow-800">{categories.length}</h2>
          <p className="text-lg text-gray-700">Total Categories</p>
          <p className="text-yellow-600">+18% +2.8k this week</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg text-center shadow-lg overflow-auto">
          <h2 className="text-3xl font-bold text-blue-800">{priceFormatter.format(stockValue)}</h2>
          <p className="text-lg text-gray-700">Total Stock Value</p>
          <p className="text-blue-600">+18% +7.8k this week</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-red-800">{lowStock}</h2>
          <p className="text-lg text-gray-700">Low Stock</p>
          <p className="text-red-600">+18% +1.2k this week</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Revenue Stats</h3>
          <div className="relative h-64">
            <Line data={revenueData} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Sales by Category</h3>
          <div className="relative h-64 flex items-center justify-center">
            <Pie data={salesByCategoryData} />
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
            {orders.slice(0, 5).map(order => (
              <tr key={order._id} className="text-center hover:bg-gray-100">
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{priceFormatter.format(order.totalPrice)}</td>
                <td className="border px-4 py-2">
                  <span className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                    order.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
