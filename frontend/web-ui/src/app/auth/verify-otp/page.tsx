"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { ROUTES } from '@/config/routes';
import { validateOTP } from '@/utils/validation';

export default function VerifyOtp() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pastedData)) {
      setError("Verification code can only contain numbers");
      return;
    }

    const digits = pastedData.split("");
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 4) newOtp[index] = digit;
    });
    setOtp(newOtp);
    setError("");

    // Focus last filled input or next empty input
    const lastIndex = Math.min(digits.length, 4) - 1;
    if (lastIndex >= 0) {
      const nextInput = document.getElementById(`otp-${lastIndex}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateOTP(otp);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsVerifying(true);
    try {
      // Implement OTP verification logic here
      console.log("Verifying OTP:", otp.join(""));
      
      // If verification successful, redirect to reset password page
      router.push(ROUTES.AUTH.RESET_PASSWORD);
    } catch (err) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = () => {
    // Implement resend code logic
    setOtp(["", "", "", ""]);
    setError("");
    console.log("Resending verification code");
  };

  // Focus first input on mount
  useEffect(() => {
    const firstInput = document.getElementById("otp-0");
    firstInput?.focus();
  }, []);

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
          <h2 className="text-3xl font-bold text-[#EE2B2E]">
            Enter verification code
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            We've sent a 4-digit code to your email
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-14 h-14 text-center text-2xl font-semibold border 
                  ${error ? 'border-red-300' : 'border-gray-300'}
                  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                aria-label={`Digit ${index + 1}`}
                disabled={isVerifying}
              />
            ))}
          </div>

          <div>
            <button
              type="submit"
              disabled={isVerifying || otp.some(digit => !digit) || !!error}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#008751] hover:bg-[#006B3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
              {isVerifying ? "Verifying..." : "Verify Code"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isVerifying}
                className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Resend code
              </button>
            </p>
          </div>

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
        </form>
      </div>
    </div>
  );
} 