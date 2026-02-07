import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Phone, Menu, X } from "lucide-react";
import logo from "../assets/images/logo/southern-tales-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = 0;

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* HEADER BAR */}
      <div
        className="
          flex items-center justify-between
          px-6 lg:px-12 py-4
          bg-[#1f1b16]
          shadow-lg
        "
      >
        {/* LEFT: LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Southern Tales" className="w-14 h-auto" />
          <span className="text-2xl font-bold text-white">
            Southern Tales
          </span>
        </Link>

        {/* CENTER: DESKTOP NAV */}
        <nav className="hidden lg:flex gap-8 font-medium text-gray-200">
          {[
            ["Home", "/"],
            ["Menu", "/menu"],
            ["About Us", "/about"],
            ["Gallery", "/gallery"],
            ["Reservation", "/reservation"],
            ["Contact", "/contactus"],
          ].map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className="hover:text-[#f5c27a] transition"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* RIGHT: ACTIONS */}
        <div className="hidden lg:flex items-center gap-4 text-white">
          {/* CALL NOW – message + mobile safe */}
          <button
            onClick={() =>
              alert("📞 Call on this number: +91 99999 99999")
            }
            className="
              flex items-center gap-2
              px-4 py-2 rounded-full
              border border-[#f5c27a]
              bg-white/10
              hover:bg-white/20
            "
          >
            <Phone size={16} />
            Call Now
          </button>

          {/* CART */}
          <button
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <ShoppingCart size={22} />
            <span
              className="
                absolute -top-2 -right-2
                w-5 h-5 rounded-full
                bg-[#f5c27a]
                text-black text-xs
                flex items-center justify-center
              "
            >
              {cartCount}
            </span>
          </button>

          <button
            onClick={() => navigate("/login")}
            className="
              px-4 py-2 rounded-full
              border border-[#f5c27a]
              text-white
            "
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="
              px-4 py-2 rounded-full
              bg-[#f5c27a]
              text-black
            "
          >
            Register
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-[#231a14] px-6 py-6 space-y-4 text-white">
          {[
            ["Home", "/"],
            ["Menu", "/menu"],
            ["About Us", "/about"],
            ["Gallery", "/gallery"],
            ["Reservation", "/reservation"],
            ["Contact", "/contact"],
          ].map(([label, path]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
              className="block font-medium"
            >
              {label}
            </Link>
          ))}

          <button
            onClick={() =>
              alert("📞 Call on this number: +91 99999 99999")
            }
            className="
              flex items-center gap-2
              mt-4 px-4 py-2 rounded-full
              border border-[#f5c27a]
              bg-white/10
            "
          >
            <Phone size={16} />
            Call Now
          </button>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full px-4 py-2 rounded-full border border-[#f5c27a]"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="w-full px-4 py-2 rounded-full bg-[#f5c27a] text-black"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
