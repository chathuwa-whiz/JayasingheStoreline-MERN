import React from 'react';
import { FaTruck, FaBell, FaChartBar, FaCog, FaSignOutAlt, FaListAlt, FaPlusCircle } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 bg-orange-500 text-white h-screen">
      <div className="flex items-center justify-center p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav className="space-y-4">
        <a href="#" className="flex items-center p-4 hover:bg-orange-600">
          <FaListAlt className="mr-3" />
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center p-4 hover:bg-orange-600">
          <FaTruck className="mr-3" />
          <span>Deliveries</span>
        </a>
        <a href="#" className="flex items-center pl-12 p-4 hover:bg-orange-600">
          <FaPlusCircle className="mr-3" />
          <span>Add Delivery</span>
        </a>
        <a href="#" className="flex items-center p-4 hover:bg-orange-600">
          <FaBell className="mr-3" />
          <span>Notification</span>
        </a>
        <a href="#" className="flex items-center p-4 hover:bg-orange-600">
          <FaChartBar className="mr-3" />
          <span>Reports</span>
        </a>
        <a href="#" className="flex items-center p-4 hover:bg-orange-600">
          <FaCog className="mr-3" />
          <span>Settings</span>
        </a>
        <a href="#" className="flex items-center p-4 hover:bg-orange-600">
          <FaSignOutAlt className="mr-3" />
          <span>Logout</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
