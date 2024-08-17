import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';

export default function Dashboard() {
  // Dummy Data for Stats
  const stats = [
    { label: 'Total Deliveries', value: '250', percentage: '+18%', weekly: '+3.8k this week', color: 'bg-green-100' },
    { label: 'Total Earnings', value: '1.234', percentage: '+18%', weekly: '+2.8k this week', color: 'bg-blue-100' },
    { label: 'Available Units', value: '28', units: ['Lorry A - 10', 'Lorry B - 02', 'Lorry C - 03', 'D Tuk - 08', 'D Bike - 5'], color: 'bg-blue-100' },
    { label: 'Ongoing Units', value: '12', units: ['Lorry C - 01', 'D Tuk - 02', 'D Bike - 09'], color: 'bg-red-100' }
  ];

  // Dummy Data for Line Chart
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Delivery Stats',
        data: [50, 70, 100, 120, 150, 180, 200, 220, 250],
        fill: false,
        borderColor: '#f97316',
        tension: 0.1,
      },
    ],
  };

  // Dummy Data for Doughnut Chart
  const doughnutData = {
    labels: ['Electronics', 'Furniture'],
    datasets: [
      {
        data: [53.1, 46.9],
        backgroundColor: ['#f97316', '#facc15'],
      },
    ],
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome back, Yasith JY</h1>
        <div className="flex items-center">
          <span className="mr-4">Yasith JY</span>
          <img src="path/to/avatar.png" alt="Avatar" className="w-12 h-12 rounded-full" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`p-4 ${stat.color} rounded-lg shadow-md`}>
            <h2 className="text-lg font-semibold">{stat.label}</h2>
            <p className="text-4xl font-bold">{stat.value}</p>
            <p className="text-green-500">{stat.percentage}</p>
            <p className="text-gray-500">{stat.weekly}</p>
            {stat.units && (
              <ul className="mt-2 text-gray-600">
                {stat.units.map((unit, idx) => (
                  <li key={idx}>{unit}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery Stats</h2>
          <Line data={lineData} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery By Product</h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
}
