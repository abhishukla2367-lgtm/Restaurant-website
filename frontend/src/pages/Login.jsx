import React, { useState, useContext, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../api/axiosConfig"; 
import { AuthContext } from "../context/AuthContext"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  /**
   * TASK FIX: Redirect to Home ("/") by default.
   * Requirement: Don't show profile page instantly after successful login.
   */
  const from = location.state?.from?.pathname || "/";

  // Unique IDs to bypass browser autofill engines
  const fieldIds = useMemo(() => ({
    user: `u_${Math.random().toString(36).substring(7)}`,
    pass: `p_${Math.random().toString(36).substring(7)}`
  }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Task 5: Backend integration using MongoDB Atlas
      const res = await API.post("/auth/login", { email, password });
      
      // Match the key "accessToken" used in your backend response
      if (res.data.token || res.data.accessToken) {
        const token = res.data.token || res.data.accessToken;
        
        // Destructure to separate token from user data for AuthContext
        const { token: _, accessToken: __, ...userData } = res.data;
        
        // Update global Auth state (Task 3: Toggles Navbar icons)
        login(userData, token);
        
        // Task 4: Redirect to Home (or the page they were trying to access)
        navigate(from, { replace: true }); 
      }
    } catch (err) {
      // Professional error handling: Displays backend validation messages
      const errMsg = err.response?.data?.message || "Invalid email or password.";
      setError(typeof errMsg === 'object' ? "An error occurred. Please try again." : errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#fcfaf8] p-5">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-[400px] rounded-2xl border border-gray-200 bg-white p-10 shadow-xl"
        autoComplete="off"
      >
        <h2 className="mb-6 text-center text-3xl font-extrabold text-[#1f1b16]">Welcome Back</h2>
        
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label className="mb-2 block text-sm font-bold text-gray-700">Email Address</label>
          <input
            id={fieldIds.user}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            placeholder="name@example.com"
            className="w-full rounded-xl border border-gray-300 bg-white p-3.5 text-black outline-none transition-all focus:border-[#f5c27a] focus:ring-2 focus:ring-[#f5c27a]/20"
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700">Password</label>
          <input
            id={fieldIds.pass}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-gray-300 bg-white p-3.5 text-black outline-none transition-all focus:border-[#f5c27a] focus:ring-2 focus:ring-[#f5c27a]/20"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full rounded-xl bg-[#f5c27a] p-4 font-bold text-[#1f1b16] shadow-md transition-all ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#eab366] active:scale-[0.98]"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin text-[#1f1b16]" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : "Login"}
        </button>

        <div className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-[#eab366] hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
