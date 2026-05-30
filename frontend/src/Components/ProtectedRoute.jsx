import { useAuth } from "../Contexts/AuthContext";
import Unauthorized from "./Unauthorized";

export default function ProtectedRoute({ children }) {

  const {isLogin} = useAuth();

  if (!isLogin) {
    return <Unauthorized/>
  }

  return children;
}