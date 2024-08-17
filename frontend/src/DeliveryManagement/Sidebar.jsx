import React, { useState } from 'react';
import { FaTruck, FaBell, FaChartBar, FaCog, FaSignOutAlt, FaListAlt, FaPlusCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  const toggleDeliveryDropdown = () => {
    setIsDeliveryOpen(!isDeliveryOpen);
  };

  return (
    <div className="bg-white p-4">

      <div className='p-4'>

        <h2 className="text-xl font-bold mb-6">Menu</h2>

        <nav>

          <ul>

            <li className='mb-4'>
              <NavLink
                to="/delivery"
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2"
              >
                <FaListAlt className="h-5 w-5 mr-3" />
                Dashboard
              </NavLink>
            </li>

            <li className='mb-4'>
              <button
                onClick={toggleDeliveryDropdown}
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2 w-full text-left"
              >
                <FaTruck className="h-5 w-5 mr-3" />
                Deliveries
              </button>
              {isDeliveryOpen && (
                <ul className="ml-5 space-y-1">
                  <li>
                    <NavLink
                      to="deliverydetail"
                      className="flex items-center text-gray-600 hover:text-white hover:bg-orange-400 rounded-lg px-4 py-2"
                    > <FaPlusCircle className="h-5 w-5 mr-3" />
                      Delivery Details
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="adddelivery"
                      className="flex items-center text-gray-600 hover:text-white hover:bg-orange-400 rounded-lg px-4 py-2"
                    > <FaPlusCircle className="h-5 w-5 mr-3" />
                      Add Delivery
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li className="mb-4">
              <NavLink
                to="/notification"
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2"
              >
                <FaBell className="h-5 w-5 mr-3" />
                Notification
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink
                to="/reports"
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2"
              >
                <FaChartBar className="h-5 w-5 mr-3" />
                Reports
              </NavLink>
            </li>

            

          </ul>

        </nav>

      </div>

      <div className='p-4'>

        <nav>

          <ul>

            <li className="mb-4">
              <NavLink
                to="/settings"
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2"
              >
                <FaCog className="h-5 w-5 mr-3" />
                Settings
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink
                to="/logout"
                className="flex items-center hover:text-white hover:bg-red-500 rounded-lg px-4 py-2"
              >
                <FaSignOutAlt className="h-5 w-5 mr-3" />
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
