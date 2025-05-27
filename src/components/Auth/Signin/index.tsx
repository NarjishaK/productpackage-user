"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React, { useState } from "react";
import { loginCustomer } from "@/Helper/handleapi";
import Swal from "sweetalert2";

const Signin = () => {
  const [values, handleChange] = useState({
    email: "",
    password: "",
  });

  // Login function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email and password are required!",
      });
      return;
    }

    try {
      const response = await loginCustomer({
        email: values.email,
        password: values.password,
      });

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem(
          "customerDetails",
          JSON.stringify(response.customerDetails)
        );
        window.location.href = "/";
      } else if (response.message === "Your account is blocked") {
        Swal.fire({
          icon: "error",
          title: "Account Blocked",
          text: "Your account has been blocked. Please contact support.",
        });
      } else if (response.emailNotVerified) {
        // Handle email not verified case
        Swal.fire({
          icon: "warning",
          title: "Email Not Verified",
          text: response.message || "Please verify your email before logging in. Check your Email for the verification link.",
          showCancelButton: true,
          confirmButtonText: "OKAY",
          cancelButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // You can add logic here to resend verification email
            // For example: resendVerificationEmail(values.email);
            console.log("Resend verification email for:", values.email);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid credentials!",
        });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const { emailNotVerified, message } = err.response.data;
        
        if (emailNotVerified) {
          // Handle email not verified from error response
          Swal.fire({
            icon: "warning",
            title: "Email Not Verified",
            text: message || "Please verify your email before logging in. Check your Email for the verification link.",
            showCancelButton: true,
            confirmButtonText: "OKAY",
            cancelButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              // You can add logic here to resend verification email
              console.log("Resend verification email for:", values.email);
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: message || "Login failed. Please try again.",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login failed. Please check your credentials and try again.",
        });
      }
    }
  };

  return (
    <>
      <Breadcrumb title={"Signin"} pages={["Signin"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Sign In to Your Account
              </h2>
              <p>Enter your detail below</p>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2.5">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    onChange={(e) =>
                      handleChange({ ...values, email: e.target.value })
                    }
                    id="email"
                    placeholder="Enter your email"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) =>
                      handleChange({ ...values, password: e.target.value })
                    }
                    placeholder="Enter your password"
                    autoComplete="on"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                >
                  Sign in to account
                </button>

                <a
                  href="#"
                  className="block text-center text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark"
                >
                  Forget your password?
                </a>

                <p className="text-center mt-6">
                  Don&apos;t have an account?
                  <Link
                    href="/signup"
                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                  >
                    Sign Up Now!
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;