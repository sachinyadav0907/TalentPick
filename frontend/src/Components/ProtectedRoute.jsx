import Unauthorized from "./Unauthorized";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return children;
}