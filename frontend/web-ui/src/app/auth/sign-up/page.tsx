"use client";

import React, { useState } from "react";
import Link from "next/link";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { ROUTES } from '@/config/routes';
import { 
  validateEmail, 
  validatePassword, 
  validateUsername, 
  validateConfirmPassword 
} from '@/utils/validation';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    let error = "";
    switch (field) {
      case "email":
        error = validateEmail(formData.email);
        break;
      case "password":
        error = validatePassword(formData.password);
        // Also validate confirm password if it has a value
        if (formData.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword)
          }));
        }
        break;
      case "confirmPassword":
        error = validateConfirmPassword(formData.password, formData.confirmPassword);
        break;
      case "username":
        error = validateUsername(formData.username);
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
      username: validateUsername(formData.username),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== "")) {
      return;
    }

    // Implement sign up functionality
    console.log("Signing up with:", formData);
  };

  const hasErrors = Object.values(errors).some(error => error !== "");

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
          <h2 className="text-3xl font-bold text-[#EE2B2E]">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">to continue to VidFlow</p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Want to be a content creator?{" "}
            <Link
              href={ROUTES.AUTH.CONTENT_CREATOR.APPLY}
              className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
              Apply here
            </Link>
          </p>
        </div>

        {/* Sign Up Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={() => handleBlur("username")}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.username ? 'border-red-300' : 'border-gray-300'
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur("confirmPassword")}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={hasErrors}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#008751] hover:bg-[#006B3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
              Create Account
            </button>
          </div>

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

          <div className="text-xs text-center text-gray-500">
            By signing up, you agree to our{" "}
            <Link 
              href="/terms" 
              className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link 
              href="/privacy" 
              className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
              Privacy Policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
