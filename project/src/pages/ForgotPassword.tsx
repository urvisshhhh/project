import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });

      setMessage(data.message);
      
      // Redirect to OTP verification page with email as a query parameter
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Failed to send OTP. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white text-center">Forgot Password</h2>
        <p className="text-gray-400 text-center mt-2">Enter your email to receive an OTP</p>
        
        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {message && <p className="text-yellow-400 text-sm text-center">{message}</p>}

          <button 
            type="submit" 
            className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-md hover:bg-yellow-400 transition"
          >
            Send OTP
          </button>

          <button 
            type="button"
            onClick={() => navigate("/login")} 
            className="w-full text-sm text-yellow-400 hover:text-yellow-300 mt-4"
          >
            Back to Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
