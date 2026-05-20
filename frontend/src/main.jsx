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
import AboutUs from "./pages/AboutUs";
import TechUsed from "./pages/TechUsed";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import MyJobs from './Pages/MyJobs.jsx'
import MyApplicants from "./Pages/MyApplicants.jsx"
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import "./index.css";
import PostJobs from "./Pages/PostJobs.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/help" element={<Help />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/tech-used" element={<TechUsed />} />
      <Route
        path="/saved-jobs"
        element={
            <SavedJobs />
        }
      />
      <Route
        path="/applied-jobs"
        element={
          <ProtectedRoute>
            <AppliedJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-jobs"
        element={
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-applicants"
        element={
          <ProtectedRoute>
            <MyApplicants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post-jobs"
        element={
          <ProtectedRoute>
            <PostJobs />
          </ProtectedRoute>
        }
      />
    </Routes>
    </AuthProvider>
  </BrowserRouter>,
);
