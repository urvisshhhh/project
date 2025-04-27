import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone } from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]{2,}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!isLogin) {
      if (!formData.fullName.trim()) {
        alert("Full Name is required.");
        return false;
      }
      if (!nameRegex.test(formData.fullName)) {
        alert("Full Name must contain only alphabets and at least 2 characters.");
        return false;
      }
      if (!formData.phone.trim()) {
        alert("Phone number is required.");
        return false;
      }
      if (!phoneRegex.test(formData.phone)) {
        alert("Phone number must be exactly 10 digits.");
        return false;
      }
    }

    if (!formData.email.trim()) {
      alert("Email address is required.");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!formData.password.trim()) {
      alert("Password is required.");
      return false;
    }
    if (formData.password.length < 6 || formData.password.length > 8) {
      alert("Password must be between 6 to 8 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const { data } = await axios.post(url, formData);

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login Successful!");
        navigate(location.state?.from || "/profile");
      } else {
        alert("Registration Successful! You can now log in.");
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong, please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col bg-gray-900">
      <div className="flex-grow flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-400 mt-2">
              {isLogin
                ? "Sign in to access your account"
                : "Join us for the best experience"}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Your name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="1234567890"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="••••••"
                />
              </div>
              {isLogin && (
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-yellow-400 hover:text-yellow-300 text-sm"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-300 transition"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-400 hover:text-yellow-300 text-sm"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
