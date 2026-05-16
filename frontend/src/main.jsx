import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Profile from "./Pages/Profile.jsx";
import Help from "./Pages/Help.jsx";
import Contact from "./Pages/Contact.jsx";
import AppliedJobs from "./Pages/AppliedJobs.jsx";
import SavedJobs from "./Pages/SavedJobs.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/help" element={<Help/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/saved-jobs" element={<ProtectedRoute><SavedJobs/></ProtectedRoute>}/>
    <Route path="/applied-jobs" element={<ProtectedRoute><AppliedJobs/></ProtectedRoute>}/>
    <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
  </Routes>
  </BrowserRouter>,
);
