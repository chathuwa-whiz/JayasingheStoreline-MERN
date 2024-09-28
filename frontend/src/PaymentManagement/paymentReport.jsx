import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useAllProductsQuery } from '../redux/api/productApiSlice';
import logo from '../asset/logo.png';

// Unique ID generator
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const PaymentReport = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  const [hrSendData, setHrSendData] = useState([
    { id: generateId(), date: '2024-09-21', description: 'HR Notification 1', amount: 5000 },
    { id: generateId(), date: '2024-09-22', description: 'HR Notification 2', amount: 3000 },
  ]);
  const [profitData, setProfitData] = useState([]);
  const [totalCostData, setTotalCostData] = useState([]);
  const [totalIncomeData, setTotalIncomeData] = useState([]);
  const [supplierSendData, setSupplierSendData] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // Keep track of the item being edited
  const [searchDate, setSearchDate] = useState(''); // For date filtering

  useEffect(() => {
    if (!products) return;

    const profit = products.map((product) => ({
      id: generateId(),
      date: product.createdAt || 'N/A',
      description: product.name,
      amount: product.sellingPrice - product.buyingPrice,
    }));
    setProfitData(profit);

    const totalCost = products.map((product) => ({
      id: generateId(),
      date: product.createdAt || 'N/A',
      description: product.name,
      amount: product.buyingPrice,
    }));
    setTotalCostData(totalCost);

    const totalIncome = products.map((product) => ({
      id: generateId(),
      date: product.createdAt || 'N/A',
      description: product.name,
      amount: product.sellingPrice,
    }));
    setTotalIncomeData(totalIncome);
  }, [products]);

  // Edit an item in the table
  const handleEdit = (section, id) => {
    const item = section.find((item) => item.id === id);
    setEditingItem(item); // Set the item being edited
  };

  // Save the edited item
  const handleSave = (section, id, updatedItem) => {
    const newData = section.map((item) => (item.id === id ? updatedItem : item));
    if (section === hrSendData) setHrSendData(newData);
    else if (section === profitData) setProfitData(newData);
    else if (section === totalCostData) setTotalCostData(newData);
    else if (section === totalIncomeData) setTotalIncomeData(newData);
    else if (section === supplierSendData) setSupplierSendData(newData);

    setEditingItem(null); // Clear the editing state
  };

  // Delete an item from the table
  const handleDelete = (section, id) => {
    const newData = section.filter((item) => item.id !== id);
    if (section === hrSendData) setHrSendData(newData);
    else if (section === profitData) setProfitData(newData);
    else if (section === totalCostData) setTotalCostData(newData);
    else if (section === totalIncomeData) setTotalIncomeData(newData);
    else if (section === supplierSendData) setSupplierSendData(newData);
  };

  // Handle input change when editing an item
  const handleInputChange = (section, id, field, value) => {
    const newData = section.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    if (section === hrSendData) setHrSendData(newData);
    else if (section === profitData) setProfitData(newData);
    else if (section === totalCostData) setTotalCostData(newData);
    else if (section === totalIncomeData) setTotalIncomeData(newData);
    else if (section === supplierSendData) setSupplierSendData(newData);
  };

  // Filter data by date
  const filterByDate = (data) => {
    if (!searchDate) return data;
    return data.filter((item) => new Date(item.date).toISOString().split('T')[0] === searchDate);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Calculate center for the logo
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 50;  // Your logo width
    const logoX = (pageWidth - logoWidth) / 2;
  
    // Add the centered logo
    doc.addImage(logo, 'JPEG', logoX, 10, 50, 50);
  
    // Text for report title
    doc.text('Payment Report', 14, 65);
  
    const filteredHrSendData = filterByDate(hrSendData);
    const filteredProfitData = filterByDate(profitData);
    const filteredTotalCostData = filterByDate(totalCostData);
    const filteredTotalIncomeData = filterByDate(totalIncomeData);
    const filteredSupplierSendData = filterByDate(supplierSendData);
    // Base64 image data for your company logo (replace with your actual Base64 image data)
    const logoBase64 = logo;
  
    // Add the logo image at the top of the PDF
    doc.addImage(logoBase64, 'JPEG', 10, 10, 40, 40); // Adjust the position (x, y) and size (width, height) as needed
  
    // Set the position for the report title after the logo
    doc.text('Payment Report', 14, 60); // Set y position to be after the logo
  
    const generateTable = (title, data) => {
      if (data.length === 0) return;
      doc.text(title, 14, doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 50);
      doc.autoTable({
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 60,
        head: [['Date', 'Description', 'Amount']],
        body: data.map((item) => [item.date, item.description, `Rs.${item.amount}`]),
        theme: 'grid',
      });
    };
  
    generateTable('HR Send Data', filteredHrSendData);
    generateTable('Profit Data', filteredProfitData);
    generateTable('Total Cost Data', filteredTotalCostData);
    generateTable('Total Income Data', filteredTotalIncomeData);
    generateTable('Supplier Send Data', filteredSupplierSendData);
  
    doc.save(`Payment_Report_${searchDate || 'All'}.pdf`);
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex-grow p-6">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">Payment Report</h1>

        <div className="flex justify-center space-x-4 mb-6">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Search by Date"
          />
          <button
            onClick={generatePDF}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Download PDF Report
          </button>
        </div>

        <div className="grid gap-8 text-center">
          <Section
            title="HR Send Data"
            data={filterByDate(hrSendData)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleSave={handleSave}
            editingItem={editingItem}
            handleInputChange={handleInputChange}
          />
          <Section
            title="Profit Data"
            data={filterByDate(profitData)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleSave={handleSave}
            editingItem={editingItem}
            handleInputChange={handleInputChange}
          />
          <Section
            title="Total Cost Data"
            data={filterByDate(totalCostData)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleSave={handleSave}
            editingItem={editingItem}
            handleInputChange={handleInputChange}
          />
          <Section
            title="Total Income Data"
            data={filterByDate(totalIncomeData)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleSave={handleSave}
            editingItem={editingItem}
            handleInputChange={handleInputChange}
          />
          <Section
            title="Supplier Send Data"
            data={filterByDate(supplierSendData)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleSave={handleSave}
            editingItem={editingItem}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, data, handleEdit, handleDelete, handleSave, editingItem, handleInputChange }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <table className="w-full table-auto border-collapse rounded-lg text-gray-700">
      <thead>
        <tr className="bg-gray-300">
          <th className="py-2 px-4">Date</th>
          <th className="py-2 px-4">Description</th>
          <th className="py-2 px-4">Amount</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="bg-white border-b">
            {editingItem && editingItem.id === item.id ? (
              <>
                <td className="py-2 px-4">
                  <input
                    type="date"
                    value={editingItem.date}
                    onChange={(e) => handleInputChange(data, item.id, 'date', e.target.value)}
                    className="border border-gray-300 p-1 rounded"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={editingItem.description}
                    onChange={(e) => handleInputChange(data, item.id, 'description', e.target.value)}
                    className="border border-gray-300 p-1 rounded"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    value={editingItem.amount}
                    onChange={(e) => handleInputChange(data, item.id, 'amount', e.target.value)}
                    className="border border-gray-300 p-1 rounded"
                  />
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleSave(data, item.id, editingItem)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                </td>
              </>
            ) : (
              <>
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4">Rs. {item.amount}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(data, item.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(data, item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PaymentReport;
