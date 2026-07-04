import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Help from "./pages/Help.jsx";
import Contact from "./pages/Contact.jsx";
import AppliedJobs from "./pages/AppliedJobs.jsx";
import SavedJobs from "./pages/SavedJobs.jsx";
import AboutUs from "./pages/AboutUs";
import TechUsed from "./pages/TechUsed";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MyJobs from "./pages/MyJobs.jsx";
import MyApplicants from "./pages/MyApplicants.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import "./index.css";
import PostJobs from "./pages/PostJobs.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import { Toaster } from "react-hot-toast";
import ExploreJobs from "./pages/ExploreJobs.jsx";
import {JobsProvider} from "./contexts/JobsContext.jsx";
import EditJob from "./pages/EditJob.jsx";
import ShowApplicants from "./pages/ShowApplicants.jsx";
import NotFound from "./components/NotFound.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ScrollToTop/>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#34295c",
          color: "white",
          border: "1px solid #27272a",
          zIndex: "1000",
        },
        duration: 3000,
      }}
    />
    <JobsProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/tech-used" element={<TechUsed />} />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore-jobs"
            element={
              <ProtectedRoute>
                <ExploreJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-jobs"
            element={
              <ProtectedRoute>
                <SavedJobs />
              </ProtectedRoute>
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
            path="/profile/:id"
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
            path="/my-applicants/:id"
            element={
              <ProtectedRoute>
                <ShowApplicants/>
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
          <Route
            path="/edit-job/:id"
            element={
              <ProtectedRoute>
                <EditJob />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </AuthProvider>
    </JobsProvider>
  </BrowserRouter>,
);
