import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si"; // X icon

const Footer = () => {
  const links = [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#featured" },
    { label: "Reservation", href: "#reservation" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://facebook.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <SiX />, href: "https://x.com" }, // X icon
  ];

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Left: Logo + Description + Social */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Southern Tales</h3>
          <p className="mb-4">Authentic South Indian dining experience.</p>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-orange-400 text-xl transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Center: Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block w-full px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Working Hours */}
        <div>
          <h4 className="font-semibold text-white mb-3">Working Hours</h4>
          <p>Mon - Fri: 10:00 AM - 10:00 PM</p>
          <p>Sat - Sun: 9:00 AM - 11:00 PM</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm py-4 border-t border-gray-700">
        © {new Date().getFullYear()} Southern Tales. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
