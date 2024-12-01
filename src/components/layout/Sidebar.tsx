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
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
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

const Sidebar = ({ isOpen, isMobile }: SidebarProps) => {
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
    href: "/sign-in",
  };

  const menuItems: MenuItemType[] = [
    // Add sign in as first item for small screens
    ...(isSmallScreen ? [signInItem, { divider: true } as MenuDivider] : []),
    // Regular menu items
    { icon: HomeIcon, label: "Home", href: "/" } as MenuItem,
    { icon: FireIcon, label: "Trending", href: "/trending" } as MenuItem,
    { icon: PlayCircleIcon, label: "Subscriptions", href: "/subscriptions" } as MenuItem,
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

  // Remove mobileOnlyItems since we're adding sign in at the top
  const allItems = menuItems;

  const sidebarClasses = `
    fixed top-14 bottom-0 bg-white dark:bg-gray-900 z-40 overflow-y-auto
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
          <h3 className="px-6 py-2 text-base font-medium text-gray-500 dark:text-gray-400">
            {item.section}
          </h3>
          {item.items.map((subItem, subIndex) => {
            const Icon = subItem.icon;
            return (
              <Link
                key={`${index}-${subIndex}`}
                href={subItem.href}
                className="flex items-center px-6 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Icon className="h-5 w-5 mr-4" />
                <span>{subItem.label}</span>
              </Link>
            );
          })}
        </div>
      );
    }

    if ("icon" in item) {
      const Icon = item.icon;
      return (
        <Link
          key={index}
          href={item.href}
          className="flex items-center px-6 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Icon className="h-5 w-5 mr-4" />
          <span>{item.label}</span>
        </Link>
      );
    }
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
        <nav className="py-3">
          {allItems.map((item, index) => renderMenuItem(item, index))}
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
