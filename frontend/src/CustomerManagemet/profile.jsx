import React from 'react';
import 'tailwindcss/tailwind.css';
import profileBanner from '../../../uploads/customerManagement/profileUpdateBanner.jpg';
import './CusLogin.css'

export default function ProfileManagementPage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-gradient-slide">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Right Side - Profile Form */}
          <div className="w-1/2 p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Manage Your Profile</h1>
            </div>
            <form className="space-y-6">
              {/* Profile Information */}
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
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
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="payment" className="sr-only">Payment Method</label>
                <input
                  id="payment"
                  name="payment"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Payment Method"
                />
              </div>
              <div>
                <label htmlFor="address1" className="sr-only">Address Line 1</label>
                <input
                  id="address1"
                  name="address1"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Address Line 1"
                />
              </div>
              <div>
                <label htmlFor="address2" className="sr-only">Address Line 2</label>
                <input
                  id="address2"
                  name="address2"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Address Line 2"
                />

                <div className="flex space-x-4 mt-6">\
                    <button
                    type="submit"
                    className="flex-grow py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                    Update Profile
                    </button>
                </div>
              </div>

              {/* Password Section */}
              <div className="border-t pt-4 mt-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h2>
                <div>
                  <label htmlFor="old-password" className="sr-only">Old Password</label>
                  <input
                    id="old-password"
                    name="old-password"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                    placeholder="Old Password"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="sr-only">New Password</label>
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                    placeholder="New Password"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              {/* Buttons */}
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
            <img src={profileBanner} alt="Profile Management" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
