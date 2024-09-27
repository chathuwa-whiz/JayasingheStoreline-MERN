import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useAllProductsQuery } from '../redux/api/productApiSlice';

const PaymentReport = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  const [hrSendData, setHrSendData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [totalCostData, setTotalCostData] = useState([]);
  const [totalIncomeData, setTotalIncomeData] = useState([]);
  const [supplierSendData, setSupplierSendData] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // For tracking the editing item
  const [searchDate, setSearchDate] = useState(''); // For storing the search query

  useEffect(() => {
    if (!products) return;

    // Set real data for the report
    setHrSendData([
      { date: '2024-08-01', description: 'HR Expense A', amount: 1000 },
      { date: '2024-08-02', description: 'HR Expense B', amount: 1500 },
    ]);

    setSupplierSendData([
      { date: '2024-08-01', description: 'Supplier Payment A', amount: 2000 },
      { date: '2024-08-02', description: 'Supplier Payment B', amount: 2500 },
    ]);

    // Updated section with product `createdAt` dates
    const profit = products.map((product) => ({
      date: product.createdAt || 'N/A', // Use the actual product creation date if available
      description: product.name,
      amount: product.sellingPrice - product.buyingPrice,
    }));
    setProfitData(profit);

    const totalCost = products.map((product) => ({
      date: product.createdAt || 'N/A', // Use the actual product creation date if available
      description: product.name,
      amount: product.buyingPrice,
    }));
    setTotalCostData(totalCost);

    const totalIncome = products.map((product) => ({
      date: product.createdAt || 'N/A', // Use the actual product creation date if available
      description: product.name,
      amount: product.sellingPrice,
    }));
    setTotalIncomeData(totalIncome);
  }, [products]);

  const handleEdit = (section, index) => {
    setEditingItem({ section, index });
  };

  const handleDelete = (section, index) => {
    const newData = [...section];
    newData.splice(index, 1);
    section === hrSendData
      ? setHrSendData(newData)
      : section === profitData
      ? setProfitData(newData)
      : section === totalCostData
      ? setTotalCostData(newData)
      : section === totalIncomeData
      ? setTotalIncomeData(newData)
      : setSupplierSendData(newData);
  };

  const handleSave = (section, index, updatedItem) => {
    const newData = [...section];
    newData[index] = updatedItem;
    section === hrSendData
      ? setHrSendData(newData)
      : section === profitData
      ? setProfitData(newData)
      : section === totalCostData
      ? setTotalCostData(newData)
      : section === totalIncomeData
      ? setTotalIncomeData(newData)
      : setSupplierSendData(newData);
    setEditingItem(null);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
  
    doc.text('Payment Report', 14, 10);
  
    // Function to generate a table
    const generateTable = (title, data) => {
      if (data.length === 0) return;
  
      doc.text(title, 14, doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 20);
  
      doc.autoTable({
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 30,
        head: [['Date', 'Description', 'Amount']],
        body: data.map((item) => [item.date, item.description, `Rs.${item.amount}`]),
        theme: 'grid',
      });
    };
  
    // Filter data by selected date
    const filterByDate = (data) => {
      if (!searchDate) return data; // If no search query, show all data
      return data.filter((item) => item.date === searchDate); // Filter by date
    };
  
    // Generate tables for filtered data
    generateTable('HR Send Data', filterByDate(hrSendData));
    generateTable('Profit Data', filterByDate(profitData));
    generateTable('Total Cost Data', filterByDate(totalCostData));
    generateTable('Total Income Data', filterByDate(totalIncomeData));
    generateTable('Supplier Send Data', filterByDate(supplierSendData));
  
    doc.save('Payment_Report.pdf');
  };
  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  // Filter data based on search date
  const filterByDate = (data) => {
    if (!searchDate) return data; // If no search query, show all data
    return data.filter((item) => item.date === searchDate); // Filter by date
  };

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
            editingItem={editingItem}
            handleSave={handleSave}
          />
          <Section
            title="Profit Data"
            data={filterByDate(profitData)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            editingItem={editingItem}
            handleSave={handleSave}
          />
          <Section
            title="Total Cost Data"
            data={filterByDate(totalCostData)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            editingItem={editingItem}
            handleSave={handleSave}
          />
          <Section
            title="Total Income Data"
            data={filterByDate(totalIncomeData)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            editingItem={editingItem}
            handleSave={handleSave}
          />
          <Section
            title="Supplier Send Data"
            data={filterByDate(supplierSendData)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            editingItem={editingItem}
            handleSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, data, handleEdit, handleDelete, editingItem, handleSave }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{title}</h2>
    <table className="min-w-full bg-gray-200 border border-gray-300 rounded-md">
      <thead>
        <tr className="bg-gray-300 text-gray-700">
          <th className="py-3 px-4 border-b">Date</th>
          <th className="py-3 px-4 border-b">Description</th>
          <th className="py-3 px-4 border-b">Amount</th>
          <th className="py-3 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
              No data available for the selected date
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100 transition">
              {editingItem && editingItem.index === index ? (
                <>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={item.date}
                      onChange={(e) => handleSave(data, index, { ...item, date: e.target.value })}
                      className="border p-1"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleSave(data, index, { ...item, description: e.target.value })}
                      className="border p-1"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={item.amount}
                      onChange={(e) => handleSave(data, index, { ...item, amount: e.target.value })}
                      className="border p-1"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleSave(data, index, item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                    >
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border-b">{item.date}</td>
                  <td className="py-2 px-4 border-b">{item.description}</td>
                  <td className="py-2 px-4 border-b">Rs. {item.amount}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(data, index)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(data, index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default PaymentReport;
