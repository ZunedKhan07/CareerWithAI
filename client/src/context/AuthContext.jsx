import React, { createContext, useContext, useState, useEffect } from "react";
import { registerUser, logInUser, logoutUser } from "../api/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const register = async (data) => {
    return await registerUser(data);
  };

  const login = async (data) => {
    const res = await logInUser(data);

    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);