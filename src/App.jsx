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

// ================= PUBLIC PAGES =================
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

// ================= ADMIN PAGES =================
// ⚠️ Make sure these paths EXIST exactly
import AdminDashboard from "./components/admin/AdminDashboard";
import MenuList from "./components/admin/MenuList";
import OrdersList from "./components/admin/OrdersList";
import ReservationsList from "./components/admin/ReservationsList";

// ================= CONTEXT =================
import { CartProvider } from "./context/CartContext";

/* 🔹 Scroll to top on every route change */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

/* 🔹 Layout handler (hide Header/Footer on admin routes) */
const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={isAdminRoute ? "min-h-screen" : "min-h-[80vh]"}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />

        <Layout>
          <Routes>
            {/* ================= PUBLIC ROUTES ================= */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order-summary" element={<OrderSummaryPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/cart" element={<CartDrawer />} />

            {/* ================= AUTH ROUTES ================= */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* ================= ADMIN ROUTES ================= */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/menu" element={<MenuList />} />
            <Route path="/admin/orders" element={<OrdersList />} />
            <Route
              path="/admin/reservations"
              element={<ReservationsList />}
            />

            {/* ================= FALLBACK ================= */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}
