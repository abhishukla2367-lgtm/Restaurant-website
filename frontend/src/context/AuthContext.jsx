import { createContext, useState, useEffect, useCallback } from "react";

// Create the context for global access
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  /**
   * TASKS 2 & 6: Persistent Authentication (Sync Initialization)
   * We initialize state directly from localStorage so 'isLoggedIn' is 
   * accurate on the very first render.
   */
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      return savedUser && token ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });

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
   * Validation check: Ensures token hasn't been manually tampered with
   */
  useEffect(() => {
    const validateSession = () => {
      const token = localStorage.getItem("token");
      if (!token && user) {
        logout();
      }
      setLoading(false);
    };
    validateSession();
  }, [user, logout]);

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
      {/* 
         Task 1: Preventing flickers. 
         Wait for the validation check to complete before rendering the App routes.
      */}
      {!loading ? (
        children
      ) : (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: '#e67e22' 
        }}>
          Loading Auth Session...
        </div>
      )}
    </AuthContext.Provider>
  );
};
