import React, {useState, useRef, useEffect} from 'react';
import logo from "../asset/logo.png" // Adjust the path to your logo image
import { useDispatch, useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/features/auth/authSlice';
import { useProfileMutation } from '../redux/api/usersApiSlice';
import profilePhoto from "../../../uploads/customerManagement/profilePhoto.png"; // Adjust the path to the user's profile photo
import toast from 'react-hot-toast';



// main home
export default function DefaultHeader() {
  return (
    <header className="bg-blue-900 text-white p-4 h-20 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          {/* <img src={logo} alt="Logo" className="h-8 w-8" /> */}
          <span className="text-2xl font-bold">JAYASINGHE STORLINES</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6 mr-32">
          <a href="/home" className="hover:text-yellow-400">HOME</a>
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


// Home Header
export function HomeHeader() {

  const [username, setUsername] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutUser, { isLoading }] = useProfileMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(userInfo){
      setUsername(userInfo.username);
    }

  }, [userInfo]);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logoutUser().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
      setTimeout(() => {
        navigate('/');
      },1000);
    } catch (error) {
      toast.error("Failed to logout");
    }
  } 
  return (
    <header className="bg-blue-900 text-white p-4 h-20">
      <div className="container mx-auto flex justify-between items-center -mt-3">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          {/* <img src={logo} alt="Logo" className="h-8 w-8" /> */}
          <span className="text-2xl font-bold">JAYASINGHE STORLINES</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <a href="/home" className="hover:text-yellow-400 ml-48">HOME</a>
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
          
          <span className="text-white text-2xl font-semibold -m-20">
            {username}
          </span>
        {/* <div className='w-32'></div> */}
        <div className="flex items-center ">
          <a href="profile"><button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-50 ml-10 -mr-20">Profile</button></a>
        </div>
        <div 
        
        className="flex items-center ">
          <a href="profile"><button onClick={handleLogout} className="bg-red-500 text-black px-4 py-2 rounded hover:bg-yellow-50">Logout</button></a>
        </div>
      </div>
    </header>
  );
}

// Profile Header
export function ProfileHeader() {

  const [username, setUsername] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo){
      setUsername(userInfo.username);
    }

  }, [userInfo]);

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
          <a href="/home" className="hover:text-yellow-400 ml-10">HOME</a>
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
          
          <span className="text-white text-2xl font-semibold -ml-48">{username}</span>

        
      </div>
    </header>
  );
}

// Register Header
export function RegisterHeader() {
  return (
    <header className="bg-blue-900 text-white p-4 h-20 ">
      <div className="container mx-auto flex justify-between items-center mt-1">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          {/* <img src={logo} alt="Logo" className="h-8 w-8" /> */}
          <span className="text-2xl font-bold">JAYASINGHE STORLINES</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6 ">
          <a href="/" className="hover:text-yellow-400 ">HOME</a>
          <a href="#" className="hover:text-yellow-400">STORE</a>
          <a href="#" className="hover:text-yellow-400">CATALOG</a>
          <a href="#" className="hover:text-yellow-400">MAP</a>
          <a href="#" className="hover:text-yellow-400">CONTACT</a>
        </nav>

        <div className="w-72"></div>
      </div>
    </header>
  );
}

// Login Header
export function LoginHeader() {
  return (
    <header className="bg-blue-900 text-white p-4 h-20 ">
      <div className="container mx-auto flex justify-between items-center mt-1">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold">JAYASINGHE STORLINES</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6 ">
          <a href="#" className="hover:text-yellow-400 ">HOME</a>
          <a href="#" className="hover:text-yellow-400">STORE</a>
          <a href="#" className="hover:text-yellow-400">CATALOG</a>
          <a href="#" className="hover:text-yellow-400">MAP</a>
          <a href="#" className="hover:text-yellow-400">CONTACT</a>
        </nav>

        <div className="w-72"></div>
      </div>
    </header>
  );
}

export function Adminheader() {
  return (
    <header className="bg-blue-900 text-white p-4 h-20 ">
      <div className="container mx-auto flex justify-between items-center mt-1">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          {/* <img src={logo} alt="Logo" className="h-8 w-8" /> */}
          <div className='w-96'></div>
          <div className='w-40'></div>
          <span className="text-2xl font-bold">JAYASINGHE STORLINES ADMIN LOGIN</span>
        </div>

        
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