import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Film, Calendar, MapPin, Ticket, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-black/95 text-white fixed w-full z-50 border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo & Links */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-gold">CINECRAZE</span>
            </Link>
            <div className="hidden lg:flex items-center space-x-8">
              <NavItem to="/movies" icon={<Film className="w-4 h-4" />} text="Now Showing" />
              <NavItem to="/upcoming" icon={<Calendar className="w-4 h-4" />} text="Upcoming" />
              <NavItem to="/cinemas" icon={<MapPin className="w-4 h-4" />} text="Cinemas" />
             
            </div>
          </div>

          {/* Right Side - Profile & Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center space-x-2 bg-gold/20 hover:bg-gold/30 text-gold px-4 py-2 rounded-md transition"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-gold/20 hover:bg-gold/30 text-gold px-4 py-2 rounded-md transition"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-gold transition"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 border-b border-gold/20">
          <div className="px-4 py-2 space-y-2">
            <MobileNavItem to="/movies" icon={<Film className="w-4 h-4" />} text="Now Showing" />
            <MobileNavItem to="/upcoming" icon={<Calendar className="w-4 h-4" />} text="Upcoming" />
            <MobileNavItem to="/cinemas" icon={<MapPin className="w-4 h-4" />} text="Cinemas" />

            {/* Profile for Mobile */}
            {isLoggedIn ? (
              <MobileNavItem to="/profile" icon={<User className="w-4 h-4" />} text="Profile" />
            ) : (
              <MobileNavItem to="/login" icon={<User className="w-4 h-4" />} text="Login" />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <Link to={to} className="flex items-center space-x-2 text-gray-300 hover:text-gold transition">
    {icon}
    <span>{text}</span>
  </Link>
);

const MobileNavItem = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <Link to={to} className="flex items-center space-x-2 text-gray-300 hover:text-gold transition py-2">
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;
