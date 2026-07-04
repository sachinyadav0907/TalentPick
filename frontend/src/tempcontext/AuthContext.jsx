import { createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { json } from "zod";
import api from "../api/axiox.js"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [profileData, setProfileData]= useState();
  const [profilePhoto, setProfilePhoto] = useState("/defaultPP.png")
  const [profileId, setProfileId] = useState();

  useEffect(() => {
    const loginCheck = async () => {
      try {
        const response = await api.get("/auth/verify");
        const userInfo = JSON.stringify(response.data.payload);
        localStorage.setItem("userInfo", userInfo);
        setProfileId(response.data.payload.id)
        setIsLogin(true);
        setUser(response.data.payload);
        setProfilePhoto(response.data.payload.profilePhoto);
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
      value={{ isLogin, setIsLogin, setUser, user, isRecruiter, profileData, setProfileData, profilePhoto, setProfilePhoto, profileId, setProfileId}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
