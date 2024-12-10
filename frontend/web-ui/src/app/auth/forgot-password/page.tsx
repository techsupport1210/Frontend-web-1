"use client";

import React, { useState } from "react";
import Link from "next/link";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { ROUTES } from '@/config/routes';
import { validateEmail } from '@/utils/validation';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handleBlur = () => {
    const validationError = validateEmail(email);
    setError(validationError);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    // Implement password reset functionality
    console.log("Requesting password reset for:", email);
    setIsSubmitted(true);
  };

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
          <h2 className="text-3xl font-bold text-[#EE2B2E]">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {!isSubmitted
              ? "Enter your email address and we'll send you a link to reset your password."
              : "Check your email for a link to reset your password."}
          </p>
        </div>

        {!isSubmitted ? (
          /* Password Reset Form */
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    error ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your email address"
                />
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!!error}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#008751] hover:bg-[#006B3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
                Send reset link
              </button>
            </div>
          </form>
        ) : (
          /* Success Message */
          <div className="mt-8 space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                If an account exists for {email}, you will receive an email with a verification code.
                Please check your email and enter the code on the next page.
              </p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
                setError("");
              }}
              className="w-full text-sm text-blue-600 hover:text-blue-500">
              Try another email
            </button>
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              href={ROUTES.AUTH.SIGN_IN}
              className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
              Sign in
            </Link>
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href={ROUTES.AUTH.SIGN_UP}
              className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
