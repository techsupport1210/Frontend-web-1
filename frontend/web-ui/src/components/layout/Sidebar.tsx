"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  HomeIcon,
  FilmIcon,
  ClockIcon,
  HandThumbUpIcon,
  PlayCircleIcon,
  FireIcon,
  ShoppingBagIcon,
  MusicalNoteIcon,
  TrophyIcon,
  NewspaperIcon,
  LightBulbIcon,
  Cog6ToothIcon,
  BookmarkIcon,
  FilmIcon as FilmSolidIcon,
  ClockIcon as ClockSolidIcon,
  ChevronDownIcon,
  UserGroupIcon,
  RectangleStackIcon,
  UserCircleIcon,
  UsersIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon as AdminCogIcon,
  FlagIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { ROUTES } from "@/config/routes";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  isAdmin?: boolean;
}

type MenuItem = {
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
};

type MenuSection = {
  section: string;
  items: MenuItem[];
};

type MenuDivider = {
  divider: true;
};

type MenuItemType = MenuItem | MenuSection | MenuDivider;

const Sidebar = ({ isOpen, isMobile, isAdmin = false }: SidebarProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 455);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Sign in item for small screens
  const signInItem: MenuItem = {
    icon: UserCircleIcon,
    label: "Sign in",
    href: ROUTES.AUTH.SIGN_IN,
  };

  // Admin menu items
  const adminMenuItems: MenuItemType[] = [
    { icon: HomeIcon, label: "Dashboard", href: ROUTES.ADMIN.DASHBOARD },
    { divider: true },
    {
      section: "Platform Management",
      items: [
        { icon: UsersIcon, label: "User Management", href: ROUTES.ADMIN.USERS },
        { icon: FlagIcon, label: "Content Moderation", href: ROUTES.ADMIN.MODERATION },
        { icon: ChartBarIcon, label: "Analytics", href: ROUTES.ADMIN.ANALYTICS },
        { icon: CurrencyDollarIcon, label: "Revenue", href: ROUTES.ADMIN.REVENUE },
        { icon: AdminCogIcon, label: "Settings", href: ROUTES.ADMIN.SETTINGS },
      ],
    },
    { divider: true },
    {
      section: "Monitoring",
      items: [
        { icon: ShieldCheckIcon, label: "System Health", href: ROUTES.ADMIN.HEALTH },
        { icon: ChartBarIcon, label: "Reports", href: ROUTES.ADMIN.REPORTS },
        { icon: FlagIcon, label: "Audit Logs", href: ROUTES.ADMIN.AUDIT },
      ],
    },
  ];

  // Regular user menu items
  const regularMenuItems: MenuItemType[] = [
    // Add sign in as first item for small screens
    ...(isSmallScreen ? [signInItem, { divider: true } as MenuDivider] : []),
    // Regular menu items
    { icon: HomeIcon, label: "Home", href: ROUTES.HOME } as MenuItem,
    { icon: FireIcon, label: "Trending", href: "/trending" } as MenuItem,
    {
      icon: PlayCircleIcon,
      label: "Subscriptions",
      href: "/subscriptions",
    } as MenuItem,
    { divider: true },
    {
      section: "You",
      items: [
        { icon: UserGroupIcon, label: "Your channel", href: "/channel" },
        { icon: ClockIcon, label: "History", href: "/history" },
        { icon: FilmIcon, label: "Your videos", href: "/videos" },
        { icon: ClockSolidIcon, label: "Watch later", href: "/watchlater" },
        { icon: HandThumbUpIcon, label: "Liked videos", href: "/liked" },
        { icon: ChevronDownIcon, label: "Show more", href: "#" },
      ],
    },
    { divider: true },
    {
      section: "Subscriptions",
      items: [
        { icon: UserGroupIcon, label: "Channel 1", href: "/channel1" },
        { icon: UserGroupIcon, label: "Channel 2", href: "/channel2" },
        { icon: UserGroupIcon, label: "Channel 3", href: "/channel3" },
        { icon: ChevronDownIcon, label: "Show 99+ more", href: "#" },
      ],
    },
    { divider: true },
    {
      section: "Explore",
      items: [
        { icon: MusicalNoteIcon, label: "Music", href: "/music" },
        { icon: TrophyIcon, label: "Sports", href: "/sports" },
        { icon: ShoppingBagIcon, label: "Shopping", href: "/shopping" },
        { icon: FilmSolidIcon, label: "Movies", href: "/movies" },
        { icon: NewspaperIcon, label: "News", href: "/news" },
        { icon: LightBulbIcon, label: "Learning", href: "/learning" },
        { icon: RectangleStackIcon, label: "Podcasts", href: "/podcasts" },
      ],
    },
    { divider: true },
    {
      section: "More from VidFlow",
      items: [
        { icon: BookmarkIcon, label: "VidFlow Premium", href: "/premium" },
        { icon: MusicalNoteIcon, label: "VidFlow Music", href: "/music" },
        { icon: FilmIcon, label: "VidFlow Kids", href: "/kids" },
      ],
    },
    { divider: true },
    { icon: Cog6ToothIcon, label: "Settings", href: "/settings" },
  ];

  // Choose which menu items to display based on isAdmin
  const menuItemsToShow = isAdmin ? adminMenuItems : regularMenuItems;

  const sidebarClasses = `
    fixed top-14 bottom-0 bg-white dark:bg-black z-40 overflow-y-auto thin-scrollbar
    ${isMobile ? "w-64" : "w-60"}
    ${isOpen ? "left-0" : "-left-64"}
    transition-all duration-300
    ${isMobile ? "shadow-lg" : ""}
  `;

  const renderMenuItem = (item: MenuItemType, index: number) => {
    if ("divider" in item) {
      return (
        <hr key={index} className="my-3 border-gray-200 dark:border-gray-700" />
      );
    }

    if ("section" in item) {
      return (
        <div key={index} className="mb-3">
          <h3 className="px-6 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {item.section}
          </h3>
          {item.items.map((subItem, subIndex) => {
            const Icon = subItem.icon;
            return (
              <Link
                key={`${index}-${subIndex}`}
                href={subItem.href}
                className="flex items-center px-6 py-2.5 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group">
                <Icon className="h-5 w-5 mr-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span>{subItem.label}</span>
              </Link>
            );
          })}
        </div>
      );
    }

    // For single menu items
    const Icon = item.icon;
    return (
      <Link
        key={index}
        href={item.href}
        className="flex items-center px-6 py-2.5 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group">
        <Icon className="h-5 w-5 mr-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          aria-hidden="true"
        />
      )}

      <aside className={sidebarClasses}>
        <nav className="pt-4 pb-3">
          <div className="space-y-1">
            {menuItemsToShow.map((item, index) => renderMenuItem(item, index))}
          </div>
        </nav>
      </aside>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .thin-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
        }
        .thin-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .thin-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }

        /* Dark mode scrollbar */
        @media (prefers-color-scheme: dark) {
          .thin-scrollbar {
            scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
          }
          .thin-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.2);
          }
          .thin-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
