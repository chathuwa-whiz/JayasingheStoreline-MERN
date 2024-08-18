import React from 'react';
import { Bar } from 'react-chartjs-2'; // Assuming you're using react-chartjs-2 for charts
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // This is necessary for chart.js to work

const Reports = () => {
  // Data for Bar Chart
  const barData = {
    labels: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08'],
    datasets: [
      {
        label: 'Deliveries',
        backgroundColor: '#FFA500', // orange
        data: [50000, 250000, 300000, 450000, 200000, 100000, 150000, 400000]
      }
    ]
  };

  // Data for Pie Chart
  const pieData = {
    labels: ['Lorry A', 'Lorry B', 'Lorry C', 'D Bike', 'D Tuk'],
    datasets: [
      {
        label: 'Most Used Units',
        data: [20, 35, 12, 10, 21],
        backgroundColor: ['#FF6347', '#FFD700', '#90EE90', '#00BFFF', '#FF69B4']
      }
    ]
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Reports</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300">Filters</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300">Select Date</button>
            <span className="font-bold text-gray-700">Yasith JY</span>
          </div>
        </div>

        {/* Monthly Deliveries Bar Chart */}
        <div className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">Monthly Deliveries</h2>
          <Bar data={barData} />
        </div>

        {/* Pie Chart and Most Used Units */}
        <div className="flex justify-between">
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md mr-4">
            <h2 className="text-xl font-semibold mb-4">Most Used Units</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Lorry A</span>
                <span>20%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Lorry B</span>
                <span>35%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Lorry C</span>
                <span>12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">D Bike</span>
                <span>10%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">D Tuk</span>
                <span>21%</span>
              </div>
            </div>
          </div>
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
            <Pie data={pieData} />
          </div>
        </div>

        {/* Export Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Export to PDF</button>
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Export to Excel</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
