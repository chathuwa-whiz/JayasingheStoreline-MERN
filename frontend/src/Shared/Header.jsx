import React, {useState, useRef, useEffect} from 'react';
import { FaSearch, FaBell } from "react-icons/fa";
import logo from "../../../uploads/customerManagement/logo.png" // Adjust the path to your logo image


// main home
export default function DefaultHeader() {
  return (
    <header className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold">JAYASINGHE STORLINES</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <a href="#" className="hover:text-yellow-400">HOME</a>
          <a href="#" className="hover:text-yellow-400">STORE</a>
          <a href="#" className="hover:text-yellow-400">CATALOG</a>
          <a href="#" className="hover:text-yellow-400">PAYMENT</a>
          <a href="#" className="hover:text-yellow-400">CONTACT</a>
        </nav>

        {/* Login and Register Buttons */}
        <div className="space-x-4">
          <button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-50">Login</button>
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-yellow-400">Register</button>
        </div>
      </div>
    </header>
  )
}

// inventory management
export function DashboardHeader() {
  return (
    <div>This is Dashboard Header</div>
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
  return (
    <div>This is Stock header</div>
  )
}

export function ReportsHeader() {
  return (
    <div>This is Reports header</div>
  )
}

export function DefaultHeadre() {
  return (
    <div>This is Default header</div>
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