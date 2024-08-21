import React from 'react';
import 'tailwindcss/tailwind.css';
// import loginImage from '../../../uploads/customerManagement/oven.jpeg'; // Replace with your actual image path

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-md rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Login to Your Account</h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
                placeholder="Username"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Login
            </button>
          </div>
          <div className="text-center text-sm text-gray-600">
            <a href="/register" className="font-medium text-red-600 hover:text-red-500">
              Don't have an account? Register
            </a>
          </div>
        </form>
      </div>
      <div className="hidden md:block w-1/2">
        {/* <img src={loginImage} alt="Login" className="h-full w-full object-cover" /> */}
      </div>
    </div>
  );
}
