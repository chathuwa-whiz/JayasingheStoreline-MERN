import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import googleIcon from '../../../uploads/customerManagement/googleIcon.png';
import loginBanner from '../../../uploads/customerManagement/LoginBanner.jpg';
import './CusLogin.css';
import { useLoginMutation } from '../redux/api/usersApiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../redux/features/auth/authSlice';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, {isLoading}] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();

      // Save user data to Redux store
      dispatch(setCredentials(userData));

      // Redirect to the home page or dashboard after successful login
      navigate('/profile');
    } catch (err) {
      console.log(err?.data?.message || 'Login failed. Please try again.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-slide">
      <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2">
          <img src={loginBanner} alt="Login" className="object-cover w-full h-full" />
        </div>
        {/* Right Side - Login Form */}
        <div className="w-1/2 p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Jayasinghe Storeline's Login Portal</h1>
          </div>
          <form className="space-y-6">
            <div className="rounded-md shadow-sm space-y-4 mt-16">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
                  placeholder="Username"
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
                onClick={handleSubmit}
                disabled={isLoading}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
            <div>
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                <img src={googleIcon} alt="Google" className="h-5 w-5 mr-2" />
                Login with Google
              </button>
            </div>
            <div className="text-center text-sm text-gray-600 mt-4">
              <a href="/register" className="font-medium text-red-600 hover:text-red-500">
                Don't have an account? Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

