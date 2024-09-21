import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useAllProductsQuery } from '../redux/api/productApiSlice'; // Query to fetch products

export default function SupplierReport() {
  // Fetch product data, which connects to the inventory management system
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data...</div>;

  // Example supplier and product data combination (customize based on your data model)
  const suppliers = [
    { name: 'Dell Inspiron 15 Laptop', productCount: 50, status: 'active' },
    { name: 'Canon EOS 1500D DSLR Camera', productCount: 30, status: 'inactive' },
    { name: 'Huawei Band 6', productCount: 70, status: 'active' },
    { name: 'Panasonic 1.5 Ton Split AC', productCount: 50, status: 'active' },
    { name: 'Apple iPad (9th Gen)', productCount: 40, status: 'active' },
    { name: 'JBL Flip 5 Bluetooth Speaker', productCount: 80, status: 'inactive' },
    { name: 'Modern Sofa Set', productCount: 20, status: 'active' },
    { name: 'Teak Wood Dining Table', productCount: 20, status: 'inactive' },
    { name: 'Ergonomic Office Chair', productCount: 50, status: 'active' },
    { name: 'King Size Bed Frame', productCount: 30, status: 'active' },
    { name: 'Glass Coffee Table', productCount: 10, status: 'inactive' },
    { name: 'Wooden Bookshelf', productCount: 40, status: 'active' },
  ];

  const barData = {
    labels: suppliers.map(supplier => supplier.name),
    datasets: [
      {
        label: 'Products Supplied',
        backgroundColor: '#4CAF50',
        data: suppliers.map(supplier => supplier.productCount),
      },
    ],
  };

  const pieData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Supplier Status',
        data: [
          suppliers.filter(supplier => supplier.status === 'active').length,
          suppliers.filter(supplier => supplier.status === 'inactive').length,
        ],
        backgroundColor: ['#00BFFF', '#FF6347'],
      },
    ],
  };

  // Export report to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Supplier Report', 14, 22);

    // Add Bar Chart
    doc.setFontSize(16);
    doc.text('Products Supplied by Each Supplier', 14, 40);
    const barChart = document.querySelector('.bar-chart canvas');
    if (barChart) {
      doc.addImage(barChart.toDataURL(), 'PNG', 14, 50, 180, 100);
    }

    // Add Pie Chart
    doc.setFontSize(16);
    doc.text('Supplier Status', 14, 160);
    const pieChart = document.querySelector('.pie-chart canvas');
    if (pieChart) {
      doc.addImage(pieChart.toDataURL(), 'PNG', 14, 170, 100, 100); // Adjusted size
    }

    // Add Table of Supplier Details
    doc.setFontSize(16);
    doc.text('Supplier Details:', 14, 280);
    const supplierDetails = suppliers.map(supplier => [
      supplier.name,
      supplier.productCount,
      supplier.status,
    ]);
    const headers = [['Supplier Name', 'Product Count', 'Status']];

    doc.autoTable({
      head: headers,
      body: supplierDetails,
      startY: 290,
      theme: 'striped',
    });

    doc.save('supplier_report.pdf');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex">
      {/* Sidebar for Product List */}
      <div className="w-1/4 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product List</h2>
        <ul className="space-y-2">
          {suppliers.map((supplier, index) => (
            <li key={index} className="flex justify-between">
              <span className="font-medium">{supplier.name}</span>
              <span className="text-gray-500">({supplier.productCount})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content area for report */}
      <div className="w-3/4 ml-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Supplier Report</h1>

        <div className="flex justify-center mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Products Supplied by Each Supplier</h2>
            <div className="bar-chart">
              <Bar data={barData} />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="w-full bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Supplier Status</h2>
            <div className="pie-chart">
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} height={400} width={400} /> {/* Adjusted size */}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={exportToPDF}
            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-300"
          >
            Export to PDF
          </button>
        </div>
      </div>
    </div>
  );
}
