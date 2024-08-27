import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import googleIcon from '../../../uploads/customerManagement/googleIcon.png';
import registerBanner from '../../../uploads/customerManagement/regBanner.jpg';
import './register.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import  { useRegisterMutation } from '../redux/api/usersApiSlice';
import { setCredentials } from '../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';

export default function RegisterPage() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [NIC, setNIC] = useState('');
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [NICVersion, setNICVersion] = useState('10-digit');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, {isLoading, isError, isSuccess}] = useRegisterMutation();

  const handleNICChange = (e) => {
    let value = e.target.value;

    if (NICVersion === '10-digit') {
      // Allow only numbers and limit to 9 characters
      value = value.replace(/[^0-9]/g, '').slice(0, 9);
      setNIC(value + 'v');
    } else if (NICVersion === '12-digit') {
      // Allow only numbers and limit to 12 characters
      value = value.replace(/[^0-9]/g, '').slice(0, 12);
      setNIC(value);
    }
  }

  // Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateNIC = (NIC) => /(^\d{9}[vV]$)|(^\d{12}$)/.test(NIC);

  const handleSubmit = async (e) => {
    e.preventDefault();    

    // Check if terms are accepted
    if (!termsAccepted) {
      setError({ termsAccepted: 'Please accept the terms and conditions to proceed.' });
      return;
    }

    // Validate all inputs
    const errors = {};

    if (!validateEmail(email)) errors.email = 'Invalid email address format.';

    if (!validateNIC(NIC)) errors.NIC = 'NIC should be either 9 digits followed by "v" or 12 digits.';

    // If there are any errors, show them
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    // Prepare request payload
    const payload = {
      username,
      email,
      password,
      firstname,
      lastname,
      address,
      NIC,
      phone
    };

    console.log('Payload:', payload);

    try {
      const res = await register(payload).unwrap();
      dispatch(setCredentials({res}));
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/customerlogin');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed! Please try again.');
    }
    
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-gradient-slide">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex max-w-4xl w-full mt-20 mb-20 bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Right Side - Register Form */}
          <div className="w-1/2 p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Jayasinghe Storelines Register Portal</h1>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Firstname */}
                <div>
                  <label htmlFor="firstname" className="sr-only">Firstname</label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    required
                    onKeyPress={(e) => {
                      if (!/^[a-zA-Z]+$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      error.firstName ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm`}
                    placeholder="Firstname"
                  />
                  {error.firstName && <p className="text-red-600 text-sm">{error.firstName}</p>}
                </div>

                {/* Lastname */}
                <div>
                  <label htmlFor="lastname" className="sr-only">Lastname</label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    required
                    onKeyPress={(e) => {
                      if (!/^[a-zA-Z]+$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      error.lastName ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm`}
                    placeholder="Lastname"
                  />
                  {error.lastName && <p className="text-red-600 text-sm">{error.lastName}</p>}
                </div>
              </div>

              {/* Username */}
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
                  autoComplete="username"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    error.username ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm`}
                  placeholder="Username"
                />
                {error.username && <p className="text-red-600 text-sm">{error.username}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    error.email ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm`}
                  placeholder="Email address"
                />
                {error.email && <p className="text-red-600 text-sm">{error.email}</p>}
              </div>

              {/* Password with Toggle Visibility */}
              <div className="relative">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    error.password ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm`}
                  placeholder="Password"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.993 9.993 0 014.687-6.435M20.572 13.464a10.054 10.054 0 01-2.883 2.83M4.488 4.488l15.024 15.024"
                      />
                    </svg>
                  )}
                </div>
                {error.password && <p className="text-red-600 text-sm">{error.password}</p>}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="sr-only">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="address"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    error.address ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm`}
                  placeholder="Address"
                />
              </div>

              {/* NIC */}
              <div>
      <label htmlFor="NIC-version" className="block text-sm font-medium text-gray-700">
        NIC Version
      </label>
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

      <label htmlFor="NIC" className="block text-sm font-medium text-gray-700 mt-4">
        NIC
      </label>
      <input
        id="NIC"
        name="NIC"
        type="text"
        value={NIC}
        onChange={handleNICChange}
        required
        className={`mt-1 block w-full px-3 py-2 border ${error.NIC ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-md`}
        placeholder={NICVersion === '10-digit' ? '123456789v' : '123456789012'}
      />
      {error.NIC && <p className="text-red-600 text-sm">{error.NIC}</p>}
    </div>

              {/* Phone */}
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="sr-only">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    let phoneInput = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters

                    // Ensure the first digit is always "0"
                    if (phoneInput.length > 0 && phoneInput.charAt(0) !== '0') {
                      phoneInput = '0' + phoneInput;
                    }

                    if (phoneInput.length > 10) {
                      phoneInput = phoneInput.slice(0, 10); // Ensure the input doesn't exceed 10 digits
                    }

                    // Format as "xxx xxx xxxx"
                    if (phoneInput.length > 3 && phoneInput.length <= 6) {
                      phoneInput = phoneInput.slice(0, 3) + ' ' + phoneInput.slice(3);
                    } else if (phoneInput.length > 6) {
                      phoneInput = phoneInput.slice(0, 3) + ' ' + phoneInput.slice(3, 6) + ' ' + phoneInput.slice(6);
                    }

                    setPhone(phoneInput);
                  }}
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    error.phone ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm`}
                  placeholder="Phone (e.g., 071 234 5678)"
                />
                {error.phone && <p className="text-red-600 text-sm">{error.phone}</p>}
              </div>


              {/* Terms and Conditions */}
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I accept the terms and conditions
                </label>
              </div>
              {error.termsAccepted && <p className="text-red-600 text-sm">{error.termsAccepted}</p>}

              {/* Register Button */}
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Register
                </button>
              </div>

              {/* Google Login Button */}
              <div>
                <button
                  type="button"
                  className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <img src={googleIcon} alt="Google Icon" className="h-5 w-5" />
                  </span>
                  Continue with Google
                </button>
              </div>

              {/* Already have an account? Login */}
              <div className="text-sm">
                <a href="/customerlogin" className="font-medium text-blue-600 hover:text-blue-500">
                  Already have an account? Login
                </a>
              </div>
            </form>
          </div>

          {/* Left Side - Register Banner */}
          <div className="w-1/2">
            <img src={registerBanner} alt="Register Banner" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>

    </div>
  );
}
