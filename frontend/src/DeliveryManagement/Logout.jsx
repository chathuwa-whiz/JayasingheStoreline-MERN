import React from 'react';
import { useHistory } from 'react-router-dom'; // If you're using react-router for navigation

export default function Logout() {
  const history = useHistory();

  const handleLogout = () => {
    // Perform logout logic, e.g., clearing user session/token
    // Redirect to login page after logout
    history.push('/login');
  };

  const handleCancel = () => {
    // Redirect back to the delivery manager dashboard
    history.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Logout from Delivery Manager</h2>
        <p className="mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-around">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Confirm Logout
          </button>
          <button
            onClick={handleCancel}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
