import { createContext , useContext} from "react";
import {jwtDecode} from "jwt-decode";
 
const AuthContext = createContext();

 export const AuthProvider =({children})=>{
  const token = localStorage.getItem("token");
  const tokenValue = {role:"Recruiter"};
  const isRecruiter = tokenValue.role === "Recruiter";
   return (
    <AuthContext.Provider value={isRecruiter}>
      {children}
    </AuthContext.Provider>
  );
 }

 export const useAuth = () => useContext(AuthContext);  