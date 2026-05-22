import { createContext , useContext} from "react";
import {jwtDecode} from "jwt-decode";
 
const AuthContext = createContext();

 export const AuthProvider =({children})=>{
  const token = localStorage.getItem("token");
  const tokenValue = {role:"jobseeker"};
   return (
    <AuthContext.Provider value={tokenValue}>
      {children}
    </AuthContext.Provider>
  );
 }

 export const useAuth = () => useContext(AuthContext);