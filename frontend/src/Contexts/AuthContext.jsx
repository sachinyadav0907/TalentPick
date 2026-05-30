import { createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { json } from "zod";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const loginCheck = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/verify", {
          withCredentials: true,
        });
        const userInfo = JSON.stringify(response.data.payload);
        localStorage.setItem("userInfo", userInfo);
        setIsLogin(true);
        setUser(response.data.payload);
      } catch (error) {
        setIsLogin(false);
        console.log(error.message);
      }
    };
    loginCheck();
  }, []);
  const isRecruiter = user?.role === "recruiter";
  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, setUser, user, isRecruiter }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
