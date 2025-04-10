import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// ✅ Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Returns true if token exists
};

// ✅ Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoute;
