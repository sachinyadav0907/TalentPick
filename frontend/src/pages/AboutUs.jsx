import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";

function AboutUs() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-slate-950 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              About TalentPick
            </h1>

            <p className="text-slate-400 max-w-3xl mx-auto">
              TalentPick is a full-stack MERN application designed to simplify
              the hiring process by connecting job seekers with recruiters
              through a modern, user-friendly platform.
            </p>
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Project Overview
            </h2>

            <p className="text-slate-400 leading-relaxed">
              This project was built to provide a seamless experience for both
              job seekers and recruiters. Users can create profiles, upload
              resumes, search jobs, save jobs, apply for opportunities, and
              manage their applications. Recruiters can post jobs, manage
              listings, and connect with potential candidates through an
              intuitive dashboard.
            </p>
          </section>

          {/* Features */}
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Key Features
            </h2>

            <ul className="space-y-3 text-slate-400">
              <li>✓ User Authentication & Authorization</li>
              <li>✓ Profile Management</li>
              <li>✓ Resume Upload & Storage</li>
              <li>✓ Job Search & Filtering</li>
              <li>✓ Save Jobs Functionality</li>
              <li>✓ Job Applications</li>
              <li>✓ Recruiter Dashboard</li>
              <li>✓ Responsive Design</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-slate-500 text-sm">Email</p>
                <p className="text-white">ysachin8600@example.com</p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Phone</p>
                <p className="text-white">+91 8369474170</p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Developer</p>
                <p className="text-white">Sachin Yadav</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AboutUs;
