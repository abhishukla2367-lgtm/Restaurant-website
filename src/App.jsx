import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Reservation from "./pages/Reservation";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Context
import { CartProvider } from "./context/CartContext";

/* 🔹 Scroll to top on every route change */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <CartProvider>
      <Router>
        {/* Scroll to top on route change */}
        <ScrollToTop />

        {/* Header with navigation */}
        <Header />

        {/* Main content */}
        <main className="min-h-[80vh]">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order-summary" element={<OrderSummaryPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/cart" element={<CartDrawer />} />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </Router>
    </CartProvider>
  );
}
