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
  const [profileData, setProfileData]= useState();
  const [profilePhoto, setProfilePhoto] = useState("defaultPP.png")

  useEffect(() => {
    const loginCheck = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/verify", {
          withCredentials: true,
        });
        console.log(response);
        const userInfo = JSON.stringify(response.data.payload);
        localStorage.setItem("userInfo", userInfo);
        setIsLogin(true);
        setUser(response.data.payload);
        setProfilePhoto(response.data.payload.profilePhoto)
      } catch (error) {
        setIsLogin(false);
        console.log(error?.response?.data?.message||"something went wrong");
      }
    };
    loginCheck();
  }, []);
  const isRecruiter = user?.role === "recruiter";
  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, setUser, user, isRecruiter, profileData, setProfileData, profilePhoto, setProfilePhoto}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
