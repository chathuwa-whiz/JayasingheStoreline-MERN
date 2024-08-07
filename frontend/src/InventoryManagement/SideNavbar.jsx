import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon , CubeIcon , ArchiveBoxIcon , ClipboardDocumentListIcon , CogIcon , ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

export default function SideNavbar() {

  return (
    <>
      <div className="h-screen bg-white shadow-lg flex flex-col justify-between">
      <div className="p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-orange-500">Dashboard</h1>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <NavLink 
                to="/inventory" 
                exact
                activeClassName="text-orange-500"
                className="flex items-center text-gray-700 hover:text-orange-500"
              >
                <HomeIcon className="h-6 w-6 mr-3" />
                Dashboard
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink 
                to="products" 
                activeClassName="text-orange-500"
                className="flex items-center text-gray-700 hover:text-orange-500"
              >
                <CubeIcon className="h-6 w-6 mr-3" />
                Products
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink 
                to="stock" 
                activeClassName="text-orange-500"
                className="flex items-center text-gray-700 hover:text-orange-500"
              >
                <ArchiveBoxIcon className="h-6 w-6 mr-3" />
                Stock
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink 
                to="reports" 
                activeClassName="text-orange-500"
                className="flex items-center text-gray-700 hover:text-orange-500"
              >
                <ClipboardDocumentListIcon className="h-6 w-6 mr-3" />
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
                to="settings" 
                activeClassName="text-orange-500"
                className="flex items-center text-gray-700 hover:text-orange-500"
              >
                <CogIcon className="h-6 w-6 mr-3" />
                Settings
              </NavLink>
            </li>
            <li>
              <a href="#logout" className="flex items-center text-gray-700 hover:text-orange-500">
                <ArrowRightStartOnRectangleIcon className="h-6 w-6 mr-3" />
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    </>
  )
}
