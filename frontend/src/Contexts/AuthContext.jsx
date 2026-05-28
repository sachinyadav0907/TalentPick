import { createContext , useContext} from "react";
import {jwtDecode} from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { json } from "zod";
 
const AuthContext = createContext();

 export const AuthProvider =({children})=>{

  const [user, setUser] = useState(null);

  useEffect(()=>{
    const userInfo = localStorage.getItem("userInfo");

    if(userInfo){
      const parsedUserInfo = JSON.parse(userInfo);

      setUser(parsedUserInfo);
    }
  },[])
  const isRecruiter = user?.role === "recruiter";
   return (
    <AuthContext.Provider value={{user, isRecruiter}}>
      {children}
    </AuthContext.Provider>
  );
 }

 export const useAuth = () => useContext(AuthContext);  