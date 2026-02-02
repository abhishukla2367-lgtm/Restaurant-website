import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">Southern Tales</div>

      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/reservation">Reservation</Link>
        <Link to="/order">Order Online</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <a href="tel:+911234567890" className="navbar-call">
        Call Now
      </a>
    </header>
  );
};

export default Navbar;
