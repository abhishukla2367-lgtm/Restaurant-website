import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Phone, Menu, X, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; 
import logo from "../assets/images/logo/southern-tales-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { isLoggedIn, logout } = useContext(AuthContext); 
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-6 lg:px-12 py-4 bg-[#1f1b16] shadow-lg">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Southern Tales" className="w-14 h-auto" />
          <span className="text-2xl font-bold text-white">Southern Tales</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 font-medium text-gray-200">
          {[
            ["Home", "/"],
            ["Menu", "/menu"],
            ["About Us", "/about"],
            ["Gallery", "/gallery"],
            ["Reservation", "/reservation"],
            ["Contact", "/contactus"],
          ].map(([label, path]) => (
            <Link key={path} to={path} className="hover:text-[#f5c27a] transition">
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4 text-white">
          <button
            onClick={() => alert("📞 Call on this number: +91 99999 99999")}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#f5c27a] bg-white/10 hover:bg-white/20"
          >
            <Phone size={16} /> Call Now
          </button>

          <button onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#f5c27a] text-black text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate("/profile")} 
                className="p-2 rounded-full border border-[#f5c27a] text-[#f5c27a] hover:bg-[#f5c27a] hover:text-black transition"
                title="View Profile"
              >
                <User size={22} />
              </button>
              <button
                onClick={logout}
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 rounded-full bg-[#f5c27a] text-black font-semibold hover:bg-[#eab366] transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-2 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
            <Link key={path} to={path} onClick={() => setIsOpen(false)} className="block font-medium">
              {label}
            </Link>
          ))}

          <button
            onClick={() => alert("📞 Call on this number: +91 99999 99999")}
            className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full border border-[#f5c27a] bg-white/10 w-full justify-center"
          >
            <Phone size={16} /> Call Now
          </button>

          <div className="flex flex-col gap-4 mt-4">
            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => { navigate("/profile"); setIsOpen(false); }} 
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#f5c27a] text-[#f5c27a]"
                >
                  <User size={20} /> My Profile
                </button>
                <button onClick={() => { logout(); setIsOpen(false); }} className="text-gray-400 text-center">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { navigate("/login"); setIsOpen(false); }} 
                  className="w-full px-4 py-2 rounded-full bg-[#f5c27a] text-black font-semibold"
                >
                  Login
                </button>
                <button 
                  onClick={() => { navigate("/signup"); setIsOpen(false); }} 
                  className="w-full px-4 py-2 rounded-full border border-white/30 text-white font-semibold"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
