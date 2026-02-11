import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// 1. IMPORT FIX: Verify your folder structure. 
// If Profile.jsx is in 'src/pages/', you likely need '../../assets/...' 
import profilePhoto from "../assets/images/profile/profile_photo.png"; 

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1f1b16] px-4">
        <p className="text-xl font-medium text-white">Please login to view profile.</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1f1b16] p-6">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl transition-all hover:shadow-orange-900/20">
        <div className="h-24 bg-gradient-to-r from-orange-400 to-red-500" />
        
        <div className="relative px-8 pb-8">
          <div className="relative -mt-12 mb-4 flex justify-center">
            <img
              className="h-24 w-24 rounded-full border-4 border-white bg-white object-cover shadow-md ring-2 ring-[#f5c27a]"
              // 2. LOGIC FIX: Use the imported 'profilePhoto' variable
              src={user.avatar || profilePhoto}
              alt={`${user.name || 'User'}'s profile`}
              // 3. FALLBACK FIX: If the imported file still isn't found, use a UI-Avatar
              onError={(e) => {
                e.target.src = "https://ui-avatars.com";
              }}
            />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
            <p className="mt-1 text-sm text-gray-500">Member since 2026</p>
          </div>

          <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-600">Email Address</span>
              <span className="text-gray-900">{user.email}</span>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-3 text-center text-sm italic text-gray-600">
              "Exploring the digital world, one component at a time."
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full transform rounded-xl bg-red-500 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600 active:scale-95 active:bg-red-700"
          >
            Logout Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
