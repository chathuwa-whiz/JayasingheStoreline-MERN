import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { token } = useParams(); // Use useParams to get the token from the URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');
    console.log('Token:', token);
    console.log('New Password:', newPassword);
    console.log('Reset password URL:', `http://localhost:4000/api/users/reset-password/${token}`);
    
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      console.log('Sending request to reset password');
      const response = await fetch(`http://localhost:4000/api/users/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setMessage('Password reset successfully. Redirecting to login...');
        setTimeout(() => navigate('/customerlogin'), 3000);
      } else {
        setMessage(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      console.error('Error details:', error.message, error.stack);
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-slide">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="new-password" className="sr-only">
                New Password
              </label>
              <input
                id="new-password"
                name="newPassword"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !token}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>

        {message && (
          <div className={`mt-4 text-center text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
