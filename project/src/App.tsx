import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Cinemas from "./pages/Cinemas";
import Offers from "./pages/Offers";
import Login from "./pages/Login";

import SeatLayout from "./pages/SeatLayout";
import Payment from "./pages/Payment";
import BookingConfirmation from "./pages/BookingConfirmation";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/UserProfile"; // ✅ Import User Profile
import UpcomingMovies from "./pages/upcoming";
import ResetPassword from "./pages/ResetPassword";  // Import Forgot Password Page
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/upcoming" element={<UpcomingMovies />} />

          <Route path="/cinemas" element={<Cinemas />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* ✅ Profile Page (Only Accessible if Logged In) */}
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

          {/* ✅ Seat Selection is Open for All */}
          <Route path="/movie/:id/seats" element={<SeatLayout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Add this Line */}


          {/* ✅ Payment & Booking Confirmation are Protected */}
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/booking-confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
