"use client";

import Image from "next/image";
import logo from "../../../assets/logo.png";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import user_img from "../../../assets/default_user.jpg";
import { logoutUser } from "@/services/authService";

const Navbar = () => {
  const { user, setIsLoading, setUser, isLoading } = useUser();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    await logoutUser();
    setIsLoading(true);
    setUser(null);
    router.push("/login");
  };

  if (isLoading) {
    return <div>loading</div>;
  }

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
            <Link
              href="/movies"
              className="headerLink text-white hover:text-gray-300 transition duration-200"
            >
              Movies
            </Link>
            <li className="headerLink text-white hover:text-gray-300 transition duration-200">
              New & Popular
            </li>
          </ul>
        </div>

        {/* Right section - Avatar Dropdown Menu */}
        <div className="hidden md:flex items-center space-x-4 text-sm font-light">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-white hover:ring-red-500 transition duration-300">
                  <AvatarImage
                    src={user_img?.src}
                    alt="User Avatar"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-200 text-black">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white text-sm text-gray-800 w-52 rounded-md shadow-xl mt-2 p-1"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href="/wishlist"
                    className="w-full px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/watchlist"
                    className="w-full px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Watchlist
                  </Link>
                </DropdownMenuItem>
                {user.role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin/dashboard"
                      className="w-full px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 w-full px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition duration-200 cursor-pointer">
                Create Account
              </button>
            </Link>
          )}
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
            {user ? (
              <>
                <li className="text-white hover:text-gray-300 transition duration-200 border-b border-gray-800 pb-2">
                  Wishlist
                </li>
                <li className="text-white hover:text-gray-300 transition duration-200 border-b border-gray-800 pb-2">
                  Watchlist
                </li>
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin/dashboard"
                    className="text-white hover:text-gray-300 transition duration-200 border-b border-gray-800 pb-2"
                  >
                    Dashboard
                  </Link>
                )}
                <li
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-300 transition duration-200 border-b border-gray-800 pb-2"
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-200 mt-2 cursor-pointer">
                    Create Account
                  </button>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
