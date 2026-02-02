import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-orange-500">
              Southern Tales
            </Link>
            <div className="space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-orange-500 font-medium transition"
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="text-gray-700 hover:text-orange-500 font-medium transition"
              >
                Menu
              </Link>
            </div>
          </div>
        </nav>

        {/* Pages */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 text-center">
          &copy; {new Date().getFullYear()} Southern Tales. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
