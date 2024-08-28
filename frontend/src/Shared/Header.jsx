import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";
import logo from "../asset/logo.png" // Adjust the path to your logo image

// main home
export default function DefaultHeader() {
  return (
    <header className="bg-blue-900 text-white p-4 h-20 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold">JAYASINGHE STORLINES</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6 mr-32">
          <a href="#" className="hover:text-yellow-400">HOME</a>
          <a href="#" className="hover:text-yellow-400">STORE</a>
          <a href="#" className="hover:text-yellow-400">CATALOG</a>
          <a href="#" className="hover:text-yellow-400">MAP</a>
          <a href="#" className="hover:text-yellow-400">CONTACT</a>
        </nav>

        {/* Login and Register Buttons */}
        <div className="space-x-4">
          <a href="CustomerLogin"><button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-50">Login</button></a>
          <a href="register"><button className="bg-white text-black px-4 py-2 rounded hover:bg-yellow-400">Register</button></a>
        </div>
      </div>
    </header>
  )
}


import profilePhoto from "../../../uploads/customerManagement/profilePhoto.png"; // Adjust the path to the user's profile photo

// Home Header
export function HomeHeader() {
  return (
    <header className="bg-blue-900 text-white p-4 h-20">
      <div className="container mx-auto flex justify-between items-center -mt-3">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold">JAYASINGHE STORLINES</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <a href="#" className="hover:text-yellow-400 ml-48">HOME</a>
          <a href="#" className="hover:text-yellow-400">STORE</a>
          <a href="#" className="hover:text-yellow-400">CATALOG</a>
          <a href="#" className="hover:text-yellow-400">MAP</a>
          <a href="#" className="hover:text-yellow-400">CONTACT</a>
        </nav>

        {/* Profile and Logout/Settings */}
        <img
            src={profilePhoto}
            alt="User Profile"
            className="h-16 w-30 rounded-full cursor-pointer ml-24"
          />
          
          <span className="text-white text-lg font-semibold -m-20">Akash Jayasinghe</span>

        <div className="flex items-center ">
          <a href="profile"><button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-50 ml-10">Profile</button></a>
        </div>
      </div>
    </header>
  );
}

// Profile Header
export function ProfileHeader() {
  return (
    <header className="bg-blue-900 text-white p-4 h-20">
      <div className="container mx-auto flex justify-between items-center -mt-3">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold">JAYASINGHE STORLINES</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <a href="#" className="hover:text-yellow-400 ml-10">HOME</a>
          <a href="#" className="hover:text-yellow-400">STORE</a>
          <a href="#" className="hover:text-yellow-400">CATALOG</a>
          <a href="#" className="hover:text-yellow-400">MAP</a>
          <a href="#" className="hover:text-yellow-400">CONTACT</a>
        </nav>

        {/* Profile and Logout/Settings */}
        <img
            src={profilePhoto}
            alt="User Profile"
            className="h-16 w-30 rounded-full cursor-pointer ml-24"
          />
          
          <span className="text-white text-lg font-semibold -ml-48">Akash Jayasinghe</span>

        
      </div>
    </header>
  );
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

export function ProductsHeader({ products }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);
    if (query.length > 0) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (productId) => {
    navigate(`/inventory/products/update/${productId}`);
    setSearchResults([]);
    setSearchInput('');
  };

  return (
    <>
      <div className="bg-white flex items-center justify-between mb-4">
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
              value={searchInput}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleResultClick(product._id)}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
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
  );
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
    <div className="bg-white flex items-center justify-between px-4 mb-4">
      <h1 className="text-xl font-bold">Product Stock</h1>

      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        

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
      <h2 className="text-xl font-bold">Sales Report</h2>
      <div className="flex items-center space-x-4">
        {/* <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg">Date Range</button> */}
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