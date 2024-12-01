"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon,
  MicrophoneIcon,
  EllipsisVerticalIcon,
  UserCircleIcon,
  VideoCameraIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm fixed top-0 z-50">
        <nav className="container mx-auto px-4 py-2">
          {isSearchExpanded ? (
            <div className="flex items-center h-14 md:hidden">
              <button
                onClick={handleToggleSearch}
                className="p-2 hover:bg-gray-100 rounded-full mr-2"
                aria-label="Back"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <form 
                onSubmit={handleSearch}
                className="flex flex-1"
              >
                <div className="flex flex-1 items-center border border-gray-300 rounded-l-full overflow-hidden bg-gray-50">
                  <div className="pl-4">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 outline-none bg-transparent"
                    aria-label="Search videos"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full"
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  type="button"
                  className="ml-4 p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Search with voice"
                >
                  <MicrophoneIcon className="h-5 w-5 text-gray-600" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center justify-between h-14">
              {/* Left section - Logo and hamburger */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleToggleMenu}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>
                <Link 
                  href="/" 
                  className="flex items-center gap-2"
                  aria-label="VidFlow Home"
                >
                  <VideoCameraIcon className="h-8 w-8 text-red-600" />
                  <span className="text-xl font-bold text-gray-800">VidFlow</span>
                </Link>
              </div>

              {/* Center section - Search Bar (Desktop) */}
              <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                <form 
                  onSubmit={handleSearch}
                  className="flex w-full"
                >
                  <div className="flex flex-1 items-center border border-gray-300 rounded-l-full overflow-hidden hover:border-blue-400 focus-within:border-blue-500 bg-gray-50">
                    <div className="pl-4">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 outline-none bg-transparent"
                      aria-label="Search videos"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200"
                    aria-label="Search"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    type="button"
                    className="ml-4 p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Search with voice"
                  >
                    <MicrophoneIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </form>
              </div>

              {/* Right section - Actions */}
              <div className="flex items-center gap-2">
                {/* Mobile Search Button */}
                <button
                  className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Search"
                  onClick={handleToggleSearch}
                >
                  <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
                </button>
                
                {/* More Options */}
                <button
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="More options"
                >
                  <EllipsisVerticalIcon className="h-6 w-6 text-gray-600" />
                </button>

                {/* Sign In Button */}
                <Link
                  href="/sign-in"
                  className="flex items-center gap-2 px-3 py-1.5 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="hidden sm:inline">Sign in</span>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
      
      {/* Sidebar */}
      <Sidebar isOpen={isMenuOpen} isMobile={isMobile} />
      
      {/* Adjust main content padding when sidebar is open on desktop */}
      <style jsx global>{`
        @media (min-width: 768px) {
          main {
            padding-left: ${isMenuOpen ? '240px' : '0'};
            transition: padding-left 0.3s;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
