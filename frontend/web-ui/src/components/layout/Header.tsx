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
  ArrowLeftIcon,
  UsersIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon as AdminCogIcon,
  FlagIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import ThemeToggle from "../ThemeToggle";
import { ROUTES } from "@/config/routes";
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const pathname = usePathname();
  
  // Check if current route is an admin route
  const isAdmin = pathname?.startsWith('/admin');

  // Admin quick actions
  const adminActions = [
    { icon: UsersIcon, label: 'Users', href: ROUTES.ADMIN.USERS },
    { icon: FlagIcon, label: 'Moderation', href: ROUTES.ADMIN.MODERATION },
    { icon: ChartBarIcon, label: 'Analytics', href: ROUTES.ADMIN.ANALYTICS },
    { icon: CurrencyDollarIcon, label: 'Revenue', href: ROUTES.ADMIN.REVENUE },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
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
      <header className="w-full bg-white dark:bg-black shadow-sm fixed top-0 z-50">
        <nav className="container mx-auto px-2 sm:px-4 py-2">
          {isSearchExpanded ? (
            <div className="flex items-center h-14 md:hidden">
              <button
                onClick={handleToggleSearch}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full mr-2"
                aria-label="Back">
                <ArrowLeftIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </button>
              <form onSubmit={handleSearch} className="flex flex-1">
                <div className="flex flex-1 items-center border border-gray-300 dark:border-gray-700 rounded-l-full overflow-hidden bg-white dark:bg-black">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    aria-label="Search videos"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label="Search">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  type="button"
                  className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  aria-label="Search with voice">
                  <MicrophoneIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center justify-between h-14">
              {/* Left section - Logo and hamburger */}
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={handleToggleMenu}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
                  {isMenuOpen ? (
                    <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                  ) : (
                    <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                  )}
                </button>
                <Link
                  href={isAdmin ? ROUTES.ADMIN.DASHBOARD : ROUTES.HOME}
                  className="flex items-center gap-1 sm:gap-2"
                  aria-label={isAdmin ? "Admin Dashboard" : "VidFlow Home"}>
                  <VideoCameraIcon className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                  <span className="text-base sm:text-xl font-bold text-gray-800 dark:text-white truncate">
                    VidFlow
                  </span>
                </Link>
              </div>

              {/* Center section */}
              {isAdmin ? (
                // Admin Quick Actions - Desktop
                <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 flex-1 justify-center">
                  {adminActions.map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="flex items-center px-2 xl:px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap">
                      <action.icon className="h-5 w-5 mr-2" />
                      <span>{action.label}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                // Regular Search Bar - Desktop
                <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                  <form onSubmit={handleSearch} className="flex w-full">
                    <div className="flex flex-1 items-center border border-gray-300 dark:border-gray-700 rounded-l-full overflow-hidden bg-white dark:bg-black">
                      <div className="pl-4">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        aria-label="Search videos"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      aria-label="Search">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      type="button"
                      className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                      aria-label="Search with voice">
                      <MicrophoneIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </form>
                </div>
              )}

              {/* Right section - Actions */}
              <div className="flex items-center gap-1 sm:gap-2">
                {isAdmin ? (
                  // Admin Mobile/Tablet Actions
                  <div className="relative lg:hidden">
                    <button
                      onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                      aria-label="Admin actions">
                      <EllipsisVerticalIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400" />
                    </button>

                    {/* Mobile Admin Menu Dropdown */}
                    {isAdminMenuOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-30"
                          onClick={() => setIsAdminMenuOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-40 py-1">
                          {adminActions.map((action) => (
                            <Link
                              key={action.href}
                              href={action.href}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => setIsAdminMenuOpen(false)}>
                              <action.icon className="h-5 w-5 mr-3" />
                              {action.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  // Regular Mobile Search Button
                  <button
                    className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                    aria-label="Search"
                    onClick={handleToggleSearch}>
                    <MagnifyingGlassIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400" />
                  </button>
                )}

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* More Options - Only show for non-admin */}
                {!isAdmin && (
                  <button
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                    aria-label="More options">
                    <EllipsisVerticalIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400" />
                  </button>
                )}

                {/* Admin Indicator or Sign In Button */}
                {isAdmin ? (
                  <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400 rounded-full">
                    <ShieldCheckIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm whitespace-nowrap">Admin</span>
                  </div>
                ) : (
                  // Regular Sign In Button
                  <Link
                    href={ROUTES.AUTH.SIGN_IN}
                    className="hidden min-[455px]:flex items-center gap-2 px-3 py-1.5 text-green-600 dark:text-green-400 border border-green-600 dark:border-green-400 rounded-full hover:bg-green-50 dark:hover:bg-green-900/50">
                    <UserCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="hidden sm:inline text-sm">Sign in</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Pass isAdmin to Sidebar */}
      <Sidebar isOpen={isMenuOpen} isMobile={isMobile} isAdmin={isAdmin} />

      {/* Adjust main content padding when sidebar is open on desktop */}
      <style jsx global>{`
        @media (min-width: 768px) {
          main {
            padding-left: ${isMenuOpen ? "240px" : "0"};
            transition: padding-left 0.3s;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
