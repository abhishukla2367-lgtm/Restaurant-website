import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Thank you, ${form.name}! We received your message.`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded"/>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded"/>
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} className="border p-2 rounded"/>
        <button type="submit" className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 transition">Send</button>
      </form>
    </div>
  );
};

export default Contact;
