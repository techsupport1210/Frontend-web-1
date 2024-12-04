"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-800 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} VidFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
