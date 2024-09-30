import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import profileBanner from '../../../uploads/customerManagement/profileUpdateBanner.jpg';
import './CusLogin.css';
import toast from 'react-hot-toast';
import { setCredentials } from '../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useProfileMutation, useGetUsersQuery } from '../redux/api/usersApiSlice';


export default function ProfileManagementPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [NIC, setNIC] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [NICVersion, setNICVersion] = useState('10-digit');
  const [errors, setErrors] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data: users } = useGetUsersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username || '');
      setEmail(userInfo.email || '');
      setNIC(userInfo.NIC || '');
      setPhone(userInfo.phone || '');
      setAddress(userInfo.address || '');
    }
  }, [userInfo]);

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email must include an "@" symbol.',
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: '',
    }));
    return true;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }

    try {
      await updateProfile({ username, email, NIC, phone, address }).unwrap();
      dispatch(setCredentials({ ...userInfo, username, email, NIC, phone, address }));
      toast.success('Profile updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Please fill all the fields...',
      }));
      return;
    }

    if (oldPassword !== userInfo.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Old Password does not match...',
      }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'New password and confirm password do not match.',
      }));
      return;
    }

    try {
      await updateProfile({ password: newPassword }).unwrap();
      dispatch(setCredentials({ ...userInfo, password: newPassword }));
      toast.success('Password changed successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const handleNICChange = (e) => {
    const input = e.target.value;
    let formattedNIC = '';

    if (NICVersion === '10-digit') {
      formattedNIC = input.slice(0, 9).replace(/[^0-9]/g, '');
      if (input.length > 9) formattedNIC += 'v';
    } else {
      formattedNIC = input.slice(0, 12).replace(/[^0-9]/g, '');
    }

    setNIC(formattedNIC);
  };

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          // Log the full response for debugging
          const errorResponse = await response.json();
          console.error('Error response from server:', errorResponse);
          throw new Error(`Error deleting user: ${response.status} - ${errorResponse.message || response.statusText}`);
        }
  
        console.log(`User with ID ${userId} deleted successfully.`);
        navigate('/');
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert(`Error deleting user: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-gradient-slide">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-1/2 p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Manage Your Profile</h1>
            </div>
            <form className="space-y-6" onSubmit={handleUpdateProfile}>
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z]+$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm`}
                  placeholder="Email address"
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
              </div>
              {/* NIC */}
              <div>
                <label htmlFor="NIC-version" className="block text-sm font-medium text-gray-700">NIC Version</label>
                <select
                  id="NIC-version"
                  name="NIC-version"
                  value={NICVersion}
                  onChange={(e) => {
                    setNICVersion(e.target.value);
                    setNIC(''); // Reset NIC input when version changes
                  }}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="10-digit">10-Digit (Old)</option>
                  <option value="12-digit">12-Digit (New)</option>
                </select>
                <label htmlFor="NIC" className="block text-sm font-medium text-gray-700 mt-4">NIC</label>
                <input
                  id="NIC"
                  name="NIC"
                  type="text"
                  value={NIC}
                  onChange={handleNICChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${errors.NIC ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-md`}
                  placeholder={NICVersion === '10-digit' ? '123456789v' : '123456789012'}
                />
                {errors.NIC && <p className="text-red-600 text-sm">{errors.NIC}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="sr-only">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    let phoneInput = e.target.value.replace(/\D/g, '');

                    if (phoneInput.length > 0 && phoneInput.charAt(0) !== '0') {
                      phoneInput = '0' + phoneInput;
                    }

                    if (phoneInput.length > 10) {
                      phoneInput = phoneInput.slice(0, 10);
                    }

                    if (phoneInput.length > 3 && phoneInput.length <= 6) {
                      phoneInput = phoneInput.slice(0, 3) + ' ' + phoneInput.slice(3);
                    } else if (phoneInput.length > 6) {
                      phoneInput = phoneInput.slice(0, 3) + ' ' + phoneInput.slice(3, 6) + ' ' + phoneInput.slice(6);
                    }

                    setPhone(phoneInput);
                  }}
                  maxLength={12} 
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label htmlFor="address" className="sr-only">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={address || ''}  // Ensure fallback to empty string
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Address"
                />
              </div>
              <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Profile
                </button>
            </form>
            
            <form className="space-y-6" onSubmit={handleChangePassword}>
              {/* Old Password */}
              <div className="relative">
                <label htmlFor="oldPassword" className="sr-only">Old Password</label>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="appearance-none mt-5 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Old Password"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              {/* New Password */}
              <div className="relative">
                <label htmlFor="newPassword" className="sr-only">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="New Password"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Confirm Password"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}

              <div>
                <button
                  type="submit"
                  className="flex-grow py-2 px-4 w-full border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Change Password
                </button>
              </div>
            </form>
            
            <div>
                <button
                  type="submit"
                  className="flex-grow mt-5 py-2 px-4 w-full border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => handleDeleteUser(userInfo._id)}
                >
                  Delete Account
                </button>
              </div>
          </div>
          <div className="w-1/2">
            <img
              src={profileBanner}
              alt="Profile Management Banner"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
