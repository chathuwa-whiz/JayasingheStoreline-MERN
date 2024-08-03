import React from 'react';
import { HomeIcon , CubeIcon , ArchiveBoxIcon , ClipboardDocumentListIcon , CogIcon , ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

export default function SideNavbar() {
  return (
    <div className="h-screen bg-white shadow-lg flex flex-col justify-between">
      <div className="p-4">
        <div className="mb-8">
          {/* <h1 className="text-2xl font-bold text-orange-500">Dashboard</h1> */}
        </div>
        <nav>
          <ul>
            <li className="mb-4">
                <button type='button' className='text-white bg-orange-500 hover:bg-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                    <a href="#dashboard" className="flex items-center">
                        <HomeIcon className="h-6 w-6 mr-3" />
                        Dashboard
                    </a>
                </button>
            </li>
            <li className="mb-4">
              <a href="#products" className="flex items-center text-gray-700 hover:text-orange-500">
                <CubeIcon className="h-6 w-6 mr-3" />
                Products
              </a>
            </li>
            <li className="mb-4">
              <a href="#stock" className="flex items-center text-gray-700 hover:text-orange-500">
                <ArchiveBoxIcon className="h-6 w-6 mr-3" />
                Stock
              </a>
            </li>
            <li className="mb-4">
              <a href="#reports" className="flex items-center text-gray-700 hover:text-orange-500">
                <ClipboardDocumentListIcon className="h-6 w-6 mr-3" />
                Reports
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-4">
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#settings" className="flex items-center text-gray-700 hover:text-orange-500">
                <CogIcon className="h-6 w-6 mr-3" />
                Settings
              </a>
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
  )
}
