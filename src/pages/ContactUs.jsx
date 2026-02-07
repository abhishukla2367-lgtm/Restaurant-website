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
  <svg
    className="w-5 h-5 fill-yellow-400"
    viewBox="0 0 20 20"
  >
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
  name="contact_name_fake"
  placeholder="Name"
  value={form.name}
  onChange={handleChange}
  autoComplete="new-password"
  aria-autocomplete="none"
  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400"
  required
/>


          {/* Email without browser autocomplete */}
          <input
  type="email"
  name="contact_email_fake"
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
        <p>📞 +91 98765 43210</p>

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
    <p className="text-gray-600">
      Real experiences shared by our guests
    </p>
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
            <h4 className="font-semibold text-gray-900">
              {review.name}
            </h4>
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
        <p className="text-gray-700 leading-relaxed">
          “{review.comment}”
        </p>
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
      <button
        className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition w-full"
      >
        Submit Review
      </button>
    </form>
  </div>
</section>
</div>
  );
};

export default Contact;
