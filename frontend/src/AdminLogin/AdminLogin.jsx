import React, { useState } from 'react';
import adminBanner from '../../../uploads/AdminLogin/adminBaner.jpg';
import {useNavigate} from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(email === 'chathushka@gmail.com' && password === '2024'){
        navigate('/inventory');
      }
    } catch (err) {
      console.log(err?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-slide">
      <div className="flex max-w-4xl w-full h-96 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2">
          <img src={adminBanner} alt="Admin Login" className="object-cover w-full h-full" />
        </div>
        {/* Right Side - Login Form */}
        <div className="w-1/2 p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Login Portal</h1>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4 mt-16">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Admin Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}