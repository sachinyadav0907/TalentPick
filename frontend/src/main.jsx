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
import MyJobs from "./Pages/MyJobs.jsx";
import MyApplicants from "./Pages/MyApplicants.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import "./index.css";
import PostJobs from "./Pages/PostJobs.jsx";
import EditProfile from "./Pages/EditProfile.jsx";
import GuestRoute from "./Components/GuestRoute.jsx";
import { Toaster } from "react-hot-toast";
import ExploreJobs from "./Pages/ExploreJobs.jsx";
import {JobsProvider} from "./Contexts/JobsContext.jsx";
import EditJob from "./Pages/EditJob.jsx";
import ShowApplicants from "./Pages/ShowApplicants.jsx";
import NotFound from "./Components/NotFound.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
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
