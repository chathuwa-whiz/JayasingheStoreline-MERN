import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import loginBanner from "../../../uploads/customerManagement/LoginBanner.jpg";
import "./CusLogin.css";
import { useLoginMutation } from "../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "../redux/features/auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.isLoggedIn) {
      navigate("/home");
    }
    // Check for remembered email
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData }));
      setLoginSuccess("Login successful! Redirecting...");
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      console.log(err?.data?.message || "Login failed. Please try again.");
      setLoginError(err?.data?.message || "Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    const { email, name } = jwtDecode(credentialResponse.credential);
    console.log("Google Login Success:", credentialResponse);
    
    // Store name and email in cookies
    Cookies.set("userName", name, { expires: 7 }); // expires in 7 days
    Cookies.set("userEmail", email, { expires: 7 });

    // Optional: Dispatch user info to the store and navigate
    dispatch(setCredentials({ email, name })); // Adjust as needed
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-slide">
      <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2">
          <img
            src={loginBanner}
            alt="Login"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Jayasinghe Storeline's Login Portal
            </h1>
          </div>
          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{loginError}</span>
            </div>
          )}
          {loginSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{loginSuccess}</span>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4 mt-16">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            <div className="text-center text-sm text-gray-600 mt-4">
              <Link
                to="/register"
                className="font-medium text-red-600 hover:text-red-500"
              >
                Don't have an account? Register
              </Link>
            </div>
            <div className="text-center text-sm text-gray-600 mt-4">
              <Link
                to="/adminlogin"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                If you are an Admin? Click Here.
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}