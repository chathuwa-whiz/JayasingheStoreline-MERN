import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
  const barData = {
    labels: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08'],
    datasets: [
      {
        label: 'Deliveries',
        backgroundColor: '#FFA500',
        data: [50000, 250000, 300000, 450000, 200000, 100000, 150000, 400000]
      }
    ]
  };

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

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Reports', 14, 22);

    // Add Bar Chart
    doc.setFontSize(16);
    doc.text('Monthly Deliveries', 14, 40);

    const barChart = document.querySelector('.bar-chart canvas');
    if (barChart) {
      doc.addImage(barChart.toDataURL(), 'PNG', 14, 50, 180, 100);
    }

    // Add Pie Chart
    doc.setFontSize(16);
    doc.text('Most Used Units', 14, 160);

    const pieChart = document.querySelector('.pie-chart canvas');
    if (pieChart) {
      doc.addImage(pieChart.toDataURL(), 'PNG', 14, 170, 180, 100);
    }

    // Add Table
    doc.setFontSize(16);
    doc.text('Details:', 14, 280);

    const details = [
      ['Unit', 'Percentage'],
      ['Lorry A', '20%'],
      ['Lorry B', '35%'],
      ['Lorry C', '12%'],
      ['D Bike', '10%'],
      ['D Tuk', '21%'],
    ];

    doc.autoTable({
      head: details.slice(0, 1),
      body: details.slice(1),
      startY: 290,
      theme: 'striped'
    });

    doc.save('report.pdf');
  };

  const exportToExcel = () => {
    // This is a placeholder function. You will need to implement the logic for exporting data to Excel.
    alert('Export to Excel functionality is not implemented yet.');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Reports</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300">Filters</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300">Select Date</button>
            <span className="font-bold text-gray-700">Yasith JY</span>
            <button
              onClick={exportToPDF}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Export to PDF
            </button>
          </div>
        </div>

        <div className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">Monthly Deliveries</h2>
          <div className="bar-chart">
            <Bar data={barData} />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md mr-4">
            <h2 className="text-xl font-semibold mb-4">Most Used Units</h2>
            <div className="space-y-2">
              {pieData.labels.map((label, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{label}</span>
                  <span>{pieData.datasets[0].data[index]}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md pie-chart">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={exportToPDF}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Export to PDF
          </button>
          <button
            onClick={exportToExcel}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Export to Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
