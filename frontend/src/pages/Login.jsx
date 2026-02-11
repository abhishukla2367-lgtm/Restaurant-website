import React, { useState, useContext, useMemo } from "react"; // Added useMemo
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../api/axiosConfig"; 
import { AuthContext } from "../context/AuthContext"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Task 1: Generate stable unique IDs once per mount
  const fieldIds = useMemo(() => ({
    user: `u_${Math.random().toString(36).substring(7)}`,
    pass: `p_${Math.random().toString(36).substring(7)}`
  }), []);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Safety check: ensure fields aren't empty
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Task 5: POST to MongoDB Atlas backend
      const res = await API.post("/auth/login", { email, password });
      
      if (res.data.token) {
        login(res.data.user, res.data.token);
        // Task 4: Redirect back to previous page
        navigate(from, { replace: true }); 
      }
    } catch (err) {
      // Task 5: Catch 401 Unauthorized errors
      const message = err.response?.data?.message || "Invalid email or password.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#1f1b16] p-5">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-[400px] rounded-xl border border-[#333] bg-white p-10 shadow-2xl"
        autoComplete="new-password"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-[#1f1b16]">Welcome Back</h2>
        
        {error && (
          <p className="mb-4 rounded bg-[#fdecea] p-2.5 text-center text-sm text-[#e74c3c] border border-red-200">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="mb-1 block text-sm font-bold text-[#333]">Email Address</label>
          <input
            id={fieldIds.user}
            name={fieldIds.user}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Task 1: Disables typical browser suggestions
            autoComplete="one-time-code"
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-base text-black outline-none transition-colors focus:border-[#f5c27a]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-bold text-[#333]">Password</label>
          <input
            id={fieldIds.pass}
            name={fieldIds.pass}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-base text-black outline-none transition-colors focus:border-[#f5c27a]"
            required
          />
        </div>

        <div className="mb-4 text-right">
          <Link to="/forgot-password" className="text-sm font-semibold text-[#eab366] hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`mt-2.5 w-full rounded-md bg-[#f5c27a] p-3 font-bold text-[#1f1b16] transition-all duration-300 active:scale-95 ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#eab366]"
          }`}
        >
          {isLoading ? "Authenticating..." : "Login"}
        </button>

        <p className="mt-5 text-center text-sm text-[#666]">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-[#eab366] hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
