"use client";

import Image from "next/image";
import logo from "../../../assets/logo.png";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed w-full bg-gradient-to-b from-black to-transparent z-50">
      <div className="flex items-center justify-between px-4 py-4 md:px-10">
        {/* Left section - Logo and Desktop Nav */}
        <div className="flex items-center space-x-2 md:space-x-10">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="logo"
            className="cursor-pointer object-contain w-20 md:w-24"
          />

          <ul className="hidden space-x-6 md:flex">
            <Link
              href="/"
              className="headerLink text-white hover:text-gray-300 transition duration-200"
            >
              Home
            </Link>
            <li className="headerLink text-white hover:text-gray-300 transition duration-200">
              TV Shows
            </li>
            <li className="headerLink text-white hover:text-gray-300 transition duration-200">
              Movies
            </li>
            <li className="headerLink text-white hover:text-gray-300 transition duration-200">
              New & Popular
            </li>
            <li className="headerLink text-white hover:text-gray-300 transition duration-200">
              My List
            </li>
          </ul>
        </div>

        {/* Right section - Desktop Icons and Button */}
        <div className="hidden md:flex items-center space-x-4 text-sm font-light">
          <Link href="/login">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition duration-200 cursor-pointer">
              Create Account
            </button>
          </Link>
        </div>

        {/* Mobile menu button - visible only on small screens */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - appears when menu button is clicked */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 w-full px-4 py-3 absolute top-16 left-0 right-0">
          <ul className="flex flex-col space-y-4">
            <li className="text-white hover:text-gray-300 transition duration-200 border-b border-gray-800 pb-2">
              Home
            </li>
            <li className="text-white hover:text-gray-300 transition duration-200 border-b border-gray-800 pb-2">
              TV Shows
            </li>
            <li className="text-white hover:text-gray-300 transition duration-200 border-b border-gray-800 pb-2">
              Movies
            </li>
            <li className="text-white hover:text-gray-300 transition duration-200 border-b border-gray-800 pb-2">
              New & Popular
            </li>
            <li className="text-white hover:text-gray-300 transition duration-200 border-b border-gray-800 pb-2">
              My List
            </li>
            <Link href="/login">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-200 mt-2 cursor-pointer">
                Create Account
              </button>
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
