import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const PaymentReport = () => {
  // State to hold different data sets
  const [hrsendData, setHrSendData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [totalCostData, setTotalCostData] = useState([]);
  const [totalIncomeData, setTotalIncomeData] = useState([]);

  // Function to generate dummy data (for demonstration purposes)
  const generateDummyData = () => {
    setHrSendData([
      { date: '2024-08-01', amount: 1000 },
      { date: '2024-08-02', amount: 1500 }
    ]);
    setProfitData([
      { date: '2024-08-01', amount: 300 },
      { date: '2024-08-02', amount: 400 }
    ]);
    setTotalCostData([
      { date: '2024-08-01', amount: 700 },
      { date: '2024-08-02', amount: 1200 }
    ]);
    setTotalIncomeData([
      { date: '2024-08-01', amount: 1000 },
      { date: '2024-08-02', amount: 1500 }
    ]);
  };

  // Function to generate and download Excel report
  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Convert each data set to a worksheet
    const hrSendSheet = XLSX.utils.json_to_sheet(hrsendData);
    const profitSheet = XLSX.utils.json_to_sheet(profitData);
    const totalCostSheet = XLSX.utils.json_to_sheet(totalCostData);
    const totalIncomeSheet = XLSX.utils.json_to_sheet(totalIncomeData);

    // Append worksheets to the workbook
    XLSX.utils.book_append_sheet(workbook, hrSendSheet, 'HR Send Data');
    XLSX.utils.book_append_sheet(workbook, profitSheet, 'Profit Data');
    XLSX.utils.book_append_sheet(workbook, totalCostSheet, 'Total Cost Data');
    XLSX.utils.book_append_sheet(workbook, totalIncomeSheet, 'Total Income Data');

    // Write the workbook to a file and trigger download
    XLSX.writeFile(workbook, 'Payment_Report.xlsx');
  };

  // Fetch real data (uncomment and replace with your API endpoint when ready)
  /*
  useEffect(() => {
    fetch('/api/payment-report-data')
      .then(response => response.json())
      .then(data => {
        // Assuming the data structure is as follows:
        // { hrSend: [], profit: [], totalCost: [], totalIncome: [] }
        setHrSendData(data.hrSend || []);
        setProfitData(data.profit || []);
        setTotalCostData(data.totalCost || []);
        setTotalIncomeData(data.totalIncome || []);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  */

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Main Content */}
      <div className="flex-grow p-6">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Payment Report</h1>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={generateDummyData}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Generate Report
          </button>
          <button
            onClick={generateExcel}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Download Excel Report
          </button>
        </div>

        <div className="space-y-8 text-center">
          <Section title="HR Send Data" data={hrsendData} />
          <Section title="Profit Data" data={profitData} />
          <Section title="Total Cost Data" data={totalCostData} />
          <Section title="Total Income Data" data={totalIncomeData} />
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component for data display
const Section = ({ title, data }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{title}</h2>
    <table className="min-w-full bg-gray-200 border border-gray-300 rounded-md">
      <thead>
        <tr className="bg-gray-300 text-gray-700">
          <th className="py-3 px-4 border-b">Date</th>
          <th className="py-3 px-4 border-b">Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="2" className="py-4 px-4 text-center text-gray-500">No data available</td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{item.date}</td>
              <td className="py-2 px-4 border-b">{item.amount}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default PaymentReport;
