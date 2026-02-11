import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosConfig"; 
import { AuthContext } from "../context/AuthContext"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data.token) {
        login(res.data.user, res.data.token);
        navigate("/");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Server unreachable. Check backend terminal.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#1f1b16] p-5">
      {/* 1. Autocomplete Fix: Using hidden inputs to "trap" browser autofill */}
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-[400px] rounded-xl border border-[#333] bg-white p-10 shadow-2xl" 
        autoComplete="off"
      >
        <input type="text" name="prevent_autofill" className="hidden" tabIndex="-1" />
        <input type="password" name="password_autofill" className="hidden" tabIndex="-1" />

        <h2 className="mb-5 text-center text-2xl font-bold text-[#1f1b16]">Welcome Back</h2>
        
        {error && (
          <p className="mb-4 rounded bg-[#fdecea] p-2.5 text-center text-sm text-[#e74c3c]">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="mb-1 block text-sm font-bold text-[#333]">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-base text-black outline-none transition-colors focus:border-[#f5c27a]"
            required
            autoComplete="new-email-field"
            name={`user_email_${Math.floor(Math.random() * 1000)}`} 
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-bold text-[#333]">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-base text-black outline-none transition-colors focus:border-[#f5c27a]"
            required
            autoComplete="new-password"
            name={`user_password_${Math.floor(Math.random() * 1000)}`}
          />
        </div>

        {/* Forgot Password Link Integration */}
        <div className="mb-4 text-right">
          <Link 
            to="/forgot-password" 
            className="text-sm font-semibold text-[#eab366] hover:underline"
          >
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
