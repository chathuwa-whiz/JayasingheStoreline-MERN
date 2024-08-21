import React from 'react';
import 'tailwindcss/tailwind.css';
// import registerImage from '../../../uploads/customerManagement/register-image.jpg'; // Replace with your actual image path

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-md rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="sr-only">Firstname</label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
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
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
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
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
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
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
              placeholder="Phone"
            />
          </div>
          <div>
            <label htmlFor="address" className="sr-only">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
              placeholder="Address"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              Accept terms and conditions
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Register
            </button>
          </div>
          <div className="text-center text-sm text-gray-600">
            <a href="/login" className="font-medium text-red-600 hover:text-red-500">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
      <div className="hidden md:block w-1/2">
        {/* <img src={registerImage} alt="Register" className="h-full w-full object-cover" /> */}
      </div>
    </div>
  );
}
