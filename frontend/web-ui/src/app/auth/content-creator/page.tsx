"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { ROUTES } from '@/config/routes';
import { validateEmail } from '@/utils/validation';

export default function ContentCreator() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Use useEffect to handle mounting state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setError("");
    setIsSubmitted(true);

    // Wait 5 seconds before redirecting
    setTimeout(() => {
      router.push(ROUTES.HOME);
    }, 5000);
  };

  // Only render alert after component is mounted
  const showAlert = isMounted && isSubmitted;

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <Link
            href={ROUTES.HOME}
            className="flex items-center justify-center gap-2 mb-6">
            <VideoCameraIcon className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">VidFlow</span>
          </Link>
          <h2 className="text-3xl font-bold text-[#EE2B2E]">Become a Content Creator</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join our community of amazing content creators
          </p>
        </div>

        {/* Information Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            Before you can become a creator on our platform, we conduct face-to-face video calls 
            to ensure the quality and safety of our community. This helps us maintain a high 
            standard of content and create a better experience for everyone.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                onBlur={(e) => {
                  const validationError = validateEmail(e.target.value);
                  setError(validationError);
                }}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  error ? 'border-red-300' : 'border-gray-300'
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Enter your email address"
                disabled={isSubmitted}
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>
          </div>

          {/* Success Message */}
          {showAlert && (
            <div className="rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-md overflow-hidden animate-fade-in">
              <div className="p-4 bg-green-600 bg-opacity-10">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                    <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-green-800">
                    Application Submitted Successfully!
                  </h3>
                </div>
              </div>
              <div className="px-4 py-3 bg-white bg-opacity-50">
                <p className="text-green-700 font-medium mb-2">
                  Thank you for your interest in becoming a content creator!
                </p>
                <div className="text-sm text-green-600 space-y-1">
                  <p className="flex items-center">
                    <span className="mr-2">•</span>
                    We'll be in contact via email for the next steps
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">•</span>
                    Please check both your inbox and junk folder
                  </p>
                </div>
                <div className="mt-3 text-sm font-medium text-green-600 flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Redirecting to home page...
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitted || !!error}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#008751] hover:bg-[#006B3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitted ? "Application Submitted" : "Apply Now"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href={ROUTES.AUTH.SIGN_IN}
              className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 