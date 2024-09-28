import React, { useState, useRef } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { ReportsHeader } from '../Shared/Header';
import { useAllProductsQuery } from '../redux/api/productApiSlice';
import logo from '../asset/logo.png';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

export default function SalesReportPage() {
    const [itemNo, setItemNo] = useState([]);
    const [name, setName] = useState([]);
    const [manufacture, setManufacture] = useState([]);
    const [unitPrice, setUnitPrice] = useState([]);
    const [inventoryValue, setInventoryValue] = useState([]);
    const [itemReorderQty, setItemReorderQty] = useState([]);
    let [createdDate, setCreatedDate] = useState([]);

    const { data: products, isLoading, isError } = useAllProductsQuery();

    // Refs for charts
    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Something went wrong</div>;

    const year = new Date(); // current year
    const productSales = {}; // Track sales for best-selling products
    const monthlyInventoryValues = {};

    // Format Prices
    const priceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LKR',
    });

    products.forEach(product => {
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
    });

    // Prepare data for charts
    createdDate = Object.keys(monthlyInventoryValues);
    const monthlyInventoryValueData = Object.values(monthlyInventoryValues);

    const sortedSales = Object.entries(productSales).sort((a, b) => b[1] - a[1]);
    const topProducts = sortedSales.slice(0, 5); // Top 5 best-selling products

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

    // Bar Chart Data
    const barChartData = {
        labels: createdDate,
        datasets: [
            {
                label: 'Monthly Inventory Value',
                data: monthlyInventoryValueData,
                backgroundColor: '#ff7f0e',
            },
        ],
    };

    // Pie Chart Data
    const pieChartData = {
        labels: pieChartLabels,
        datasets: [
            {
                data: pieChartDataValues,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    // Export data to PDF
    const handleExportToPDF = async () => {
        const doc = new jsPDF('p', 'mm', 'a4');

        // Add store logo and name to header
        const img = new Image();
        img.src = logo;
        await new Promise(resolve => {
            img.onload = resolve;
        });
        doc.addImage(img, 'PNG', 14, 10, 30, 30); // Adjust size and position as needed
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text('Jayasinghe Storeline', 50, 20);
        doc.setFontSize(12);
        doc.text('Inventory and Sales Report', 50, 30);
    
        // Add Line Chart
        if (lineChartRef.current) {
            const lineChartCanvas = lineChartRef.current.canvas;
            const lineChartImg = lineChartCanvas.toDataURL('image/png', 1.0);
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text('Monthly Inventory Value (Line Chart)', 14, 55);
            doc.addImage(lineChartImg, 'PNG', 14, 60, 90, 60); // Adjust size and position to fit on page
        }
    
        // Add Bar Chart
        if (barChartRef.current) {
            const barChartCanvas = barChartRef.current.canvas;
            const barChartImg = barChartCanvas.toDataURL('image/png', 1.0);
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text('Monthly Inventory Value (Bar Chart)', 105, 55);
            doc.addImage(barChartImg, 'PNG', 105, 60, 90, 60); // Adjust size and position next to Line Chart
        }
    
        // Add Pie Chart
        if (pieChartRef.current) {
            const pieChartCanvas = pieChartRef.current.canvas;
            const pieChartImg = pieChartCanvas.toDataURL('image/png', 1.0);
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text('Top 5 Best-Selling Products', 14, 150);
            doc.addImage(pieChartImg, 'PNG', 60, 155, 100, 100); // Centered Pie Chart below Line/Bar Charts
        }
    
        // Add a new page for the tables
        doc.addPage();
    
        // Add Monthly Inventory Values Table
        let finalY = 20; // Reset starting Y position for the new page
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text('Monthly Inventory Values', 14, finalY);
        finalY += 5;
    
        doc.autoTable({
            head: [['Month', 'Total Inventory Value']],
            body: lineChartData.labels.map((label, index) => [
                label,
                priceFormatter.format(lineChartData.datasets[0].data[index]),
            ]),
            startY: finalY,
            theme: 'striped',
            headStyles: { fillColor: [63, 81, 181] }, // Indigo header
            alternateRowStyles: { fillColor: [240, 240, 240] }, // Light grey for alternate rows
            styles: { fontSize: 10 },
        });
    
        // Update finalY after the table
        finalY = doc.lastAutoTable.finalY + 20;
    
        // Add Top 5 Best-Selling Products Table
        doc.setFontSize(16);
        doc.text('Top 5 Best-Selling Products', 14, finalY);
        finalY += 5;
    
        doc.autoTable({
            head: [['Product', 'Sales Value']],
            body: pieChartData.labels.map((label, index) => [
                label,
                priceFormatter.format(pieChartData.datasets[0].data[index]),
            ]),
            startY: finalY,
            theme: 'striped',
            headStyles: { fillColor: [255, 99, 132] }, // Red header
            alternateRowStyles: { fillColor: [255, 255, 204] }, // Light yellow for alternate rows
            styles: { fontSize: 10 },
        });
    
        // Save the PDF
        doc.save('Inventory_Sales_Report.pdf');
    };
    

    return (
        <div className="min-h-screen bg-gray-100 flex rounded-lg">
            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <ReportsHeader onExportToPDF={handleExportToPDF} />

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-6">
                    {/* Line Chart */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4">Monthly Inventory Value (Line Chart)</h3>
                        <Line ref={lineChartRef} data={lineChartData} />
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4">Monthly Inventory Value (Bar Chart)</h3>
                        <Bar ref={barChartRef} data={barChartData} />
                    </div>
                </div>

                {/* Best Selling Products Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4">Best Selling Products</h3>
                        <ul className="space-y-2">
                            {topProducts.map(([product, sales], index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{product}</span>
                                    <span>{priceFormatter.format(sales)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4">Top 5 Best-Selling Products (Pie Chart)</h3>
                        <Pie ref={pieChartRef} data={pieChartData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
