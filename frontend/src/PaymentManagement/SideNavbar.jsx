import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../uploads/paymentPh/1.jpg';
import {
  HomeIcon,
  CubeIcon,
  ArchiveBoxIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';

const Sidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  return (
    <div className="bg-white p-4 w-64">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={logo} // Replace with your logo path
          alt="Logo"
          className="w-16 h-16 rounded-full mb-2"
        />
        <span className="text-lg font-semibold">Payment Manager</span>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <NavLink
                to="/Payment"
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2"
              >
                <HomeIcon className="h-5 w-5 mr-3" />
                Payment Dashboard
              </NavLink>
            </li>

            <li className="mb-4">
              <button
                onClick={toggleProducts}
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2 w-full text-left"
              >
                <CubeIcon className="h-5 w-5 mr-3" />
                Products
              </button>
            </li>

            <li className="mb-4">
              <NavLink
                to="/payment/HrNotify"
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2"
              >
                <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
                HR Notification
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink
                to="/payment/SupNotify"
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2"
              >
                <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
                Supplier Notification
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink
                to="/payment/paymentReport"
                className="flex items-center hover:text-white hover:bg-orange-500 rounded-lg px-4 py-2"
              >
                <ArchiveBoxIcon className="h-5 w-5 mr-3" />
                Reports
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-4">
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
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
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
