import { createContext, useState, useEffect, useCallback } from "react";

// Create the context for global access
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State for user data, derived login status, and initial loading
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * TASK 5: Login Function
   * Stores user data and JWT token in localStorage for persistence.
   */
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  /**
   * TASK 3: Logout Function
   * Clears session data to revert Navbar to "Login" state.
   */
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  /**
   * TASKS 2 & 6: Persistent Authentication
   * On mount, check if a user session exists in localStorage.
   */
  useEffect(() => {
    const initAuth = () => {
      try {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Auth sync error:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [logout]);

  // Derived state for Task 3 & 4 (Navbar and Protected Action logic)
  const isLoggedIn = !!user;

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Task 1: Ensure theme is consistent by preventing flickers during auth check */}
      {!loading ? children : <div className="loader">Loading...</div>}
    </AuthContext.Provider>
  );
};
