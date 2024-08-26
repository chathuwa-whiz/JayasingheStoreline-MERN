import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useLocation } from 'react-router-dom'; // Import useLocation for routing

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
  // State to hold the data
  const [data, setData] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const location = useLocation(); // Get current location for page highlighting

  useEffect(() => {
    // Dummy data used for display purposes.
    const dummyData = {
      totalCost: 80000.24,
      totalIncome: 120052.25,
      totalProfit: 45000.52,
      hrSend: 30000.00,
      profitData: [50, 100, 150, 200, 220, 250, 280, 300, 350, 400, 450, 500],
      hrSendData: [46.9, 53.1]
    };

    // Update state with dummy data
    setData(dummyData);

    // Normally, you would fetch data from the API here:
    /*
    fetch('/api/payment-data')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
    */
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Line Chart Data
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Profit',
        data: data.profitData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Profit Overview',
      },
    },
  };

  // Doughnut Chart Data
  const doughnutChartData = {
    labels: ['New Employee', 'Permanent Employee'],
    datasets: [
      {
        label: 'HR Send',
        data: data.hrSendData,
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  // Get classes for navigation items to highlight the current page
  const getNavItemClasses = (path) => {
    return `block text-gray-700 hover:text-gray-900 ${
      location.pathname === path ? 'text-blue-600 font-bold' : ''
    }`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100 flex">
      

      {/* Main content */}
      <main className="flex-1 p-6">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Payment Report</h1>
          <p className="text-gray-600">Welcome back, Vidura Rathnayaka</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          <div className="bg-red-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Total Cost</h3>
            <p className="text-4xl font-bold text-red-600">{data.totalCost}</p>
            <p className="text-red-500">+18% +3.8k this week</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Total Income</h3>
            <p className="text-4xl font-bold text-blue-600">{data.totalIncome}</p>
            <p className="text-blue-500">+18% +2.8k this week</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Total Profit</h3>
            <p className="text-4xl font-bold text-purple-600">{data.totalProfit}</p>
            <p className="text-purple-500">+18% +7.8k this week</p>
          </div>
          <div className="bg-teal-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">HR Send</h3>
            <p className="text-4xl font-bold text-teal-600">{data.hrSend}</p>
            <p className="text-teal-500">+18% +1.2k this week</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Profit</h3>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">HR Send</h3>
            <Doughnut data={doughnutChartData} />
          </div>
        </div>
      </main>
    </div>
  );
}
