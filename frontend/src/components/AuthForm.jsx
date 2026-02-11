import React, { useState } from "react";

const AuthForm = ({ type = "login" }) => {
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${type} submitted!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">
          {type === "login" ? "Login" : type === "register" ? "Register" : "Forgot Password"}
        </h2>
        {type === "register" && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
          required
        />
        {type !== "forgot" && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
            required
          />
        )}
        <button className="w-full bg-yellow-400 text-black font-semibold p-3 rounded-lg hover:bg-yellow-500 transition">
          {type === "login" ? "Login" : type === "register" ? "Register" : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
