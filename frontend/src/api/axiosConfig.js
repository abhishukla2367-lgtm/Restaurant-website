import axios from "axios";

/**
 * Create an Axios instance with a base URL.
 * BaseURL points to your backend running on port 5000.
 */
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * REQUEST INTERCEPTOR
 * Automatically attaches the JWT from LocalStorage to the 'Authorization' header.
 * This ensures Task 4 & 6 protected routes work seamlessly.
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Must match the "Bearer <token>" format expected by your authRoutes.js
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
 * Intercepts responses to catch 401 (Unauthorized) or 403 (Forbidden) errors globally.
 * If a token is expired or invalid, it cleans up LocalStorage.
 */
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If server responds with 401 or 403, the token is likely invalid/expired
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Session expired or unauthorized. Logging out...");
      
      // Clean up local storage so the interceptor stops sending the bad token
      localStorage.removeItem("token");
      
      // Optional: Force redirect to login page if using window.location
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
