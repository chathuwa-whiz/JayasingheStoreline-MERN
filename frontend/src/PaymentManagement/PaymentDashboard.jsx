import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useAllProductsQuery } from '../redux/api/productApiSlice'; // Import the hook
import { FaDollarSign, FaTags, FaCalendarAlt, FaUsers } from 'react-icons/fa'; // Import icons

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PaymentDashboard() {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  const [lineChartData, setLineChartData] = useState(null);
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const [hrSendChartData, setHrSendChartData] = useState(null);
  const [supplierSendChartData, setSupplierSendChartData] = useState(null);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    if (!products) return;

    // Calculate total profit
    const profit = products.reduce((acc, product) => acc + (product.sellingPrice - product.buyingPrice), 0);
    setTotalProfit(profit);

    // Process data for line chart
    const profitData = products.map(product => product.sellingPrice); // Replace with actual profit data if available
    const monthlyProfit = new Array(12).fill(0); // Assuming 12 months
    profitData.forEach((price, index) => {
      const month = new Date().getMonth(); // Dummy data for current month
      monthlyProfit[month] += price;
    });

    setLineChartData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Monthly Profit',
          data: monthlyProfit,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    });

    // Process data for doughnut chart
    const categoryCounts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
    const categories = Object.keys(categoryCounts);
    const counts = Object.values(categoryCounts);

    setDoughnutChartData({
      labels: categories,
      datasets: [
        {
          label: 'Product Categories',
          data: counts,
          backgroundColor: categories.map((_, index) => `hsl(${index * 360 / categories.length}, 70%, 70%)`), // Dynamic colors
          hoverBackgroundColor: categories.map((_, index) => `hsl(${index * 360 / categories.length}, 70%, 80%)`),
        },
      ],
    });

    // Dummy data for HR Send chart
    const hrSendData = [60, 40]; // Replace with actual HR Send data
    setHrSendChartData({
      labels: ['New Employee', 'Permanent Employee'],
      datasets: [
        {
          label: 'HR Send',
          data: hrSendData,
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        },
      ],
    });

    // Dummy data for Supplier Send chart
    const supplierSendData = [70, 30]; // Replace with actual Supplier Send data
    setSupplierSendChartData({
      labels: ['Supplier A', 'Supplier B'],
      datasets: [
        {
          label: 'Supplier Send',
          data: supplierSendData,
          backgroundColor: ['#FFCE56', '#4BC0C0'],
          hoverBackgroundColor: ['#FFCE56', '#4BC0C0'],
        },
      ],
    });
  }, [products]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100 flex">
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Payment Report</h1>
          <p className="text-gray-600">Welcome back, Vidura Rathnayaka</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-r from-red-300 to-red-500 p-6 rounded-lg shadow-lg flex items-center">
            <FaDollarSign className="text-white text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">Total Cost</h3>
              <p className="text-3xl font-bold text-white">Rs.{products.reduce((acc, product) => acc + product.sellingPrice, 0).toFixed(2)}</p>
              <p className="text-white">+18% +3.8k this week</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-300 to-blue-500 p-6 rounded-lg shadow-lg flex items-center">
            <FaTags className="text-white text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">Total Income</h3>
              <p className="text-3xl font-bold text-white">Rs.{products.reduce((acc, product) => acc + product.sellingPrice, 0).toFixed(2)}</p>
              <p className="text-white">+18% +2.8k this week</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-300 to-purple-500 p-6 rounded-lg shadow-lg flex items-center">
            <FaCalendarAlt className="text-white text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">Total Profit</h3>
              <p className="text-3xl font-bold text-white">Rs.{totalProfit.toFixed(2)}</p>
              <p className="text-white">+18% +7.8k this week</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-teal-300 to-teal-500 p-6 rounded-lg shadow-lg flex items-center">
            <FaUsers className="text-white text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">HR Send</h3>
              <p className="text-3xl font-bold text-white">Rs.{products.reduce((acc, product) => acc + product.sellingPrice, 0).toFixed(2)}</p>
              <p className="text-white">+18% +1.2k this week</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Profit</h3>
            {lineChartData ? <Line data={lineChartData} /> : <div>Loading chart data...</div>}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Product Categories</h3>
            {doughnutChartData ? <Doughnut data={doughnutChartData} /> : <div>Loading chart data...</div>}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">HR Send</h3>
            {hrSendChartData ? <Doughnut data={hrSendChartData} /> : <div>Loading chart data...</div>}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Supplier Send</h3>
            {supplierSendChartData ? <Doughnut data={supplierSendChartData} /> : <div>Loading chart data...</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
