"use client";

import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
        placeholder-gray-500 dark:placeholder-gray-400 
        text-gray-900 dark:text-white 
        bg-white dark:bg-gray-800
        focus:outline-none focus:ring-blue-500 focus:border-blue-500 
        focus:z-10 sm:text-sm ${className}`}
        {...props}
      />
    </div>
  );
} 