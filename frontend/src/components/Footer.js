import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-gray-400 pt-16 pb-8 mt-10 border-t border-gray-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Info */}
        <div>
          <h2 className="text-2xl font-2xl text-white ">Shaifur Shope</h2>
          <p className="mt-3 text-sm leading-6 opacity-80">
            We provide premium quality products with trust, care and value. 
            Your satisfaction is our first priority.
          </p>
        </div>

        {/* About info (Static text, no link) */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Information</h3>
          <p className="text-sm opacity-80">Email: support@shop.com</p>
          <p className="text-sm opacity-80 mt-1">Phone: +880 1234-567890</p>
          <p className="text-sm opacity-80 mt-1">Business Hours: 10AM - 10PM</p>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
          <p className="text-sm opacity-80">Uttara, Dhaka</p>
          <p className="text-sm opacity-80">Bangladesh</p>
          <p className="text-sm opacity-80 mt-1">Worldwide Shipping Available</p>
        </div>

        {/* Social (Non-click icons, just UI) */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl opacity-90">
            <span className="hover:text-white cursor-default"><FaFacebook /></span>
            <span className="hover:text-white cursor-default"><FaInstagram /></span>
            <span className="hover:text-white cursor-default"><FaYoutube /></span>
            <span className="hover:text-white cursor-default"><FaTwitter /></span>
          </div>

          <p className="text-xs opacity-50 mt-4">
            Social icons for visual only — no external links.
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 my-8 opacity-50"></div>

      <p className="text-center text-sm tracking-wide text-gray-500">
  ©.     {new Date().getFullYear()} ShaifurShop — Quality & Trust Delivered.
      </p>

    </footer>
  );
};

export default Footer;

