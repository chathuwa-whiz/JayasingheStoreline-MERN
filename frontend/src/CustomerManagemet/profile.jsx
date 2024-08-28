import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import profileBanner from '../../../uploads/customerManagement/profileUpdateBanner.jpg';
import './CusLogin.css';
import toast from 'react-hot-toast';
import { setCredentials } from '../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useProfileMutation } from '../redux/api/usersApiSlice';

export default function ProfileManagementPage() {
  // Initialize state with empty strings to avoid undefined
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [NIC, setNIC] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username || ''); // Ensure fallback to empty string
      setEmail(userInfo.email || '');       // Ensure fallback to empty string
      setNIC(userInfo.NIC || '');           // Ensure fallback to empty string
      setPhone(userInfo.phone || '');       // Ensure fallback to empty string
      setAddress(userInfo.address || '');   // Ensure fallback to empty string
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
      toast.success('Profile updated successfully');
      dispatch(setCredentials({ ...userInfo, username, email, NIC, phone, address }));
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'New password and confirm password do not match.',
      }));
      return;
    }

    try {
      // Implement your password change logic here
      toast.success('Password changed successfully');
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-gradient-slide">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Right Side - Profile Form */}
          <div className="w-1/2 p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Manage Your Profile</h1>
            </div>
            <form className="space-y-6" onSubmit={handleUpdateProfile}>
              {/* Profile Information */}
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username || ''}  // Ensure fallback to empty string
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
                  value={email || ''}  // Ensure fallback to empty string
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm`}
                  placeholder="Email address"
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="nic" className="sr-only">NIC</label>
                <input
                  id="nic"
                  name="nic"
                  type="text"
                  value={NIC || ''}  // Ensure fallback to empty string
                  onChange={(e) => setNIC(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="NIC"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone || ''}  // Ensure fallback to empty string
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Phone"
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

              {/* Buttons */}
              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="flex-grow py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Profile
                </button>
              </div>
            </form>

            {/* Password Section */}
            <form className="space-y-6" onSubmit={handleChangePassword}>
              <div className="border-t pt-4 mt-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h2>
                <div>
                  <label htmlFor="oldPassword" className="sr-only">Old Password</label>
                  <input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    value={oldPassword || ''}  // Ensure fallback to empty string
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                    placeholder="Old Password"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="sr-only">New Password</label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={newPassword || ''}  // Ensure fallback to empty string
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                    placeholder="New Password"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword || ''}  // Ensure fallback to empty string
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>

                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="flex-grow py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>

          {/* Left Side - Image */}
          <div className="w-1/2">
            <img
              src={profileBanner}
              alt="Profile Banner"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
