import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              ></textarea>
            </div>
            <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition">
              Send Message
            </button>
          </form>
        </div>

        {/* Address + Map */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">Our Address</h3>
            <p>123 Food Street, Gourmet City, India</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: contact@restaurant.com</p>
          </div>
          <div className="overflow-hidden rounded-lg shadow-md h-64">
            <iframe
              title="restaurant-location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902946071763!2d90.3691!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzQwLjgiTiA5MMKwMjInMzUuMCJF!5e0!3m2!1sen!2sin!4v1679966767635!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Testimonials / Reviews */}
      <section className="mt-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["John Doe", "Jane Smith", "Alex Johnson"].map((name, i) => (
            <div key={i} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <svg
                        key={idx}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09L5.24 12.18 0 7.91l6.061-.88L10 2.5l3.939 4.53L20 7.91l-5.24 4.27 1.118 5.91z" />
                      </svg>
                    ))}
                </div>
              </div>
              <p className="text-gray-700 mb-2">
                "Excellent food and service! Highly recommended."
              </p>
              <h4 className="font-semibold">{name}</h4>
            </div>
          ))}
        </div>

        {/* Review Submission Form */}
        <div className="mt-12 bg-white shadow-md rounded-lg p-8 max-w-xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Submit Your Review</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            <textarea
              rows="4"
              placeholder="Your Review"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            ></textarea>
            <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition">
              Submit Review
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
