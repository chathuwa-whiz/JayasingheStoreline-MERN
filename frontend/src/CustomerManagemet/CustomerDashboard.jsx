import React, { useState } from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../redux/api/usersApiSlice';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../asset/logo.png'; // Ensure this path is correct

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function CustomerManagementDashboard() {
  const { data: users, isLoading: usersLoading, isError: usersError, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Loading and error handling
  if (usersLoading) return <div>Loading...</div>;
  if (usersError) {
    console.error("Error fetching users:", error);
    const errorMessage = error?.data?.message || error?.error || 'Unknown error';

    if (typeof errorMessage === 'string' && errorMessage.startsWith('<')) {
      return <div>Error fetching data: HTML response received. Check authorization or API response.</div>;
    }

    return <div>Error fetching data: {errorMessage}</div>;
  }

  // Filter users by search term (username or age group)
  const filteredUsers = users.filter(user => {
    const lowerCaseUsername = user.username.toLowerCase();
    const ages = searchTerm.split(',').map(age => age.trim().toLowerCase());
    const age = parseInt(user.age); // Assuming age is stored as a string
    const ageGroup = `${Math.floor(age / 10) * 10}s`; // Get the age group (e.g., 10s, 20s)

    return ages.some(age => ageGroup.includes(age)) || lowerCaseUsername.includes(searchTerm.toLowerCase());
  });

  // Categorize users into age groups
  const ageGroups = { '10s': 0, '20s': 0, '30s': 0, '40s': 0, '50s': 0, '60s': 0, '70s': 0, '80s': 0 };

  filteredUsers.forEach((user) => {
    const age = parseInt(user.age); // Assuming age is stored as a string
    if (age >= 10 && age < 20) ageGroups['10s']++;
    else if (age >= 20 && age < 30) ageGroups['20s']++;
    else if (age >= 30 && age < 40) ageGroups['30s']++;
    else if (age >= 40 && age < 50) ageGroups['40s']++;
    else if (age >= 50 && age < 60) ageGroups['50s']++;
    else if (age >= 60 && age < 70) ageGroups['60s']++;
    else if (age >= 70 && age < 80) ageGroups['70s']++;
    else if (age >= 80) ageGroups['80s']++;
  });

  // Prepare age group data for the pie chart
  const ageGroupData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: 'User Age Groups',
        data: Object.values(ageGroups),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#36A2EB',
          '#FF6384',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#36A2EB',
          '#FF6384',
        ],
      },
    ],
  };

  // Prepare age group data for the bar chart
  const ageGroupBarData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: 'User Age Groups',
        data: Object.values(ageGroups),
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  
  // Page navigation handlers
  const handleNextPage = () => {
    if (indexOfLastUser < filteredUsers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleShowAll = () => {
    setCurrentPage(Math.ceil(filteredUsers.length / usersPerPage));
  };

  // Total users based on filtered data
  const totalUsers = filteredUsers.length;

  // Generate PDF using jsPDF and jsPDF-Autotable
  const generatePDFWithHeaderFooter = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Load the logo image
    const img = new Image();
    img.src = logo;

    img.onload = function () {
      const addHeaderFooter = (doc) => {
        // Header
        doc.addImage(img, 'PNG', 14, 10, 30, 30);
        doc.setFontSize(16);
        doc.text('Jayasinghe Storelines PVT LTD', 50, 20);
        doc.setFontSize(12);
        doc.text('No. 123, Main Street, Colombo, Sri Lanka', 50, 28);
        doc.text('Contact: +94 11 234 5678 | Email: info@jayasinghe.com', 50, 34);

        // Report title and date
        const currentDate = new Date().toLocaleDateString();
        doc.setFontSize(14);
        doc.text('User Activity Report', 50, 42);
        doc.text(`Issued on: ${currentDate}`, 50, 48);

        // Line below header
        doc.setLineWidth(0.5);
        doc.line(14, 52, pageWidth - 14, 52);

        // Footer
        doc.setFontSize(10);
        doc.text('Jayasinghe Storelines PVT LTD', 14, pageHeight - 10);
        doc.text('Confidential - For Internal Use Only', 14, pageHeight - 20);
        doc.text('Version 1.0', pageWidth - 30, pageHeight - 20);
        doc.text(`Page ${doc.internal.getCurrentPageInfo().pageNumber} of`, pageWidth - 30, pageHeight - 10);
      };

      // Prepare the table data
      const rows = filteredUsers.map((user, index) => [
        index + 1,
        `${user.firstname} ${user.lastname}`,
        user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A',
        user.isLoggedIn ? 'Online' : 'Offline',
      ]);

      // Add the table
      doc.autoTable({
        head: [['#', 'Name', 'Last Login', 'Status']],
        body: rows,
        startY: 55,
        margin: { top: 60 },
        didDrawPage: (data) => {
          addHeaderFooter(doc);
        },
      });

      // Add total page number to all pages
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`${pageCount}`, pageWidth - 10, pageHeight - 10);
      }

      // Save the PDF
      doc.save('User_Activity_Report.pdf');
    };

    img.onerror = function () {
      console.error('Image loading failed. PDF will be generated without the logo.');
      generatePDFWithoutLogo(doc);
    };
  };

  const generatePDFWithoutLogo = (doc) => {
    // ... (keep the existing generatePDFWithoutLogo function)
  };

  // Replace the existing generatePDF function with this new one
  const generatePDF = generatePDFWithHeaderFooter;

  // Delete user function using fetch
  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Error deleting user: ${response.statusText}`);
        }
        console.log(`User with ID ${userId} deleted successfully.`);
        
        // Reload the user list after deletion
        refetch();
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert(`Error deleting user: ${error.message}`);
      }
    }
  };

  return (
    <div className="overflow-auto bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        {/* Search Bar */}
        <input 
          type="text"
          placeholder="Search by Username or Age (e.g. 10, 20)"
          className="px-4 py-2 border rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (!/^[a-zA-Z0-9, ]*$/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />

        {/* Download PDF Button */}
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={generatePDF}
        >
          Download PDF
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="bg-purple-100 p-4 rounded-lg text-center shadow-sm mb-8">
        <h2 className="text-4xl font-bold">{totalUsers}</h2>
        <p className="text-lg">Total Web Site Users</p>
        <p className="text-purple-600">+8% increase</p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Age Group Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Age Groups (Bar Chart)</h3>
          <Bar data={ageGroupBarData} />
        </div>

        {/* Age Group Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Age Groups (Pie Chart)</h3>
          <Pie data={ageGroupData} />
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Recent User Activities</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Last Login</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id} className="text-center">
                <td className="border px-4 py-2">{indexOfFirstUser + index + 1}</td> {/* Auto-incremented number */}
                <td className="border px-4 py-2">{user.firstname} {user.lastname}</td>
                <td className="border px-4 py-2">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
                </td>
                <td className="border px-4 py-2">
                  {user.isLoggedIn ? 'Online' : 'Offline'}
                </td>
                <td className="border px-4 py-2">
                  <button 
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>Page {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}</span>

          <button
            className={`px-4 py-2 bg-gray-300 rounded ${indexOfLastUser >= filteredUsers.length && 'opacity-50 cursor-not-allowed'}`}
            onClick={handleNextPage}
            disabled={indexOfLastUser >= filteredUsers.length}
          >
            Next
          </button>

          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={handleShowAll}
          >
            Show All
          </button>
        </div>
      </div>
    </div>
  );
}