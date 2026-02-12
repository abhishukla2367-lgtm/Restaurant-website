import axios from "axios";

// Requirement #2: Connection to your Node.js backend
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Ensure this matches your server port
  headers: { "Content-Type": "application/json" }
});

/**
 * REQUEST INTERCEPTOR
 * Automatically attaches the JWT token from localStorage to every request.
 * Powers Task 4: Allowing "Reserving table" and "Ordering food" for logged-in users.
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 * Requirement #3 & #4: Handles session expiration.
 * If the user is logged out, it clears local data so the Navbar updates to 'Login'.
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401: Unauthorized, 403: Forbidden (Admin only)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Session expired or unauthorized. Redirecting to login...");
      
      // Task 3: Clear storage so Navbar switches back to showing "Login"
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Requirement #4: Force login for protected actions
      if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
