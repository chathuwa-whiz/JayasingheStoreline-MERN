import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { ReportsHeader } from '../Shared/Header';
import { useAllProductsQuery } from '../redux/api/productApiSlice';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

export default function SalesReportPage() {
    const [itemNo, setItemNo] = useState([]);
    const [name, setName] = useState([]);
    const [manufacture, setManufacture] = useState([]);
    const [unitPrice, setUnitPrice] = useState([]);
    const [inventoryValue, setInventoryValue] = useState([]);
    const [reOrderLevel, setReOrderLevel] = useState([]);
    const [itemReorderQty, setItemReorderQty] = useState([]);
    let [createdDate, setCreatedDate] = useState([]);

    const { data: products, isLoading, isError } = useAllProductsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Something went wrong</div>;

    const year = new Date(); // get current year
    const productSales = {}; // Track sales for best-selling products

    // Object to store monthly aggregated inventory values
    const monthlyInventoryValues = {};

    for (const product of products) {
        itemNo.push(product.sku);
        name.push(product.name);
        manufacture.push(product.manufacturer);
        unitPrice.push(product.buyingPrice);
        inventoryValue.push(product.buyingPrice * product.countInStock);
        itemReorderQty.push(product.countInStock);

        const date = new Date(product.createdAt);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (year.getFullYear() === date.getFullYear()) { // Filter products from the current year
            if (!monthlyInventoryValues[monthYear]) {
                monthlyInventoryValues[monthYear] = 0;
            }
            monthlyInventoryValues[monthYear] += product.buyingPrice * product.countInStock;
        }

        // Track sales data for best-selling products
        if (productSales[product.name]) {
            productSales[product.name] += product.buyingPrice * product.currentQty;
        } else {
            productSales[product.name] = product.buyingPrice * product.currentQty;
        }
    }

    // Convert the aggregated inventory values object to arrays for the chart
    createdDate = Object.keys(monthlyInventoryValues);
    const monthlyInventoryValueData = Object.values(monthlyInventoryValues);

    // Sort productSales by sales amount
    const sortedSales = Object.entries(productSales).sort((a, b) => b[1] - a[1]);
    const topProducts = sortedSales.slice(0, 5); // Top 5 best-selling products

    // Extract labels and data for the pie chart
    const pieChartLabels = topProducts.map(([product]) => product);
    const pieChartDataValues = topProducts.map(([, sales]) => sales);

    // Line Chart Data
    const lineChartData = {
        labels: createdDate,
        datasets: [
            {
                label: 'Monthly Inventory Value',
                data: monthlyInventoryValueData,
                borderColor: '#1f77b4',
                backgroundColor: 'rgba(31, 119, 180, 0.2)',
            },
        ],
    };

    // Pie Chart Data (unchanged)
    const pieChartData = {
        labels: pieChartLabels,
        datasets: [
            {
                data: pieChartDataValues,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    // Export data to Excel (unchanged)
    const handleExportToExcel = () => {
        const salesData = lineChartData.labels.map((label, index) => ({
            Month: label,
            Total_Inventory: 'Rs. ' + lineChartData.datasets[0].data[index] + '.00',
        }));

        const productData = pieChartData.labels.map((label, index) => ({
            Product: label,
            Current_Inventory_Value: 'Rs. ' + pieChartData.datasets[0].data[index] + '.00',
        }));

        const wb = XLSX.utils.book_new();

        const wsSales = XLSX.utils.json_to_sheet(salesData);
        XLSX.utils.book_append_sheet(wb, wsSales, 'Inventory Report');

        const wsProducts = XLSX.utils.json_to_sheet(productData);
        XLSX.utils.book_append_sheet(wb, wsProducts, 'Best Selling Products');

        XLSX.writeFile(wb, 'Inventory_Report.xlsx');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex rounded-lg">
            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <ReportsHeader onExportToExcel={handleExportToExcel} />

                {/* Sales Line Chart */}
                <div className="bg-white p-6 rounded-lg shadow m-6">
                    <Line data={lineChartData} />
                </div>

                {/* Best Selling Products */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4">Best Selling Products</h3>
                        <ul className="space-y-2">
                            {topProducts.map(([product, sales], index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{product}</span>
                                    <span>{sales}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <Pie data={pieChartData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
