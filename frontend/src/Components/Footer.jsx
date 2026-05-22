import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitterSquare,
  FaLinkedin,
  FaInstagramSquare,
} from "react-icons/fa";

function Footer() {
  const footerLink =
    "text-gray-300 hover:text-white hover:underline transition duration-200";

  const socialIcon =
    "text-gray-300 text-3xl hover:text-white hover:scale-110 transition duration-200";

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-700 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-10">
        <div className="hidden sm:block max-w-sm ">
          <img
            src="/tplogo.png"
            alt="Talent Pick Logo"
            className="w-44 h-auto"
          />

          <p className="text-gray-300 mt-4 text-sm leading-6">
            Connecting talent with opportunities — making hiring simple,
            fast, and reliable for both recruiters and job seekers.
          </p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-lg mb-4">
            Quick Links
          </h2>

          <div className="flex flex-col gap-2 text-sm">
            <Link to="/about-us" className={footerLink}>
              About Us
            </Link>

            <Link to="/tech-used" className={footerLink}>
              Tech Used
            </Link>

            <Link to="/contact-us" className={footerLink}>
              Contact Us
            </Link>

            <Link to="/help" className={footerLink}>
              Help & Support
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-white font-semibold text-lg mb-4">
            Follow Us
          </h2>

          <div className="flex gap-4">
            <Link
              to="#"
              aria-label="Facebook"
              className={socialIcon}
            >
              <FaFacebook />
            </Link>

            <Link
              to="#"
              aria-label="Twitter"
              className={socialIcon}
            >
              <FaTwitterSquare />
            </Link>

            <Link
              to="#"
              aria-label="LinkedIn"
              className={socialIcon}
            >
              <FaLinkedin />
            </Link>

            <Link
              to="#"
              aria-label="Instagram"
              className={socialIcon}
            >
              <FaInstagramSquare />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-10 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          © 2026 Talent Pick. All rights reserved.
        </p>

        <p className="text-gray-400 text-sm mt-2">
          Email: ysachin8600@gmail.com
        </p>
      </div>
    </footer>
  );
}

export default Footer;