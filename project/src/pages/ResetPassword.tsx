import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false); // ✅ success flag
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    if (!email) {
      setMessage("Invalid request. Please try again.");
      setSuccess(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setSuccess(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setSuccess(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        password,
      });

      setMessage(data.message);
      setSuccess(true); // ✅ Mark success
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Failed to reset password. Try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center">Reset Password</h2>
        {message && (
          <p
            className={`text-center mb-4 ${
              success ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
        <form className="space-y-6 mt-4" onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-md"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 py-3 rounded-md hover:bg-yellow-400 disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
