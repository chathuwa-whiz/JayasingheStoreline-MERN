import React, { useState } from 'react';
import { useAllProductsQuery } from '../redux/api/productApiSlice';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logoImage from '../asset/logo.png'; // Adjust the path based on the file location
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Sidebar from './SideNavbar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardDashboard() {
  const { data: products, isLoading: productsLoading, isError: productsError } = useAllProductsQuery();
  
  if (productsLoading) return <div>Loading...</div>;
  if (productsError) return <div>Something went wrong</div>;

  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);

  const categoryList = [];
  let totalInquiries = 0;
  let totalReviews = 0;

  for (const product of products) {
    categoryList.push(product.category);
    totalInquiries += product.inquiries?.length || 0;
    totalReviews += product.reviews?.length || 0;
  }

  const categories = [...new Set(categoryList)];

  const inquiriesBarChartData = {
    labels: categories,
    datasets: [{
      label: 'Number of Inquiries',
      data: categories.map(category =>
        products
          .filter(product => product.category === category)
          .reduce((totalInquiries, product) => totalInquiries + (product.inquiries?.length || 0), 0)
      ),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      barThickness: 50,
    }]
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 1;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.max((totalRating / reviews.length).toFixed(1), 1);
  };

  const calculateRatingDistribution = () => {
    const totalReviews = products.reduce((acc, product) => acc + (product.reviews?.length || 0), 0);
    const ratingCounts = [0, 0, 0, 0, 0];

    products.forEach(product => {
      const averageRating = calculateAverageRating(product.reviews);
      if (averageRating >= 1 && averageRating <= 5) {
        ratingCounts[Math.floor(averageRating) - 1]++;
      }
    });

    return ratingCounts.map(count => (totalReviews > 0 ? (count / totalReviews) * 100 : 0));
  };

  
  const averageStarRatingsPieChartData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [{
      label: 'Percentage of Star Ratings',
      data: calculateRatingDistribution(),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', 
        'rgba(255, 159, 64, 0.6)', 
        'rgba(255, 206, 86, 0.6)', 
        'rgba(75, 192, 192, 0.6)', 
        'rgba(54, 162, 235, 0.6)',
      ],
      hoverBackgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
      ],
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#000',
        titleColor: '#fff',
        bodyColor: '#fff'
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14
          }
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        }
      },
      y: {
        ticks: {
          font: {
            size: 14
          },
          autoSkip: false,
        },
        grid: {
          display: true
        }
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const averageRating = calculateAverageRating(product.reviews);
    return (
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      averageRating >= minRating &&
      averageRating <= maxRating
    );
  });

  const generatePDF = () => {
    const input = document.getElementById('dashboardReport');
    
    // Convert the dashboard element to canvas
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
  
     // Center align text
    const title = 'JAYASINGHE STORELINES PVT(LTD)';
    const subtext = 'Ratings and Inquiries of Products';
    const email = 'email: JayasingheStorelines@gmail.com';
    const currentDate = new Date().toLocaleDateString(); // Get current date
    const pageWidth = pdf.internal.pageSize.width;
    
    pdf.setFontSize(20);
    
    // Calculate the width of the text
    const titleWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const subtextWidth = pdf.getStringUnitWidth(subtext) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    
    // Calculate the position to center the text
    const titleX = (pageWidth - titleWidth) / 2;
    
    // Add the title and subtext to the PDF
    pdf.text(title, titleX, 20); // Centered at y = 20
    pdf.setFontSize(10);
    pdf.text(subtext, 50, 30); // Centered at y = 30
    pdf.text(email, 50, 40);  // Adjust the Y position (40) as needed
    pdf.text(`Date: ${currentDate}`, 150, 40); // Add current date on the right side at y = 40
  
      // Load and add the logo image
      const logo = new Image();
      logo.src = logoImage; // Use the imported logo image
  
      // Ensure the logo is loaded before proceeding
      logo.onload = function () {
        // Add the logo to the PDF
        pdf.addImage(logo, 'PNG', 10, 5, 30, 30); // Adjust position and size
  
        // Add the dashboard content image after the logo
        pdf.addImage(imgData, 'PNG', 0, position + 50, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        // Handle pagination if content exceeds one page
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position + 40, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        
  
        // Save the PDF after everything has been added
        pdf.save('dashboard-report.pdf');
      };
  
      // Handle error if logo fails to load
      logo.onerror = function () {
        console.error("Logo failed to load.");
      };
    }).catch(err => {
      console.error("Error generating canvas:", err);
    });
  };
  
  

  return (
<div className="flex">
  <div className="w-1/5 bg-gray-100 min-h-screen">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="overflow-auto bg-gray-100 p-6 w-4/5 rounded-lg">
    
    {/* Search Bar */}
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by Product Name or Category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <div className="flex space-x-2 mt-2">
        <input
          type="number"
          min="1"
          max="5"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          placeholder="Min Rating"
          className="p-2 border rounded w-1/2"
        />
        <input
          type="number"
          min="1"
          max="5"
          value={maxRating}
          //onChange={(e) => setMaxRating(Number(e.target.value))}
          placeholder="Max Rating"
          className="p-2 border rounded w-1/2"
        />
      </div>
    </div>

    {/* Generate PDF Button */}
    <button
      onClick={generatePDF}
      className="mb-4 p-2 bg-blue-500 text-white rounded"
    >
      Generate PDF Report
    </button>

    {/* Dashboard Report Content */}
    <div id="dashboardReport">
      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-teal-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-teal-800">{products.length}</h2>
          <p className="text-lg text-gray-700">Total Products</p>
          {/*
          <p className="text-teal-600">+10% +1.2k this week</p>*/}
        </div>

        <div className="bg-purple-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-purple-800">{categories.length}</h2>
          <p className="text-lg text-gray-700">Total Categories</p>
        </div>

        <div className="bg-indigo-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-indigo-800">{totalInquiries}</h2>
          <p className="text-lg text-gray-700">Total Inquiries</p>
        </div>

        <div className="bg-pink-100 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-pink-800">{totalReviews}</h2>
          <p className="text-lg text-gray-700">Total Reviews and Ratings</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6"> {/* Add margin-bottom here */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">Inquiries by Category</h3>
          <div className="relative h-80">
            <Bar data={inquiriesBarChartData} options={{ ...chartOptions, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6"> {/* Add margin-bottom here */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">Average Star Ratings Distribution</h3>
          <div className="relative h-80">
            <Pie data={averageStarRatingsPieChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      

      {/* Products Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Products</h3>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border border-gray-300 text-left text-sm font-medium text-gray-700 uppercase">Product Name</th>
              <th className="py-3 px-4 border border-gray-300 text-left text-sm font-medium text-gray-700 uppercase">Category</th>
              <th className="py-3 px-4 border border-gray-300 text-left text-sm font-medium text-gray-700 uppercase">Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => {
              // Define category color mapping
              const categoryColors = {
                electronics: 'bg-blue-100',
                furniture: 'bg-green-100',
                clothes: 'bg-yellow-100',
                // Add more categories and colors as needed
              };

              // Get the color for the product's category
              const categoryColor = categoryColors[product.category.toLowerCase()] || 'bg-white'; // Default to white if category not found

              return (
                <tr key={product.id} className={`border-b hover:bg-gray-100 transition duration-150 ease-in-out ${categoryColor}`}>
                  <td className="py-2 px-4 border border-gray-300 text-gray-800">{product.name}</td>
                  <td className="py-2 px-4 border border-gray-300 text-gray-800">{product.category}</td>
                  <td className="py-2 px-4 border border-gray-300 text-gray-800">{calculateAverageRating(product.reviews).toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  );
}
