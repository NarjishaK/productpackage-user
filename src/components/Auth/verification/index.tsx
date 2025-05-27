"use client";

import React, { useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Swal from "sweetalert2";
import { BASE_URL } from "@/Helper/handleapi";

const VerificationPending = () => {
  const [isResending, setIsResending] = useState(false);

  const handleResendVerification = async () => {
    const { value: email } = await Swal.fire({
      title: 'Resend Verification Email',
      input: 'email',
      inputLabel: 'Enter your email address',
      inputPlaceholder: 'your.email@example.com',
      showCancelButton: true,
      confirmButtonText: 'Send',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter an email address!';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address!';
        }
      }
    });

    if (email) {
      setIsResending(true);
      try {
        const response = await fetch(`${BASE_URL}/customer/resend-verification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Email Sent!",
            text: "Please check your email for the new verification link.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to Send",
            text: data.message || "Failed to send verification email",
          });
        }
      } catch (error) {
        console.error("Error resending verification:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again.",
        });
      } finally {
        setIsResending(false);
      }
    }
  };

  return (
    <>
      <Breadcrumb title={"Verification Pending"} pages={["Verification Pending"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center">
              <div className="mb-8">
                <svg className="mx-auto h-16 w-16 text-blue mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>

              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-4">
                Check Your Email
              </h2>
              
              <div className="mb-8">
                <p className="text-gray-600 mb-4">
                  We've sent a verification email to your inbox. Please check your email and click the verification link to activate your account.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-800 mb-2">What to do next:</h3>
                  <ol className="text-sm text-blue-700 text-left space-y-2">
                    <li>1. Check your email inbox (and spam folder)</li>
                    <li>2. Look for an email with the subject "Email Verification - Complete Your Registration"</li>
                    <li>3. Click the verification link in the email</li>
                    <li>4. Once verified, you can sign in to your account</li>
                  </ol>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                  The verification link will expire in 24 hours for security reasons.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="w-full bg-blue text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isResending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Didn't receive the email? Resend it"
                  )}
                </button>

                <div className="flex space-x-4">
                  <Link 
                    href="/signin" 
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 text-center"
                  >
                    Go to Sign In
                  </Link>
                  
                  <Link 
                    href="/" 
                    className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 text-center"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Having trouble? Contact our support team for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerificationPending;