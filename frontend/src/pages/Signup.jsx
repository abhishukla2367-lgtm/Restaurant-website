import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosConfig"; // Task 5: Connection to Backend

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Task 1 & 5: Advanced Autocomplete Protection using randomized IDs
  const [fieldIds] = useState({
    nm: `nm_${Math.random().toString(36).substring(7)}`,
    em: `em_${Math.random().toString(36).substring(7)}`,
    ps: `ps_${Math.random().toString(36).substring(7)}`
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Task 5: Store user data in MongoDB Atlas via Backend API
      await API.post("/auth/register", formData);
      
      // Task 4 & 5: Redirect to login so user can authenticate and access protected routes
      navigate("/login", { 
        state: { message: "Registration successful! Please login to continue." } 
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#1f1b16] p-5">
      {/* Task 1: Professional consistent design */}
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-[400px] rounded-xl border border-[#333] bg-white p-10 shadow-2xl"
        autoComplete="new-password"
      >
        {/* Anti-Autofill Honeypot */}
        <input style={{ display: 'none' }} type="text" name="prevent_autofill" />
        <input style={{ display: 'none' }} type="password" name="password_autofill" />

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
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-base text-black outline-none transition-colors focus:border-[#f5c27a]"
            required
            readOnly // Strict Autocomplete Fix
            onFocus={(e) => e.target.removeAttribute('readonly')}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-bold text-[#333]">Email Address</label>
          <input
            id={fieldIds.em}
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-base text-black outline-none transition-colors focus:border-[#f5c27a]"
            required
            autoComplete="one-time-code"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-bold text-[#333]">Password</label>
          <input
            id={fieldIds.ps}
            type="password"
            placeholder="Create a password"
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-base text-black outline-none transition-colors focus:border-[#f5c27a]"
            required
            autoComplete="new-password"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
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

        {/* Task 3 & 4 Navigation Support */}
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
