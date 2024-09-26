import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import 'chart.js/auto';

const Reports = () => {
  const [timeframe, setTimeframe] = useState('monthly');

  // Sample data for reports
  const monthlyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
    datasets: [
      {
        label: 'Monthly Deliveries',
        backgroundColor: '#FFA500',
        data: [50, 200, 150, 300, 250, 400, 350, 500],
      },
    ],
  };

  const weeklyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weekly Deliveries',
        backgroundColor: '#00BFFF',
        data: [20, 30, 25, 40],
      },
    ],
  };

  const dailyData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Daily Deliveries',
        backgroundColor: '#32CD32',
        data: [5, 10, 8, 15, 12, 20, 18],
      },
    ],
  };

  const pieData = {
    labels: ['Lorry A', 'Lorry B', 'D Bike', 'D Tuk'],
    datasets: [
      {
        label: 'Most Used Units',
        data: [30, 40, 20, 10],
        backgroundColor: ['#FF6347', '#FFD700', '#90EE90', '#00BFFF'],
      },
    ],
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Jayasinghe Storelines PVT LTD Report', 14, 22);
    // Add content...
    doc.save('report.pdf');
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ['Unit', 'Percentage'],
      ['Lorry A', '30%'],
      ['Lorry B', '40%'],
      ['D Bike', '20%'],
      ['D Tuk', '10%'],
    ]);
    XLSX.utils.book_append_sheet(wb, ws, 'Most Used Units');
    XLSX.writeFile(wb, 'report.xlsx');
  };

  const chartData = timeframe === 'monthly' ? monthlyData : timeframe === 'weekly' ? weeklyData : dailyData;

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="flex flex-col">
        <h1 className="text-5xl font-extrabold text-gray-800 shadow-md mb-8 text-center">Delivery Reports</h1>

        <div className="flex justify-center mb-6">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="monthly">Monthly Reports</option>
            <option value="weekly">Weekly Reports</option>
            <option value="daily">Daily Reports</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <h2 className="text-4xl font-semibold text-gray-800 text-center mb-4">{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Deliveries</h2>
            <div className="h-80">
              <Bar data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Most Used Units</h2>
            <div className="h-80">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Unit Distribution</h2>
            <ul className="space-y-2">
              {pieData.labels.map((label, index) => (
                <li key={index} className="flex items-center justify-between text-gray-700">
                  <span className="font-medium">{label}</span>
                  <span>{pieData.datasets[0].data[index]}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={exportToPDF}
            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
          >
            Export to PDF
          </button>
          <button
            onClick={exportToExcel}
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
          >
            Export to Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
