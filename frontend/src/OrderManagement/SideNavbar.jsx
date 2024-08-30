import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../asset/logo.png';
import { HomeIcon , CubeIcon , ArchiveBoxIcon , ClipboardDocumentListIcon , CogIcon , ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'; // Replace with appropriate icons

const Sidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  return (
    <div className="bg-white p-4">

      <div className='p-4'>
      <img src={logo} alt="logo" className="w-20 h-20 rounded-full mb-5 mx-auto" />

        <h2 className="text-xl font-bold mb-6">Menu</h2>

        <nav>

          <ul>

            <li className='mb-4'>
              <NavLink
                to="/order"
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2"
              >
                <HomeIcon className="h-5 w-5 mr-3" />
                Dashboard
              </NavLink>
            </li>

            <li className='mb-4'>
              <button
                onClick={toggleProducts}
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2 w-full text-left"
              >
                <CubeIcon className="h-5 w-5 mr-3" />
                Orders
              </button>
              {isProductsOpen && (
                <ul className="ml-8 space-y-1">
                  <li>
                    <NavLink
                      to="orderhistory"
                      className="flex items-center text-gray-600 hover:text-white hover:bg-orange-400 rounded-lg px-4 py-2"
                    >
                      Order History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="orderByProduct"
                      className="flex items-center text-gray-600 hover:text-white hover:bg-orange-400 rounded-lg px-4 py-2"
                    >
                      Orders by products
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li className="mb-4">
              <NavLink
                to="orderinqiry"
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2"
              >
                <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
                Order Inquiries
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink
                to="reports"
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2"
              >
                <ArchiveBoxIcon className="h-5 w-5 mr-3" />
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
                <CogIcon className="h-5 w-5 mr-3" />
                Settings
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink
                to="/logout"
                className="flex items-center hover:text-white hover:bg-red-500 rounded-lg px-4 py-2"
              >
                <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-3" />
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
