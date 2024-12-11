"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VideoCameraIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ROUTES } from '@/config/routes';
import { validatePassword, validateConfirmPassword } from '@/utils/validation';

export default function ChangePassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [isUpdating, setIsUpdating] = useState(false);

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
      case "currentPassword":
        error = validatePassword(formData.currentPassword);
        break;
      case "newPassword":
        error = validatePassword(formData.newPassword);
        if (formData.confirmNewPassword) {
          setErrors(prev => ({
            ...prev,
            confirmNewPassword: validateConfirmPassword(formData.newPassword, formData.confirmNewPassword)
          }));
        }
        break;
      case "confirmNewPassword":
        error = validateConfirmPassword(formData.newPassword, formData.confirmNewPassword);
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      currentPassword: validatePassword(formData.currentPassword),
      newPassword: validatePassword(formData.newPassword),
      confirmNewPassword: validateConfirmPassword(formData.newPassword, formData.confirmNewPassword),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== "")) {
      return;
    }

    setIsUpdating(true);
    try {
      // Implement password change logic here
      console.log("Changing password:", formData);
      
      // If successful, redirect to profile or dashboard
      router.push(ROUTES.HOME);
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        currentPassword: "Failed to update password. Please try again.",
      }));
    } finally {
      setIsUpdating(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
          <h2 className="text-3xl font-bold text-[#EE2B2E]">Change Password</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Update your password to keep your account secure
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            {/* Current Password Field */}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPasswords.currentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur("currentPassword")}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10`}
                  placeholder="Enter current password"
                  disabled={isUpdating}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showPasswords.currentPassword ? "Hide password" : "Show password"}
                >
                  {showPasswords.currentPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
              )}
            </div>

            {/* New Password Field */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPasswords.newPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur("newPassword")}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.newPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10`}
                  placeholder="Enter new password"
                  disabled={isUpdating}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showPasswords.newPassword ? "Hide password" : "Show password"}
                >
                  {showPasswords.newPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirm New Password Field */}
            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type={showPasswords.confirmNewPassword ? "text" : "password"}
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur("confirmNewPassword")}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.confirmNewPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10`}
                  placeholder="Confirm new password"
                  disabled={isUpdating}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmNewPassword")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showPasswords.confirmNewPassword ? "Hide password" : "Show password"}
                >
                  {showPasswords.confirmNewPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmNewPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmNewPassword}</p>
              )}
            </div>
          </div>

          {/* Password Requirements */}
          <div className="rounded-md bg-gray-50 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Password must contain:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>At least 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character (!@#$%^&*)</li>
            </ul>
          </div>

          <div>
            <button
              type="submit"
              disabled={isUpdating || hasErrors}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#008751] hover:bg-[#006B3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
              {isUpdating ? "Updating Password..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 