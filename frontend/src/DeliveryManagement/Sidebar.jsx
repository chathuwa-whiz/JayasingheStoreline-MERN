import React, { useState, useEffect } from 'react';
import { FaTruck, FaBell, FaChartBar, FaCog, FaSignOutAlt, FaListAlt, FaPlusCircle, FaTasks, FaMoon, FaSun, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import logo from '../asset/logo.png';

const Sidebar = () => {
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [darkMode]);

  const toggleDeliveryDropdown = () => {
    setIsDeliveryOpen(!isDeliveryOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`h-screen w-64 p-5 flex flex-col justify-between ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div>
        <div className="flex justify-between items-center mb-8">
          <img src={logo} alt="logo" className="w-20 h-20 rounded-full border-2 border-orange-500" />
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-900'}`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className='mb-8'>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>Menu</h2>
          <nav>
            <ul>
              <li className='mb-4'>
                <NavLink
                  to="/delivery"
                  className={({ isActive }) => `flex items-center rounded-lg px-4 py-3 transition-colors duration-300 ${
                    isActive
                      ? 'bg-orange-600 text-white'
                      : darkMode
                      ? 'text-white hover:bg-gray-700'
                      : 'text-black hover:bg-orange-100'
                  }`}
                >
                  <FaListAlt className="h-6 w-6 mr-4" />
                  Dashboard
                </NavLink>
              </li>

              <li className='mb-4'>
                <button
                  onClick={toggleDeliveryDropdown}
                  className={`flex items-center w-full text-left rounded-lg px-4 py-3 transition-colors duration-300 ${
                    darkMode
                      ? 'text-white hover:bg-gray-700'
                      : 'text-black hover:bg-orange-100'
                  }`}
                >
                  <FaTruck className="h-6 w-6 mr-4" />
                  Deliveries
                </button>
                {isDeliveryOpen && (
                  <ul className={`ml-4 mt-2 space-y-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
                    <li>
                      <NavLink
                        to="deliverydetail"
                        className={({ isActive }) => `flex items-center rounded-lg px-4 py-2 transition-colors duration-300 ${
                          isActive
                            ? 'bg-orange-600 text-white'
                            : darkMode
                            ? 'text-white hover:bg-gray-600'
                            : 'text-black hover:bg-orange-200'
                        }`}
                      >
                        <FaPlusCircle className="h-6 w-6 mr-4" />
                        Delivery Details
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="adddelivery"
                        className={({ isActive }) => `flex items-center rounded-lg px-4 py-2 transition-colors duration-300 ${
                          isActive
                            ? 'bg-orange-600 text-white'
                            : darkMode
                            ? 'text-white hover:bg-gray-600'
                            : 'text-black hover:bg-orange-200'
                        }`}
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
                  to="drivervehicledetails"
                  className={({ isActive }) => `flex items-center rounded-lg px-4 py-3 transition-colors duration-300 ${
                    isActive
                      ? 'bg-orange-600 text-white'
                      : darkMode
                      ? 'text-white hover:bg-gray-700'
                      : 'text-black hover:bg-orange-100'
                  }`}
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
                  className={({ isActive }) => `flex items-center rounded-lg px-4 py-3 transition-colors duration-300 ${
                    isActive
                      ? 'bg-orange-600 text-white'
                      : darkMode
                      ? 'text-white hover:bg-gray-700'
                      : 'text-black hover:bg-orange-100'
                  }`}
                >
                  <FaCog className="h-6 w-6 mr-4" />
                  Settings
                </NavLink>
              </li>

              <li className="mb-4">
                <NavLink
                  to="logout"
                  className={({ isActive }) => `flex items-center rounded-lg px-4 py-3 transition-colors duration-300 ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : darkMode
                      ? 'text-white hover:bg-red-700'
                      : 'text-black hover:bg-red-100'
                  }`}
                >
                  <FaSignOutAlt className="h-6 w-6 mr-4" />
                  Logout
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Company Info and Clock */}
      <div className={`mt-8 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`flex items-center mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <FaEnvelope className="mr-2" />
          <span className="text-sm">info@jayasinghe.com</span>
        </div>
        <div className={`flex items-center mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <FaPhone className="mr-2" />
          <span className="text-sm">+94 11 234 5678</span>
        </div>
        <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <FaClock className="mr-2" />
          <span className="text-sm">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
