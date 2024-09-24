import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { OrderReportsHeader } from '../Shared/Header';
import { useGetOrdersQuery } from '../redux/api/orderApiSlice';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

export default function OrderReportPage() {
    const [orderDates, setOrderDates] = useState([]);
    const [monthlySales, setMonthlySales] = useState([]);
    const [orderStatusDistribution, setOrderStatusDistribution] = useState([]);

    const { data: orders, isLoading, isError } = useGetOrdersQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Something went wrong</div>;

    const year = new Date(); // Get the current year

    // Object to store monthly sales data
    const monthlySalesData = {};

    // Object to store order status counts
    const orderStatusCounts = {
        completed: 0,
        pending: 0,
        canceled: 0,
    };

    // Format Prices
    const priceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LKR',
    });

    // Loop through the orders to aggregate data
    for (const order of orders) {
        const date = new Date(order.createdAt);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        // Filter orders from the current year
        if (year.getFullYear() === date.getFullYear()) {
            if (!monthlySalesData[monthYear]) {
                monthlySalesData[monthYear] = 0;
            }
            monthlySalesData[monthYear] += order.totalPrice;
        }

        // Track order status counts
        if (order.status === 'Completed') {
            orderStatusCounts.completed++;
        } else if (order.status === 'Pending') {
            orderStatusCounts.pending++;
        } else if (order.status === 'Canceled') {
            orderStatusCounts.canceled++;
        }
    }

    // Convert the aggregated sales data object to arrays for the chart
    const orderMonths = Object.keys(monthlySalesData);
    const monthlyOrderValues = Object.values(monthlySalesData);

    // Prepare data for pie chart (order status distribution)
    const pieChartLabels = ['Completed', 'Pending', 'Canceled'];
    const pieChartDataValues = [
        orderStatusCounts.completed,
        orderStatusCounts.pending,
        orderStatusCounts.canceled,
    ];

    // Line Chart Data (Monthly Sales)
    const lineChartData = {
        labels: orderMonths,
        datasets: [
            {
                label: 'Monthly Sales (LKR)',
                data: monthlyOrderValues,
                borderColor: '#1f77b4',
                backgroundColor: 'rgba(31, 119, 180, 0.2)',
            },
        ],
    };

    // Pie Chart Data (Order Status Distribution)
    const pieChartData = {
        labels: pieChartLabels,
        datasets: [
            {
                data: pieChartDataValues,
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
            },
        ],
    };

    // Export data to Excel (unchanged)
    const handleExportToExcel = () => {
        const salesData = lineChartData.labels.map((label, index) => ({
            Month: label,
            Total_Sales: 'Rs. ' + lineChartData.datasets[0].data[index] + '.00',
        }));

        const orderData = pieChartData.labels.map((label, index) => ({
            Status: label,
            Count: pieChartData.datasets[0].data[index],
        }));

        const wb = XLSX.utils.book_new();

        const wsSales = XLSX.utils.json_to_sheet(salesData);
        XLSX.utils.book_append_sheet(wb, wsSales, 'Sales Report');

        const wsOrders = XLSX.utils.json_to_sheet(orderData);
        XLSX.utils.book_append_sheet(wb, wsOrders, 'Order Status Report');

        XLSX.writeFile(wb, 'Order_Report.xlsx');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            {/* Header
            <OrderReportsHeader onExportToExcel={handleExportToExcel} /> */}

            {/* Charts Section */}
            <div className="w-full max-w-7xl flex flex-col">
                <div className="flex flex-wrap md:flex-nowrap w-full">
                    {/* Sales Line Chart (2/3 width) */}
                    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
                        <h3 className="text-xl font-bold mb-4">Monthly Sales (LKR)</h3>
                        <Line data={lineChartData} />
                    </div>

                    {/* Order Status Pie Chart (1/3 width) */}
                    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 md:ml-6">
                        <h3 className="text-xl font-bold mb-4">Order Status Distribution</h3>
                        <Pie data={pieChartData} />
                    </div>
                </div>
            </div>

            {/* Export to Excel Button */}
            <div className="mt-6 w-full max-w-7xl flex justify-end">
                <button
                    onClick={handleExportToExcel}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                >
                    Generate Excel Report
                </button>
            </div>
        </div>
    );
}
