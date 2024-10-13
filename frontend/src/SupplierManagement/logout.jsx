import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Logout icon

export default function LogoutPage() {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Add your logout logic here (clear session, tokens, etc.)
    console.log('User logged out');
    // Redirect to login or home page
    navigate('/adminlogin');
  };

  return (
    <div className="min-h-screen bg-orange-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="text-blue-600 mb-4">
          <FaSignOutAlt size={50} className="mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Are you sure you want to logout?</h1>
        <p className="text-gray-600 mb-6">You will need to log back in to access your account.</p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={() => navigate('/supplier')}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
