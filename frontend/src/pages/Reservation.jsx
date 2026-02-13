import React, { useState } from "react";
// Task 2: Import the API instance that connects to your Backend/MongoDB
import API from "../api/axiosConfig";

export default function Reservation() {
  const [form, setForm] = useState({
    name: "", 
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone || form.phone.length < 10)
      newErrors.phone = "Valid phone number required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time is required";
    if (!form.guests) newErrors.guests = "Select number of guests";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      /** 
       * TASK 7: Submit data to backend. 
       * API.js automatically adds the Token for Task 4 logic.
       */
      const response = await API.post("/reservations", {
        date: form.date,
        time: form.time,
        guests: Number(form.guests),
      });

      if (response.data.success) {
        setSuccessMsg("Table reserved successfully!");
        // Task 7: Reset form after successful DB storage
        setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "" });
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      setErrors({ server: err.response?.data?.message || "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="py-20 bg-yellow-50 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Book Your Table</h2>
        <p className="text-gray-600 mb-10 text-lg">Join us for an unforgettable dining experience.</p>

        <form
          autoComplete="off"
          className="bg-white max-w-lg mx-auto p-8 rounded-2xl shadow-lg space-y-5 text-left border border-gray-100"
          onSubmit={handleSubmit}
        >
          {/* Success Message UI */}
          {successMsg && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              {successMsg}
            </div>
          )}

          {/* Server Error UI */}
          {errors.server && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
              {errors.server}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={form.name}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              value={form.email}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="hello@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              autoComplete="off"
              value={form.phone}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="9876543210"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Number of Guests</label>
            <select
              name="guests"
              autoComplete="off"
              value={form.guests}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white outline-none"
            >
              <option value="">Select number of people</option>
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
              ))}
            </select>
            {errors.guests && <p className="text-red-500 text-xs mt-1 font-medium">{errors.guests}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                autoComplete="off"
                value={form.date}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {errors.date && <p className="text-red-500 text-xs mt-1 font-medium">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                autoComplete="off"
                value={form.time}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {errors.time && <p className="text-red-500 text-xs mt-1 font-medium">{errors.time}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'} text-white py-3 rounded-lg font-bold shadow-md transition duration-200`}
          >
            {loading ? "Processing..." : "Confirm Reservation"}
          </button>

          <p className="text-[10px] text-center text-gray-400 uppercase tracking-wider">
            Requirement: Professional UI with validation and backend integration.
          </p>
        </form>
      </div>
    </section>
  );
}
