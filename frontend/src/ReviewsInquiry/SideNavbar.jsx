import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon , CubeIcon , ArchiveBoxIcon , ClipboardDocumentListIcon , CogIcon , ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'; // Replace with appropriate icons
import logo from '../asset/logo.png';

const Sidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  return (
    <div className="bg-white p-4">

      <div className='p-4'>

        <img src={logo} alt="logo" className="w-20 h-20 rounded-full mb-5 mx-auto" />

        <nav>

          <ul>

            <li className='mb-4'>
              <NavLink
                to="/dashboard"
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
                Products
              </button>
              {isProductsOpen && (
                <ul className="ml-5 space-y-1">
                  <li>
                    <NavLink
                      to="/dashboardlist"
                      className="flex items-center text-gray-600 hover:text-white hover:bg-orange-400 rounded-lg px-4 py-2"
                    >
                      Products List
                    </NavLink>
                  </li>

                </ul>
              )}
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
