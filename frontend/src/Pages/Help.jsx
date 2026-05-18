import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from '../Components/Footer.jsx';

function Help() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800">
              Help & Support
            </h1>

            <p className="text-gray-500 mt-3">
              Need assistance? We're here to help you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Account Issues
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Facing problems with login, registration, or password reset?
                Make sure your email and password are correct or contact support.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Job Applications
              </h2>

              <p className="text-gray-600 leading-relaxed">
                You can track your applications from the dashboard after logging in.
                Recruiters can also manage applicants easily.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Recruiter Support
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Recruiters can post jobs, manage listings, and shortlist candidates
                directly from the recruiter dashboard.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Contact Us
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Email: support@jobportal.com
              </p>

              <p className="text-gray-600">
                Phone: +91 9876543210
              </p>
            </div>

          </div>

          <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-3">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">

              <div>
                <h3 className="font-semibold text-gray-800">
                  How do I apply for jobs?
                </h3>

                <p className="text-gray-600">
                  Create an account, login as a job seeker, and apply directly from job listings.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  How can recruiters post jobs?
                </h3>

                <p className="text-gray-600">
                  Register as a recruiter and access the recruiter dashboard to post jobs.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Can I reset my password?
                </h3>

                <p className="text-gray-600">
                  Yes, use the “Forgot Password” option on the login page.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Help;