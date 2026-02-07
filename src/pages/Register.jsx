import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Register submitted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          autoComplete="new-name"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="new-email"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400"
          required
        />

        <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg w-full hover:bg-yellow-500 transition">
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
