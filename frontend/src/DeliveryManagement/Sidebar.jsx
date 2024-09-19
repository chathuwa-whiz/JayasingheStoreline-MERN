import React, { useState } from 'react';
import { FaTruck, FaBell, FaChartBar, FaCog, FaSignOutAlt, FaListAlt, FaPlusCircle, FaTasks } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import logo from '../asset/logo.png';

const Sidebar = () => {
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  const toggleDeliveryDropdown = () => {
    setIsDeliveryOpen(!isDeliveryOpen);
  };

  return (
    <div className="bg-gray-900 text-white h-screen w-64 p-5">

      <img src={logo} alt="logo" className="w-20 h-20 rounded-full mb-8 mx-auto border-2 border-orange-500" />

      <div className='mb-8'>
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <nav>
          <ul>
            <li className='mb-4'>
              <NavLink
                to="/delivery"
                className="flex items-center text-gray-300 hover:bg-orange-600 hover:text-white rounded-lg px-4 py-3 transition-colors duration-300"
              >
                <FaListAlt className="h-6 w-6 mr-4" />
                Dashboard
              </NavLink>
            </li>

            <li className='mb-4'>
              <button
                onClick={toggleDeliveryDropdown}
                className="flex items-center text-gray-300 hover:bg-orange-600 hover:text-white rounded-lg px-4 py-3 w-full text-left transition-colors duration-300"
              >
                <FaTruck className="h-6 w-6 mr-4" />
                Deliveries
              </button>
              {isDeliveryOpen && (
                <ul className="ml-4 mt-2 space-y-1 bg-gray-800 rounded-lg">
                  <li>
                    <NavLink
                      to="deliverydetail"
                      className="flex items-center text-gray-300 hover:bg-orange-500 hover:text-white rounded-lg px-4 py-2 transition-colors duration-300"
                    >
                      <FaPlusCircle className="h-6 w-6 mr-4" />
                      Delivery Details
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="adddelivery"
                      className="flex items-center text-gray-300 hover:bg-orange-500 hover:text-white rounded-lg px-4 py-2 transition-colors duration-300"
                    >
                      <FaPlusCircle className="h-6 w-6 mr-4" />
                      Add Delivery
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li className="mb-4">
              <NavLink
                to="notification"
                className="flex items-center text-gray-300 hover:bg-orange-600 hover:text-white rounded-lg px-4 py-3 transition-colors duration-300"
              >
                <FaBell className="h-6 w-6 mr-4" />
                Notification
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink
                to="reports"
                className="flex items-center text-gray-300 hover:bg-orange-600 hover:text-white rounded-lg px-4 py-3 transition-colors duration-300"
              >
                <FaChartBar className="h-6 w-6 mr-4" />
                Reports
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink
                to="drivervehicledetails"
                className="flex items-center text-gray-300 hover:bg-orange-600 hover:text-white rounded-lg px-4 py-3 transition-colors duration-300"
              >
                <FaTasks className="h-6 w-6 mr-4" />
                D & V Details
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <nav>
          <ul>
            <li className="mb-4">
              <NavLink
                to="settings"
                className="flex items-center text-gray-300 hover:bg-orange-600 hover:text-white rounded-lg px-4 py-3 transition-colors duration-300"
              >
                <FaCog className="h-6 w-6 mr-4" />
                Settings
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink
                to="logout"
                className="flex items-center text-gray-300 hover:bg-red-600 hover:text-white rounded-lg px-4 py-3 transition-colors duration-300"
              >
                <FaSignOutAlt className="h-6 w-6 mr-4" />
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  );
};

export default Sidebar;
