import React, { useState } from "react";

const ReviewForm = () => {
  const [form, setForm] = useState({ name: "", email: "", review: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Review submitted! (UI only)");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-yellow-50 p-6 rounded-xl shadow max-w-lg mx-auto space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
        required
      />
      <textarea
        name="review"
        placeholder="Your Review"
        rows={4}
        value={form.review}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
        required
      />
      <button className="w-full bg-yellow-400 text-black font-semibold p-3 rounded-lg hover:bg-yellow-500 transition">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
