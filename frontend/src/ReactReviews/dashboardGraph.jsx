import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const [totalRatings] = useState(2000000);
  const [totalInquiries] = useState(500);
  const [ratingsData] = useState([
    { star: 1, count: 2 },
    { star: 2, count: 8 },
    { star: 3, count: 15 },
    { star: 4, count: 20 },
    { star: 5, count: 50 },
  ]);

  const calculatePercentage = () => {
    const totalRatingsCount = ratingsData.reduce((sum, item) => sum + item.count, 0);
    return ratingsData.map((item) => ({
      ...item,
      percentage: (item.count / totalRatingsCount) * 100,
    }));
  };

  const percentageData = calculatePercentage();

  const pieChartColors = ['#f59e0b', '#f0f8ff', '#38a169', '#4299e1', '#994d4d'];

  const pieChartData = {
    labels: percentageData.map((item) => `${item.star} Star`),
    datasets: [
      {
        data: percentageData.map((item) => item.count),
        backgroundColor: pieChartColors,
        hoverBackgroundColor: pieChartColors.map((color) => darkenColor(color, 20)),
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = percentageData[context.dataIndex].percentage.toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  function darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16)
        .slice(1)
    );
  }

  // Bar chart data for countries
  const barChartData = {
    labels: ['USA', 'China', 'India', 'Brazil', 'UK', 'Germany'],
    datasets: [
      {
        label: 'Population (millions)',
        data: [331, 1439, 1380, 213, 68, 83], // Sample population data
        backgroundColor: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
        borderColor: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} million`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Countries',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Population (millions)',
        },
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-2">Total Ratings</h2>
          <p className="text-3xl font-bold text-blue-500">{totalRatings.toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-2">Total Inquiries</h2>
          <p className="text-3xl font-bold text-blue-500">{totalInquiries}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md col-span-3">
          <h2 className="text-lg font-bold mb-2">Ratings as Percentage</h2>
          <div className="flex justify-center mt-4">
            <div className="w-96 h-96">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-4 col-span-3">
          <h2 className="text-lg font-bold mb-2">Ratings Distribution</h2>
          <div className="mt-4 grid grid-cols-5 gap-4">
            {ratingsData.map((item, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg text-center">
                <p className="text-lg font-bold">{item.count}</p>
                <p className="text-sm">{item.star} star</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-4 col-span-3">
          <h2 className="text-lg font-bold mb-2">Countries Population Bar Chart</h2>
          <div className="flex justify-center mt-4">
            <div className="w-full h-96">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
