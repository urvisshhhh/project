import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import UpcomingMovies from "./pages/upcoming";
import Cinemas from "./pages/Cinemas";
import Offers from "./pages/Offers";

import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import SeatLayout from "./pages/SeatLayout";
import Payment from "./pages/Payment";
import BookingConfirmation from "./pages/BookingConfirmation";

import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />

          <Route path="/upcoming" element={<UpcomingMovies />} />
          <Route path="/cinemas" element={<Cinemas />} />
          <Route path="/offers" element={<Offers />} />


          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-confirmation"
            element={
              <ProtectedRoute>
                <BookingConfirmation />
              </ProtectedRoute>
            }
          />

          {/* Seat Layout route under Cinemas */}
          <Route path="/seats/:id" element={<SeatLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
