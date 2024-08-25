import React from 'react';
import 'tailwindcss/tailwind.css';
import googleIcon from '../../../uploads/customerManagement/googleIcon.png';
import registerBanner from '../../../uploads/customerManagement/regBanner.jpg';
import './register.css';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-gradient-slide">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Right Side - Register Form */}
          <div className="w-1/2 p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Jayasinghe Storelines Register Portal</h1>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="sr-only">Firstname</label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                    placeholder="Firstname"
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="sr-only">Lastname</label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                    placeholder="Lastname"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
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
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="address" className="sr-only">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Address"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  Accept terms and conditions
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Register
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  <img src={googleIcon} alt="Google" className="h-5 w-5 mr-2" />
                  Register with Google
                </button>
              </div>
              <div className="text-center text-sm text-gray-600 mt-4">
                <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Already have an account? Login
                </a>
              </div>
            </form>
          </div>
          {/* Left Side - Image */}
          <div className="w-1/2">
            <img src={registerBanner} alt="Register" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
