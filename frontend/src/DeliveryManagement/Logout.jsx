import React from 'react';
// import { useHistory } from 'react-router-dom';
import { FaSignOutAlt, FaTimesCircle } from 'react-icons/fa'; // Icons for better visuals

export default function Logout() {
  // const history = useHistory();

  const handleLogout = () => {
    // history.push('/login');
  };

  const handleCancel = () => {
    // history.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-orange-500 to-red-500">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <FaSignOutAlt className="text-red-500 text-4xl mb-4 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Logout from Delivery Manager
        </h2>
        <p className="text-gray-600 mb-8">Are you sure you want to log out?</p>
        <div className="flex justify-around">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
          >
            <FaSignOutAlt className="inline mr-2" />
            Confirm Logout
          </button>
          <button
            onClick={handleCancel}
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
          >
            <FaTimesCircle className="inline mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}