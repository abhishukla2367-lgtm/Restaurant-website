import React, { useState } from "react";

const reviewsData = [
  {
    name: "Rohit Verma",
    rating: 5,
    comment:
      "Authentic South Indian flavors. The dosa was crisp and the filter coffee was excellent.",
  },
  {
    name: "Ananya Iyer",
    rating: 3,
    comment:
      "Loved the ambience and taste. Sambhar was rich and very comforting.",
  },
  {
    name: "Vikram Patel",
    rating: 4,
    comment:
      "Food was good overall, but service was slightly slow during rush hours.",
  },
];

const Star = () => (
  <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.381-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.785.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.075 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
  </svg>
);

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
    setForm({ name: "", email: "", message: "" });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">
      {/* Contact Form */}
      <section className="bg-yellow-50 rounded-xl shadow p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            autoComplete="new-password"
            aria-autocomplete="none"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="new-password"
            readOnly
            onFocus={(e) => e.target.removeAttribute("readOnly")}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400"
            required
          />

          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            autoComplete="off"
            rows={5}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400"
            required
          />

          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition w-full"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Restaurant Info + Google Map */}
      <section className="max-w-5xl mx-auto space-y-6">
        <h3 className="text-2xl font-bold">Our Location</h3>
        <p>📍 123 Southern Street, CBD Belapur, Navi Mumbai</p>

        <div className="w-full h-64 rounded-xl overflow-hidden shadow">
          <iframe
            title="Southern Tales Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11611872047!2d72.74109855534745!3d19.062536453107355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6e04b2b4b1b%3A0xbdf1c2e3c3e7f9c7!2sCBD%20Belapur%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1686266674561!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Customer Reviews</h2>
          <p className="text-gray-600">Real experiences shared by our guests</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviewsData.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar */}
                <div className="h-12 w-12 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center text-lg">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {review.rating}.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed">“{review.comment}”</p>
            </div>
          ))}
        </div>

        {/* Review Submission */}
        <div className="bg-yellow-50 p-10 rounded-2xl shadow max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Share Your Experience
          </h3>

          {reviewSubmitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center font-medium">
              ✅ Thank you! Your review has been submitted
            </div>
          )}

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400"
              required
            />
            <textarea
              placeholder="Write your review..."
              rows={4}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400"
              required
            />

            {/* ⭐ Star Rating Input */}
            <div className="flex flex-col items-center mb-4">
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 cursor-pointer transition-colors ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.381-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.785.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.075 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-500 mt-2 text-sm">
                {rating
                  ? `You rated us ${rating} star${rating > 1 ? "s" : ""}`
                  : "Click to rate us!"}
              </p>
            </div>

            <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition w-full">
              Submit Review
            </button>
          </form>
        </div>
      </section>

      {/* Floating Call & WhatsApp Buttons */}
<div className="fixed bottom-6 right-6 flex space-x-4 z-50">
  {/* Call Now Button */}
  <button
    onClick={() => {
      alert("Call on this number:- +91 98765 43210");
      window.location.href = "tel:+919876543210";
    }}
    className="flex items-center gap-2 bg-yellow-400 text-black font-semibold px-5 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition"
  >
    {/* Phone Icon (standard) */}
    <svg
       xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.72 11.72 0 003.66.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.58 3.66 1 1 0 01-.21 1.11l-2.2 2.2z" />
    </svg>
    Call Now
  </button>

  {/* WhatsApp Button */}
  <a
    href="https://wa.me/919876543210"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 bg-green-500 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:bg-green-600 transition"
  >
    {/* Standard WhatsApp Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.52 3.48a11.89 11.89 0 00-16.78 16.78l-1.89 6.89 6.89-1.89a11.89 11.89 0 0016.78-16.78zM12 21.75a9.75 9.75 0 01-5.23-1.51l-.38-.23-4.28 1.17 1.17-4.28-.23-.38A9.75 9.75 0 1121.75 12a9.72 9.72 0 01-9.75 9.75z" />
      <path d="M16.05 13.93c-.26-.13-1.54-.76-1.78-.84-.24-.08-.42-.13-.6.13s-.69.84-.85 1.01-.31.19-.57.06a6.3 6.3 0 01-1.87-1.15 6.56 6.56 0 01-1.21-1.5c-.13-.24 0-.37.09-.49.09-.12.2-.31.3-.46.09-.15.12-.25.18-.41.06-.16.03-.3-.02-.41-.05-.12-.6-1.44-.82-1.97-.22-.52-.45-.45-.6-.46-.15 0-.33-.01-.51-.01s-.42.06-.64.31c-.22.25-.85.83-.85 2.03s.87 2.36.99 2.52c.12.16 1.72 2.62 4.16 3.67.58.25 1.03.4 1.38.51.58.18 1.11.15 1.53.09.47-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.12-.26-.19-.52-.32z" />
    </svg>
    WhatsApp
  </a>
</div>
</div>
  );
};

export default Contact;
