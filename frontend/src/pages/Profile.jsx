import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaFilePdf,
  FaEdit,
  FaGlobe,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext.jsx";
import { IoMdExit } from "react-icons/io";

import toast from "react-hot-toast";
import { success } from "zod";
import { useEffect } from "react";
import api from "../api/axiox.js";

function Profile() {
  const { id } = useParams();
  const [role, setRole] = useState("jobseeker");
  const [ownProfile, setOwnProfile] = useState(false);
  const {
    setIsLogin,
    user,
    setUser,
    setProfileData,
    profileData,
    setProfilePhoto,
    profilePhoto,
  } = useAuth();
  const navigate = useNavigate();

  let isRecruiter = role === "recruiter";

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setProfileData(response.data.payload);
        setProfilePhoto(response.data.payload.profile.profilePhoto.secure_url);
        setRole(response.data.payload.role);
        console.log("profile Data ", response.data.payload);
        setOwnProfile(response.data.ownProfile);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };
    fetchProfileData();
  }, [id]);

  const handleLogout = async () => {
    try {
      const logoutPromise = api.post("/auth/logout");
      await toast.promise(logoutPromise, {
        loading: "Logging Out....",
        success: (res) => res.data.message,
        error: (err) => err.res?.data?.message,
      });
      localStorage.clear();
      setIsLogin(false);
      setProfileData();
      setUser();
      setProfilePhoto("/defaultPP.png");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const downloadUrl = profileData?.profile?.resume?.secure_url?.replace(
    "/upload/",
    "/upload/fl_attachment/",
  );

  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <div className="flex justify-center items-center p-4 sm:p-6 flex-1">
        <div className="w-full max-w-4xl bg-slate-900 rounded-3xl shadow-lg border border-slate-800 overflow-hidden">
          <div className="h-40 sm:h-52 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
            {ownProfile && (
              <Link
                to="/edit-profile"
                className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-800 transition px-4 py-2 rounded-xl text-white flex items-center gap-2"
              >
                <FaEdit />
                Edit
              </Link>
            )}

            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-slate-900 object-cover"
              />
            </div>
          </div>

          <div className="pt-20 sm:pt-24 px-5 sm:px-10 pb-8">
            {!isRecruiter ? (
              <div className="flex flex-col gap-8">
                <div className="text-center sm:text-left">
                  <h1 className="text-xl sm:text-3xl font-bold text-white uppercase">
                    {profileData?.fullName}
                  </h1>

                  <div className="flex justify-center sm:justify-start items-center gap-2 text-slate-400 mt-3">
                    <FaMapMarkerAlt />
                    <span>{profileData?.profile?.jobseekerLocation}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-3">
                    About
                  </h2>

                  <p className="text-slate-300 leading-7">
                    {profileData?.profile?.jobseekerAbout}
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Skills
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {profileData?.profile?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-slate-800 text-slate-200 px-4 py-2 rounded-xl text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Resume
                  </h2>

                  <div className="bg-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <FaFilePdf className="text-red-500 text-xl shrink-0" />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-white font-medium text-sm">
                          {profileData?.profile?.resume?.public_id}
                        </p>
                        <p className="text-slate-400 text-sm">
                          Uploaded recently
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 text-sm">
                      <a
                        href={profileData?.profile?.resume?.secure_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-xl text-white"
                      >
                        View
                      </a>

                      <a
                        href={downloadUrl}
                        className="bg-slate-700 hover:bg-slate-600 transition px-4 py-2 rounded-xl text-white"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Links
                  </h2>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <a
                      href={profileData?.profile?.jobseekerLinks?.github}
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition px-4 py-3 rounded-xl text-slate-200"
                    >
                      <FaGithub />
                      GitHub
                    </a>

                    <a
                      href={profileData?.profile?.jobseekerLinks?.linkedin}
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition px-4 py-3 rounded-xl text-slate-200"
                    >
                      <FaLinkedin />
                      LinkedIn
                    </a>

                    <a
                      href={profileData?.profile?.jobseekerLinks?.portfolio}
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition px-4 py-3 rounded-xl text-slate-200"
                    >
                      <FaGlobe />
                      Portfolio
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-md text-gray-400">
                  <p>Email : {profileData?.email}</p>
                  <p>
                    Contact No: {profileData?.profile?.jobseekerPhoneNumber}
                  </p>
                </div>
                {ownProfile && (
                  <button
                    className="w-full sm:w-fit bg-red-600 hover:bg-red-500 transition px-5 py-3 rounded-xl text-white flex items-center justify-center gap-2 active:scale-95 focus:scale-95"
                    onClick={handleLogout}
                  >
                    <IoMdExit className="text-sm" />
                    Logout
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <div className="text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    {profileData?.profile?.companyName}
                  </h1>

                  <p className="mt-2 text-sm sm:text-base lg:text-lg text-indigo-400">
                    Hiring Developers Worldwide
                  </p>

                  <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-slate-400">
                    {" "}
                    <FaMapMarkerAlt />
                    <span>{profileData?.profile?.companyLocation}</span>
                  </div>
                </div>
                <div>
                  <h2 className="mb-3 text-base sm:text-lg lg:text-xl font-semibold text-white">
                    {" "}
                    Company Description
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 leading-7">
                    {profileData?.profile?.companyDescription}
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-base sm:text-lg lg:text-xl font-semibold text-white">
                    Currently Hiring
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {profileData?.profile?.companyPreferredJob?.map(
                      (role, index) => (
                        <span
                          key={index}
                          className="rounded-xl bg-slate-800 px-4 py-2 text-xs sm:text-sm text-slate-200"
                        >
                          {role}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-base sm:text-lg lg:text-xl font-semibold text-white">
                    Website
                  </h2>

                  <a
                    href={profileData?.profile?.companyWebsite}
                    className="flex w-fit items-center gap-2 rounded-xl bg-slate-800 px-4 py-3 text-sm sm:text-base text-slate-200 transition hover:bg-slate-700"
                  >
                    <FaGlobe />
                    {profileData?.profile?.companyWebsite}
                  </a>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-sm sm:text-base text-gray-400">
                  <p>Email : {profileData?.email}</p>
                  <p>Contact No: {profileData?.profile?.companyPhoneNumber}</p>
                </div>
                {ownProfile && (
                  <button
                    className="flex w-full sm:w-fit items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm sm:text-base font-medium text-white transition hover:bg-red-500 active:scale-95 focus:scale-95"
                    onClick={handleLogout}
                  >
                    <IoMdExit className="text-md" />
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
