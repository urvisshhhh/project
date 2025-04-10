import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // ✅ Prevent empty or invalid email submissions
    if (!email) {
      setMessage("Invalid request. Please try again.");
      return;
    }

    // ✅ Validate OTP format (Only 6 digits allowed)
    if (!/^\d{6}$/.test(otp)) {
      setMessage("OTP must be a 6-digit number.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });

      setMessage(data.message);

      // ✅ Navigate to Reset Password if OTP is correct
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center">Verify OTP</h2>
        <p className="text-gray-400 text-center mt-2">Enter the OTP sent to your email</p>

        <form className="space-y-6 mt-4" onSubmit={handleVerify}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // ✅ Remove non-numeric characters
                if (value.length <= 6) setOtp(value);
              }}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter OTP"
              required
              maxLength={6}
              pattern="\d{6}"
              inputMode="numeric"
            />
          </div>

          {message && (
            <p className={`text-sm text-center ${message.includes("success") ? "text-green-400" : "text-yellow-400"}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className={`w-full text-black font-semibold py-3 rounded-md transition ${
              loading ? "bg-yellow-300 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-400"
            }`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
