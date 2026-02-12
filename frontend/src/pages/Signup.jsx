import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosConfig"; 

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Task 1: Randomized IDs to confuse browser autofill engines
  const [fieldIds] = useState({
    nm: `n_${Math.random().toString(36).substring(7)}`,
    em: `e_${Math.random().toString(36).substring(7)}`,
    ps: `p_${Math.random().toString(36).substring(7)}`
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      /**
       * FIX: Changed "/auth/register" to "/register"
       * Your axios baseURL is already "http://localhost:5000/api/auth"
       */
      await API.post("/register", formData);
      
      // Task 4: Redirect to login on success
      navigate("/login", { 
        state: { message: "Registration successful! Please login to continue." } 
      });
    } catch (err) {
      // FIX: Ensure error message is a string to prevent React rendering crash
      const message = err.response?.data?.message || err.response?.data || "Registration failed.";
      setError(typeof message === 'object' ? JSON.stringify(message) : String(message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#1f1b16] p-5">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-[400px] rounded-xl border border-[#333] bg-white p-10 shadow-2xl"
        autoComplete="off"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-[#1f1b16]">Join Us</h2>
        
        {error && (
          <p className="mb-4 rounded bg-red-50 p-2.5 text-center text-sm text-red-600 border border-red-200">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="mb-1 block text-sm font-bold text-[#333]">Full Name</label>
          <input
            id={fieldIds.nm}
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-base text-black outline-none focus:border-[#f5c27a]"
            required
            autoComplete="off"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-bold text-[#333]">Email Address</label>
          <input
            id={fieldIds.em}
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-base text-black outline-none focus:border-[#f5c27a]"
            required
            autoComplete="off"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-bold text-[#333]">Password</label>
          <input
            id={fieldIds.ps}
            type="password"
            placeholder="Create a password"
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-base text-black outline-none focus:border-[#f5c27a]"
            required
            autoComplete="new-password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full rounded-md bg-[#f5c27a] p-3 font-bold text-[#1f1b16] transition-all duration-300 active:scale-95 ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#eab366]"
          }`}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="mt-5 text-center text-sm text-[#666]">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[#eab366] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
