import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const location = useLocation();
  const navigate = useNavigate();

  const publicPaths = ["/login", "/register"];

  useEffect(() => {
    if (token) {
      setIsLogin(true);

      if (publicPaths.includes(location.pathname)) {
        navigate("/");
      }
    } else if (!publicPaths.includes(location.pathname)) {
      setIsLogin(false);
      navigate("/login");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLogin, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
