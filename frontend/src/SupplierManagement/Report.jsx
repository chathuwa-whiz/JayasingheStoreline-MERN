import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useAllProductsQuery } from '../redux/api/productApiSlice'; // Query to fetch products
import { useGetSuppliersQuery } from '../redux/api/supplierApiSlice'; // Query to fetch suppliers

export default function SupplierReport() {
  // Fetch product and supplier data
  const { data: products, isLoading: productsLoading, isError: productsError } = useAllProductsQuery();
  const { data: suppliers, isLoading: suppliersLoading, isError: suppliersError } = useGetSuppliersQuery({});
  
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  if (productsLoading || suppliersLoading) return <div>Loading...</div>;
  if (productsError || suppliersError) return <div>Error loading data...</div>;

  const lowStockProducts = products.filter((product) => product.currentQty <= 5);

  console.log('Low Stock Products:', lowStockProducts);

  // Handle checkbox selection for products
  const handleProductSelect = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId) // Unselect
        : [...prevSelected, productId] // Select
    );
  };

  // Handle dropdown supplier selection
  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.text('Product Order Report', 14, 16);
    doc.text(`Supplier: ${suppliers.find(supplier => supplier._id === selectedSupplier)?.name || 'N/A'}`, 14, 24);

    const tableData = lowStockProducts
      .filter((product) => selectedProducts.includes(product._id))
      .map((product) => [
        product.name,
        product.reOrderQty,
      ]);
  
    doc.autoTable({
      head: [['Product Name', 'Order Qty']],
      body: tableData,
    });

    doc.save('order-inquiry.pdf');
  };

  // Bar and Pie chart data
  const productCategories = [...new Set(lowStockProducts.map(product => product.category))];
  const productCountPerCategory = productCategories.map(
    (category) => lowStockProducts.filter((product) => product.category === category).length
  );

  const barChartData = {
    labels: productCategories,
    datasets: [
      {
        label: 'Low Stock Products by Category',
        data: productCountPerCategory,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const pieChartData = {
    labels: productCategories,
    datasets: [
      {
        data: productCountPerCategory,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Supplier Report</h1>

      {/* Supplier Selection */}
      <div className="max-w-md mx-auto">
        <label className="block text-sm font-medium mb-2">Select Supplier:</label>
        <select
          value={selectedSupplier}
          onChange={handleSupplierChange}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="" disabled>Select a supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
      </div>

      {/* Low Stock Products Table */}
      <div className="max-w-4xl mx-auto overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Select</th>
              <th className="p-4 text-left">Product Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Current Qty</th>
              <th className="p-4 text-left">Buying Price</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleProductSelect(product._id)}
                  />
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.currentQty}</td>
                <td className="p-4">{product.buyingPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Bar Chart */}
        <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Low Stock Products by Category</h2>
          <Bar data={barChartData} />
        </div>

        {/* Pie Chart */}
        <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
          <Pie data={pieChartData} />
        </div>
      </div>

      {/* Generate PDF Button */}
      <div className="text-center">
        <button
          onClick={generatePDF}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
          disabled={!selectedSupplier || selectedProducts.length === 0}
        >
          Generate PDF Report
        </button>
      </div>
    </div>
  );
}
