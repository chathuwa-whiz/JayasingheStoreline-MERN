import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip);

export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState(0);
  const [completedDeliveries, setCompletedDeliveries] = useState(0);
  const [delayedDeliveries, setDelayedDeliveries] = useState(0);

  // Fetch deliveries from the server
  const fetchDeliveries = async () => {
    try {
      const response = await fetch("/api/deliveries");
      const data = await response.json();
      setDeliveries(data);

      // Calculate delivery statistics
      const pending = data.filter(d => d.status === 'Pending').length;
      const completed = data.filter(d => d.status === 'Completed').length;
      const delayed = data.filter(d => d.status === 'Delayed').length;

      setPendingDeliveries(pending);
      setCompletedDeliveries(completed);
      setDelayedDeliveries(delayed);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const deliveryTrendsData = {
    labels: ['Last Week', 'Current Week'],
    datasets: [
      {
        label: 'Deliveries',
        data: [10, 20], // Replace with actual data
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const deliveryTrendsOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Delivery Trends',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 overflow-y-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Yasith JY</h1>
        <p className="text-gray-500">Track and manage your deliveries effectively</p>
      </header>

      {/* Statistics Section */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-600">{deliveries.length}</h2>
          <p className="text-gray-600">Total Deliveries</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-yellow-600">{pendingDeliveries}</h2>
          <p className="text-gray-600">Pending Deliveries</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600">{completedDeliveries}</h2>
          <p className="text-gray-600">Completed Deliveries</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-red-600">{delayedDeliveries}</h2>
          <p className="text-gray-600">Delayed Deliveries</p>
        </div>
      </div>

      {/* Delivery Trends Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Delivery Trends</h2>
        <div className="relative h-64">
          <Line data={deliveryTrendsData} options={deliveryTrendsOptions} />
        </div>
      </div>

      {/* Delivery Insights Section */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upcoming Deliveries</h2>
          {/* Insert a component or list to display upcoming deliveries */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delivery Performance</h2>
          {/* Insert a component or chart for delivery performance insights */}
        </div>
      </div>
    </div>
  );
}
