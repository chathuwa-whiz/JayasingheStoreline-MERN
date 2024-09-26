import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv'; // For exporting CSV files
import jsPDF from 'jspdf'; // For exporting PDF files
import 'jspdf-autotable'; // AutoTable plugin for jsPDF
import { Bar, Pie } from 'react-chartjs-2'; // Import Chart components
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Reports() {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await fetch('/api/deliveries');
      const data = await response.json();
      setDeliveries(data);
      setFilteredDeliveries(data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  const calculateTotalEarnings = () => {
    return deliveries.reduce((acc, delivery) => acc + delivery.deliveryPrice, 0);
  };

  const calculateTotalDeliveries = () => {
    return deliveries.length;
  };

  const calculateDeliveredItems = () => {
    return deliveries.reduce((acc, delivery) => acc + delivery.itemsCount, 0);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = deliveries.filter((delivery) =>
      delivery.deliveryItems && delivery.deliveryItems.some((item) =>
        item.name.toLowerCase().includes(value)
      )
    );
    setFilteredDeliveries(filtered);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Jayasinghe Storelines PVT LTD - Delivery Report', 20, 20);
    doc.autoTable({
      head: [['Delivery Items', 'Items Price (LKR)', 'Delivery Price (LKR)', 'Total Price (LKR)', 'Status']],
      body: deliveries.map((delivery) => [
        Array.isArray(delivery.deliveryItems) ? delivery.deliveryItems.map(item => item.name).join(', ') : 'No items', // Handling array of items
        delivery.itemsPrice,
        delivery.deliveryPrice,
        delivery.totalPrice,
        delivery.status || 'Pending',
      ]),
    });
    doc.save('DeliveryReport.pdf');
  };

  const csvData = deliveries.map((delivery) => ({
    Delivery_Items: Array.isArray(delivery.deliveryItems) ? delivery.deliveryItems.map(item => item.name).join(', ') : 'No items', // Handling array of items for CSV export
    Items_Price: `${delivery.itemsPrice} LKR`,
    Delivery_Price: `${delivery.deliveryPrice} LKR`,
    Total_Price: `${delivery.totalPrice} LKR`,
    Status: delivery.status || 'Pending',
  }));

  // Data for Bar Chart (Total Deliveries per Status)
  const barData = {
    labels: ['Pending', 'Completed', 'Delayed'],
    datasets: [
      {
        label: 'Total Deliveries',
        data: [
          deliveries.filter((delivery) => delivery.status === 'Pending').length,
          deliveries.filter((delivery) => delivery.status === 'Completed').length,
          deliveries.filter((delivery) => delivery.status === 'Delayed').length,
        ],
        backgroundColor: ['#fbbf24', '#4ade80', '#f87171'],
        borderWidth: 1,
      },
    ],
  };

  // Data for Pie Chart (Earnings Breakdown)
  const pieData = {
    labels: ['Items Price', 'Delivery Price'],
    datasets: [
      {
        label: 'Earnings Breakdown',
        data: [
          deliveries.reduce((acc, delivery) => acc + delivery.itemsPrice, 0),
          deliveries.reduce((acc, delivery) => acc + delivery.deliveryPrice, 0),
        ],
        backgroundColor: ['#34d399', '#60a5fa'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Delivery Reports</h1>

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search Deliveries"
          value={searchTerm}
          onChange={handleSearch}
          className="p-3 border border-gray-300 rounded-lg shadow-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
        />
        <div className="space-x-4">
          <CSVLink
            data={csvData}
            filename={"Delivery_Report.csv"}
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
          >
            Export to CSV
          </CSVLink>
          <button
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            onClick={generatePDF}
          >
            Export to PDF
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2 text-gray-700">Report Summary</h2>
        <p>Total Deliveries: <strong>{calculateTotalDeliveries()}</strong></p>
        <p>Total Earnings: <strong>{calculateTotalEarnings()} LKR</strong></p>
        <p>Total Delivered Items: <strong>{calculateDeliveredItems()}</strong></p>
      </div>

      {/* Bar Chart for Delivery Status */}
      <div className="my-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Total Deliveries per Status</h3>
        <Bar data={barData} className="w-full h-96 bg-white p-4 rounded-lg shadow-lg" />
      </div>

      {/* Pie Chart for Earnings */}
      <div className="my-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Earnings Breakdown</h3>
        <Pie data={pieData} className="w-full h-96 bg-white p-4 rounded-lg shadow-lg" />
      </div>

      <table className="w-full bg-white shadow-lg rounded-lg border border-gray-300">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="border p-3 text-left">Delivery Items</th>
            <th className="border p-3 text-left">Items Price</th>
            <th className="border p-3 text-left">Delivery Price</th>
            <th className="border p-3 text-left">Total Price</th>
            <th className="border p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeliveries.map((delivery) => (
            <tr key={delivery._id} className="border-b hover:bg-gray-100 transition-colors duration-300">
              <td className="border p-3">
                {Array.isArray(delivery.deliveryItems) ? delivery.deliveryItems.map(item => item.name).join(', ') : 'No items'}
              </td>
              <td className="border p-3">{delivery.itemsPrice} LKR</td>
              <td className="border p-3">{delivery.deliveryPrice} LKR</td>
              <td className="border p-3">{delivery.totalPrice} LKR</td>
              <td className="border p-3">{delivery.status || 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
