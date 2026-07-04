import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#030714] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-8xl font-bold text-red-500">404</h1>

          <h2 className="mt-4 text-3xl font-bold text-white">Page Not Found</h2>

          <p className="mt-3 text-gray-400">
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <Link
            to="/"
            className="
            inline-flex items-center
            mt-8
            px-6 py-3
            rounded-xl
            bg-linear-to-r
            from-red-500
            to-pink-600
            text-white
            font-semibold
            shadow-lg
            hover:scale-105
            hover:shadow-red-500/30
            transition-all
            duration-300
          "
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
