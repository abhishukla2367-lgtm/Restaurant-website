import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";

const navItems = [
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "reservation", label: "Reservation" },
  { id: "contact", label: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const headerHeight = 64; // Tailwind h-16 = 64px

  const goToSection = (id) => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-yellow-100 shadow-md h-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-full">
        <div
          onClick={() => goToSection("home")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img src={logo} alt="Southern Tales Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold text-yellow-900">Southern Tales</span>
        </div>

        <nav className="hidden md:flex gap-8 text-yellow-900 font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goToSection(item.id)}
              className="hover:text-orange-600 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-2xl text-yellow-900 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-yellow-50 px-6 py-4 space-y-4 shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goToSection(item.id)}
              className="block w-full text-left focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
