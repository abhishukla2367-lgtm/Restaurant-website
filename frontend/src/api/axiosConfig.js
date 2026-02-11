import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Automatically attach the token from LocalStorage to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
