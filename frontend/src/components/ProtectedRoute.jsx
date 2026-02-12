import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Requirement #4: Access Control Wrapper
 * Login is required only for: Reserving table & Ordering food.
 */
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext); 
  const location = useLocation();

  // Task 1: Professional Design - Smooth loading state to prevent UI flicker
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1f1b16]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#f5c27a] border-t-transparent"></div>
        <p className="ml-3 text-[#f5c27a] font-semibold">Verifying Session...</p>
      </div>
    );
  }

  // Task 4: Redirect unauthenticated users to /login
  // We save the 'from' location so users are sent back to where they were after login
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Task 6: Authorized access to Profile, My Orders, and Reservations
  return children;
};

export default ProtectedRoute;
