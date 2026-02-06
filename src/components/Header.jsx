import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Phone, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const navItems = [
  { id: "home", label: "Home", type: "scroll" },
  { id: "menu", label: "Menu", type: "page", path: "/menu" },
  { id: "about", label: "About", type: "page", path: "/about" },
  { id: "gallery", label: "Gallery", type: "page", path: "/gallery" },
  { id: "reservation", label: "Reservation", type: "page", path: "/reservation" },
  { id: "contact", label: "Contact", type: "scroll" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (item) => {
    setIsOpen(false);
    if (item.type === "page") {
      navigate(item.path);
      return;
    }
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 👉 WRITE IT HERE
  const handleCall = () => {
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

    if (!isMobile) {
      window.alert("Call us at +91 98765 43210");
      return;
    }

    window.location.href = "tel:+919876543210";
  };

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
  className={`fixed top-0 w-full z-50 pointer-events-auto transition-colors duration-300 ${
    isOpen ? "bg-[#3B241B]/90 backdrop-blur-xl" : "bg-[#3B241B]/70 backdrop-blur-xl"
  }`}
>

      
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => handleNavClick({ id: "home", type: "scroll" })}
              className="text-yellow-300 font-bold text-xl cursor-pointer"
            >
              Southern Tales
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6 flex-1 justify-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="text-yellow-200 hover:text-orange-400 transition font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => navigate("/cart")} className="relative text-yellow-200">
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5">
                  {totalItems}
                </span>
              </button>

              <button
  onClick={handleCall}
  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1.5 text-black font-semibold hover:bg-yellow-300 transition"
>
  <Phone size={16} /> Call Now
</button>


            </div>

            {/* Mobile Hamburger */}
            <button onClick={() => setIsOpen(true)} className="md:hidden text-3xl text-yellow-200">
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#3B241B] z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={28} className="text-yellow-200" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 px-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className="text-yellow-200 text-lg text-left hover:text-orange-400"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-3 text-yellow-200 text-lg mt-4"
          >
            <ShoppingCart size={22} /> Cart ({totalItems})
          </button>

          <button
  onClick={handleCall}
  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1.5 text-black font-semibold hover:bg-yellow-300 transition"
>
  <Phone size={16} /> Call Now
</button>


        </nav>
      </div>

      {/* BACKDROP */}
           
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 pointer-events-auto"
        />
      )}
    </>
  );
};

export default Header;

