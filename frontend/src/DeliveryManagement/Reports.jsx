import React, { useState, useEffect, useMemo } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Bar, Pie } from 'react-chartjs-2'; 
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Reports() {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/deliveries');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setDeliveries(data);
      setFilteredDeliveries(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalEarnings = useMemo(() => {
    return deliveries.reduce((acc, delivery) => acc + delivery.deliveryPrice, 0);
  }, [deliveries]);

  const calculateTotalDeliveries = useMemo(() => {
    return deliveries.length;
  }, [deliveries]);

  const calculateDeliveredItems = useMemo(() => {
    return deliveries.reduce((acc, delivery) => acc + delivery.itemsCount, 0);
  }, [deliveries]);

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
    
    // Optional: Add an image/logo (adjust the URL accordingly)
    const logoURL = 'https://via.placeholder.com/150';
    doc.addImage(logoURL, 'JPEG', 20, 10, 50, 30);
    
    doc.setFontSize(16);
    doc.text('Jayasinghe Storelines PVT LTD - Delivery Report', 70, 20);
    doc.setFontSize(12);
    doc.text('Company Email: info@jayasinghestorelines.com', 70, 30);
    doc.text('Company Address: 123, Colombo Road, Sri Lanka', 70, 37);
    doc.text('Phone: +94 11 1234567', 70, 44);
    doc.text(`Total Deliveries: ${calculateTotalDeliveries}`, 20, 60);
    doc.text(`Total Earnings: ${calculateTotalEarnings} LKR`, 20, 67);
    doc.text(`Total Delivered Items: ${calculateDeliveredItems}`, 20, 74);
    
    // Add a table
    doc.autoTable({
        head: [['Delivery Items', 'Items Price (LKR)', 'Delivery Price (LKR)', 'Total Price (LKR)', 'Status']],
        body: deliveries.map(delivery => [
            Array.isArray(delivery.deliveryItems) ? delivery.deliveryItems.map(item => item.name).join(', ') : 'No items',
            delivery.itemsPrice,
            delivery.deliveryPrice,
            delivery.totalPrice,
            delivery.status || 'Pending',
        ]),
        startY: 80, // Position of the table start
    });
    
    doc.save('DeliveryReport.pdf');
};


  const barData = {
    labels: ['Pending', 'Completed', 'Delayed'],
    datasets: [{
      label: 'Total Deliveries',
      data: [
        deliveries.filter((delivery) => delivery.status === 'Pending').length,
        deliveries.filter((delivery) => delivery.status === 'Completed').length,
        deliveries.filter((delivery) => delivery.status === 'Delayed').length,
      ],
      backgroundColor: ['#fbbf24', '#4ade80', '#f87171'],
      borderWidth: 1,
    }],
  };

  const pieData = {
    labels: ['Items Price', 'Delivery Price'],
    datasets: [{
      label: 'Earnings Breakdown',
      data: [
        deliveries.reduce((acc, delivery) => acc + delivery.itemsPrice, 0),
        deliveries.reduce((acc, delivery) => acc + delivery.deliveryPrice, 0),
      ],
      backgroundColor: ['#34d399', '#60a5fa'],
      hoverOffset: 4,
    }],
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
          <button
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            onClick={generatePDF}
          >
            Export to PDF
          </button>
        </div>
      </div>

      {loading && <p className="text-center">Loading deliveries...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2 text-gray-700">Report Summary</h2>
        <p>Total Deliveries: <strong>{calculateTotalDeliveries}</strong></p>
        <p>Total Earnings: <strong>{calculateTotalEarnings} LKR</strong></p>
        <p>Total Delivered Items: <strong>{calculateDeliveredItems}</strong></p>
      </div>

      <div className="my-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Total Deliveries per Status</h3>
        <Bar data={barData} className="w-full h-96 bg-white p-4 rounded-lg shadow-lg" />
      </div>

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
          {filteredDeliveries.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">No deliveries found.</td>
            </tr>
          ) : (
            filteredDeliveries.map((delivery, index) => (
              <tr key={index}>
                <td className="border p-3">{Array.isArray(delivery.deliveryItems) ? delivery.deliveryItems.map(item => item.name).join(', ') : 'No items'}</td>
                <td className="border p-3">{delivery.itemsPrice} LKR</td>
                <td className="border p-3">{delivery.deliveryPrice} LKR</td>
                <td className="border p-3">{delivery.totalPrice} LKR</td>
                <td className="border p-3">{delivery.status || 'Pending'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
