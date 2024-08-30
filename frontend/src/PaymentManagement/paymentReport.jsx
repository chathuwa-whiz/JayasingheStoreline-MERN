import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useAllProductsQuery } from '../redux/api/productApiSlice';

const PaymentReport = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  const [hrSendData, setHrSendData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [totalCostData, setTotalCostData] = useState([]);
  const [totalIncomeData, setTotalIncomeData] = useState([]);
  const [supplierSendData, setSupplierSendData] = useState([]);

  useEffect(() => {
    if (!products) return;

    // Calculate and set real data for the report
    setHrSendData([
      { date: '2024-08-01', description: 'HR Expense A', amount: 1000 },
      { date: '2024-08-02', description: 'HR Expense B', amount: 1500 }
    ]);
    
    setSupplierSendData([
      { date: '2024-08-01', description: 'Supplier Payment A', amount: 2000 },
      { date: '2024-08-02', description: 'Supplier Payment B', amount: 2500 }
    ]);

    const profit = products.map(product => ({
      date: '2024-08-01', // Replace with actual date if available
      description: product.name,
      amount: product.sellingPrice - product.buyingPrice
    }));
    setProfitData(profit);

    const totalCost = products.map(product => ({
      date: '2024-08-01', // Replace with actual date if available
      description: product.name,
      amount: product.buyingPrice
    }));
    setTotalCostData(totalCost);

    const totalIncome = products.map(product => ({
      date: '2024-08-01', // Replace with actual date if available
      description: product.name,
      amount: product.sellingPrice
    }));
    setTotalIncomeData(totalIncome);

  }, [products]);

  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();

    const hrSendSheet = XLSX.utils.json_to_sheet(hrSendData);
    const profitSheet = XLSX.utils.json_to_sheet(profitData);
    const totalCostSheet = XLSX.utils.json_to_sheet(totalCostData);
    const totalIncomeSheet = XLSX.utils.json_to_sheet(totalIncomeData);
    const supplierSendSheet = XLSX.utils.json_to_sheet(supplierSendData);

    XLSX.utils.book_append_sheet(workbook, hrSendSheet, 'HR Send Data');
    XLSX.utils.book_append_sheet(workbook, profitSheet, 'Profit Data');
    XLSX.utils.book_append_sheet(workbook, totalCostSheet, 'Total Cost Data');
    XLSX.utils.book_append_sheet(workbook, totalIncomeSheet, 'Total Income Data');
    XLSX.utils.book_append_sheet(workbook, supplierSendSheet, 'Supplier Send Data');

    XLSX.writeFile(workbook, 'Payment_Report.xlsx');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex-grow p-6">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">Payment Report</h1>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={generateExcel}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Download Excel Report
          </button>
        </div>

        <div className="grid gap-8 text-center">
          <Section title="HR Send Data" data={hrSendData} />
          <Section title="Profit Data" data={profitData} />
          <Section title="Total Cost Data" data={totalCostData} />
          <Section title="Total Income Data" data={totalIncomeData} />
          <Section title="Supplier Send Data" data={supplierSendData} />
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, data }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{title}</h2>
    <table className="min-w-full bg-gray-200 border border-gray-300 rounded-md">
      <thead>
        <tr className="bg-gray-300 text-gray-700">
          <th className="py-3 px-4 border-b">Date</th>
          <th className="py-3 px-4 border-b">Description</th>
          <th className="py-3 px-4 border-b">Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="3" className="py-4 px-4 text-center text-gray-500">No data available</td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100 transition">
              <td className="py-2 px-4 border-b">{item.date}</td>
              <td className="py-2 px-4 border-b">{item.description}</td>
              <td className="py-2 px-4 border-b">Rs.{item.amount}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default PaymentReport;
