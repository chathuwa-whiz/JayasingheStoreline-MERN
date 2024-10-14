import React, { useRef, useEffect, useState } from 'react';
import { useAllProductsQuery } from '../redux/api/productApiSlice';
import { Line, Pie } from 'react-chartjs-2';
import logo from '../asset/logo.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

export default function Dashboard() {
  // Fetch all products
  const { data: products, isLoading: productsLoading, isError: productsError } = useAllProductsQuery();

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
  });

  const [isChartsReady, setIsChartsReady] = useState(false);
  const orderTrendsRef = useRef(null);
  const ordersByCategoryRef = useRef(null);

  useEffect(() => {
    if (products) {
      setIsChartsReady(true); // Set the charts as ready once products are loaded
    }
  }, [products]);

  if (productsLoading) return <div>Loading...</div>;
  if (productsError) return <div>Something went wrong</div>;

  // Data calculations
  const categoryList = [];
  let stockValue = 0;
  let lowStock = 0;

  for (const product of products) {
    categoryList.push(product.category);
    stockValue += product.buyingPrice * product.currentQty;
    if (product.currentQty < 5) {
      lowStock++;
    }
  }
  const categories = [...new Set(categoryList)];

  // Best-Selling Products based on highest total orders
  const sortedProducts = [...products].sort((a, b) => (b.totalOrders || 0) - (a.totalOrders || 0));
  const highestOrderProducts = sortedProducts.slice(0, 5); // Top 5 products with highest orders

  // Data for Order Trends Line Chart
  const orderTrendData = {
    labels: products.map(product => product.name),
    datasets: [{
      label: 'Total Orders',
      data: products.map(product => product.totalOrders || 0),
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light green background
      borderColor: 'rgba(75, 192, 192, 1)', // Green line
      tension: 0.4,
    }]
  };

  // Data for Orders by Category Pie Chart
  const ordersByCategoryData = {
    labels: categories,
    datasets: [{
      data: categories.map(category => 
        products
          .filter(product => product.category === category)
          .reduce((totalOrders, product) => totalOrders + (product.totalOrders || 0), 0)
      ),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      hoverBackgroundColor: ['#FF7384', '#46A2EB', '#FFDE56', '#5BC0C0', '#A966FF', '#FFAF40'],
    }]
  };

  // Function to download the order report as a PDF
  const downloadOrderReport = async () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Store contact details
    const storeEmail = 'jayasinghestorelines@gmail.com';  // Example email
    const storePhone = '+94 332264486';          // Example phone number

    // Add store logo and name to header
    const img = new Image();
    img.src = logo;
    img.onload = async () => {
      // Add logo
      doc.addImage(img, 'PNG', 14, 10, 30, 30); // Adjust size and position as needed
      
      // Add store name, email, and phone
      doc.setFontSize(18);
      doc.text('JAYASINGHE STORELINES', 60, 30);
      doc.setFontSize(12);
      doc.text(`Email: ${storeEmail}`, 60, 40);
      doc.text(`Phone: ${storePhone}`, 60, 45);
      
      // Add report title
      doc.setFontSize(16);
      doc.text('Order Report', 10, 60);

      // Add table with product details and header "Product Orders Overview"
      doc.text('Product Orders Overview', 10, 70);
      doc.autoTable({
        startY: 80,  // Adjust to place under the header
        head: [['Product Name', 'Order Quantity', 'Selling Price', 'Buying Price', 'Total Revenue']],
        body: products.map(product => [
          product.name,
          product.totalOrders,
          priceFormatter.format(product.sellingPrice),
          priceFormatter.format(product.buyingPrice),
          priceFormatter.format(product.sellingPrice * product.currentQty)
        ]),
      });

      // Wait for the charts to be fully rendered
      if (isChartsReady) {
        // Add a new page for Order Trends and Orders by Category
        doc.addPage();
        doc.text('Order Trends and Orders by Category', 10, 10);

        // Keep Order Trends Line Chart in place
        try {
          const orderTrendsCanvas = await html2canvas(orderTrendsRef.current, {
            scale: 2, // Increase scale for higher resolution
            useCORS: true,
          });
          const orderTrendsImgData = orderTrendsCanvas.toDataURL('image/png');
          // Maintain the position and size of the line chart
          doc.addImage(orderTrendsImgData, 'PNG', 10, 20, 190, 80); 
        } catch (error) {
          console.error('Error capturing Order Trends chart:', error);
        }

        // Render Orders by Category Pie Chart below Order Trends
        try {
          const ordersByCategoryCanvas = await html2canvas(ordersByCategoryRef.current, {
            scale: 2, // Higher resolution for better quality
            width: 720, // Width in pixels
            height: 480, // Height in pixels to maintain aspect ratio
            useCORS: true,
          });
          const ordersByCategoryImgData = ordersByCategoryCanvas.toDataURL('image/png');
          // Adjust position to keep it below the trends chart without moving the line chart
          doc.addImage(ordersByCategoryImgData, 'PNG', 70, 110, 190, 120);
        } catch (error) {
          console.error('Error capturing Orders by Category chart:', error);
        }

        // Add Best-Selling Products Table below the charts on the same page
        doc.text('Best Selling Products', 10, 200);
        doc.autoTable({
          startY: 210, // Start after the pie chart
          head: [['Product Name', 'Category', 'Total Orders']],
          body: highestOrderProducts.map(product => [
            product.name,
            product.category,
            product.totalOrders
          ]),
        });

        // Add Report Generation Date below the Best Selling Products table
        const finalY = doc.lastAutoTable.finalY || 230; // Get the final Y position of the table
        doc.text(`Report Generated on: ${currentDate}`, 10, finalY + 10); // Place date below the table

        // Save the PDF
        doc.save('order_report.pdf');
      }
    };
  };

  
  return (
    <div className="overflow-auto bg-gray-100 p-6 rounded-lg">
      {/* Button to download the order report */}
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadOrderReport}
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
        >
          Download Order Report
        </button>
      </div>

      {/* Order Trends Line Chart and Orders by Category Pie Chart */}
      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3 order-trends-chart" ref={orderTrendsRef}>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Order Trends</h3>
          <div className="relative h-64 w-full">
            <Line 
              data={orderTrendData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false // Ensures the chart fits within its container
              }} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 orders-by-category-chart" ref={ordersByCategoryRef}>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Orders by Category</h3>
          <div className="relative h-64">
            <Pie data={ordersByCategoryData} />
          </div>
        </div>
      </div>

      {/* Best-Selling Products based on total orders */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Best Selling Products</h3> {/* Header added */}
        <table className="w-full table-auto border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white rounded-t-lg">
              <th className="px-4 py-2 border-b-2">Product Name</th>
              <th className="px-4 py-2 border-b-2">Category</th>
              <th className="px-4 py-2 border-b-2">Total Orders</th>
            </tr>
          </thead>
          <tbody className="rounded-b-lg">
            {highestOrderProducts.map((product, index) => (
              <tr 
                key={product._id} 
                className={`text-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
              >
                <td className="border px-4 py-2 text-gray-800">{product.name}</td>
                <td className="border px-4 py-2 text-gray-800">{product.category}</td>
                <td className="border px-4 py-2 text-gray-800">{product.totalOrders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
