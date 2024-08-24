import React, {useState, useRef, useEffect} from 'react';
import { FaSearch, FaBell } from "react-icons/fa";

// main home
export default function DefaultHeader() {
  return (
    <div>This is Main Header</div>
  )
}

// inventory management
export function DashboardHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
    <div className="h-16 bg-white flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="flex items-center space-x-6">

        {/* Notification Icon and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaBell size={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-2">
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 1
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 2
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 3
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  View All Notifications
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img
            className="w-8 h-8 rounded-full"
            src="https://via.placeholder.com/150"
            alt="User profile"
          />
          <span className="text-gray-700">Chathushka Navod</span>
        </div>
      </div>
    </div>
    </>
  )
}

export function ProductsHeader() {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
    <div className="h-16 bg-white flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">List Product</h1>

      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-500" />
          </span>
          <input
            type="text"
            placeholder="Search Products"
            className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Notification Icon and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaBell size={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-2">
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 1
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 2
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 3
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  View All Notifications
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img
            className="w-8 h-8 rounded-full"
            src="https://via.placeholder.com/150"
            alt="User profile"
          />
          <span className="text-gray-700">Chathushka Navod</span>
        </div>
      </div>
    </div>
    </>
  )
}

export function StockHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
    <div className="h-16 bg-white flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">List Product</h1>

      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-500" />
          </span>
          <input
            type="text"
            placeholder="Search Products"
            className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Notification Icon and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaBell size={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-2">
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 1
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 2
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 3
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  View All Notifications
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img
            className="w-8 h-8 rounded-full"
            src="https://via.placeholder.com/150"
            alt="User profile"
          />
          <span className="text-gray-700">Chathushka Navod</span>
        </div>
      </div>
    </div>
    </>
  )
}

export function ReportsHeader( { onExportToExcel } ) {
  return (
    <div className="h-16 bg-white flex justify-between items-center px-4">
      <h2 className="text-3xl font-bold">Sales Report</h2>
      <div className="flex items-center space-x-4">
        <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg">Date Range</button>
        <button 
          onClick={onExportToExcel}
          className="bg-green-500 text-white px-4 py-2 rounded-lg">Export to Excel</button>
        <div className="flex items-center space-x-2">
          <img src="https://via.placeholder.com/40" alt="User" className="rounded-full" />
          <span>Chathushka Navod</span>
        </div>
      </div>
    </div>


  )
}

export function CategoriesHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
    <div className="h-16 bg-white flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">Categories</h1>

      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-500" />
          </span>
          <input
            type="text"
            placeholder="Search Products"
            className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Notification Icon and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaBell size={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-2">
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 1
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 2
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 3
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  View All Notifications
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img
            className="w-8 h-8 rounded-full"
            src="https://via.placeholder.com/150"
            alt="User profile"
          />
          <span className="text-gray-700">Chathushka Navod</span>
        </div>
      </div>
    </div>
    </>
  )
}

// vidumini
export function OrderHeader() {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
    <div className="fixed top-0 left-64 right-0 h-16 bg-white flex items-center justify-between px-4">
    <h1 className="text-xl font-bold">List Product</h1>

      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-500" />
          </span>
          <input
            type="text"
            placeholder="Search Products"
            className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Notification Icon and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaBell size={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-2">
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 1
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 2
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Notification 3
                </div>
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  View All Notifications
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img
            className="w-8 h-8 rounded-full"
            src="https://via.placeholder.com/150"
            alt="User profile"
          />
          <span className="text-gray-700">Chathushka Navod</span>
        </div>
      </div>
    </div>
    </>
  )
}