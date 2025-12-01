import { useEffect, useState } from "react";
import { AuthContext } from "./Contexts";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  // Login function
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Auto-logout if token removed manually
  useEffect(() => {
    const autoLogout = () => {
      if (!token) setUser(null);
    };
    autoLogout();
  }, [token]);

  return (
    <AuthContext value={{ user, token, login, logout, loading, setLoading }}>
      {children}
    </AuthContext>
  );
};
export default AuthProvider;
