"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Swal from "sweetalert2";
import { BASE_URL } from "@/Helper/handleapi";

const EmailVerification = () => {
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");
  const [isResending, setIsResending] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setStatus("error");
      setMessage("Invalid verification link");
    }
  }, [token]);

  const verifyEmail = async (verificationToken) => {
    try {
      const response = await fetch(`${BASE_URL}/customer/verifyemail/customer?token=${verificationToken}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        
        // Show success message and redirect after 3 seconds
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Email Verified!",
            text: "Your account is now active. You can sign in now.",
            confirmButtonText: "Go to Sign In"
          }).then(() => {
            router.push("/signin");
          });
        }, 2000);
      } else {
        setStatus("error");
        setMessage(data.message || "Email verification failed");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

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

  const renderContent = () => {
    switch (status) {
      case "verifying":
        return (
          <div className="text-center">
            <div className="mb-6">
              <svg className="animate-spin mx-auto h-12 w-12 text-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="font-semibold text-xl sm:text-2xl text-dark mb-2">
              Verifying Your Email...
            </h2>
            <p className="text-gray-600">Please wait while we verify your email address.</p>
          </div>
        );

      case "success":
        return (
          <div className="text-center">
            <div className="mb-6">
              <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="font-semibold text-xl sm:text-2xl text-dark mb-2">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">Redirecting you to sign in page...</p>
          </div>
        );

      case "error":
        return (
          <div className="text-center">
            <div className="mb-6">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h2 className="font-semibold text-xl sm:text-2xl text-dark mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            
            <div className="space-y-3">
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
                  "Resend Verification Email"
                )}
              </button>
              
              <button
                onClick={() => router.push("/")}
                className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Breadcrumb title={"Email Verification"} pages={["Email Verification"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            {renderContent()}
          </div>
        </div>
      </section>
    </>
  );
};

export default EmailVerification;