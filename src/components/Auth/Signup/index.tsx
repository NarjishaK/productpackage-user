"use client";

import React, { useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Customersignup } from "@/Helper/handleapi";
import Swal from "sweetalert2";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (values.password !== values.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      setIsLoading(false);
      return;
    }

    // Basic password validation
    if (values.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters long!",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { name, email, password, phone } = values;
      const response = await Customersignup({ name, email, password, phone });

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        html: `
          <p>Your account has been created successfully!</p>
          <p><strong>Please check your email</strong> to verify your account.</p>
          <p>You won't be able to sign in until you verify your email address.</p>
        `,
        confirmButtonText: "Got it!",
        allowOutsideClick: false
      }).then(() => {
        // Reset form
        setValues({
          name: "",
          email: "",
          password: "",
          phone: "",
          confirmPassword: "",
        });
        // Redirect to a verification pending page or signin with message
        window.location.href = "/verification";
      });

    } catch (err) {
      console.error(err);
      
      let errorMessage = "Something went wrong. Please try again.";
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb title={"Signup"} pages={["Signup"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Create an Account
              </h2>
              <p>Enter your details below to get started</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className="block mb-2.5">
                  Full Name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 disabled:opacity-50"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5">
                  Email Address <span className="text-red">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 disabled:opacity-50"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="phone" className="block mb-2.5">
                  Phone <span className="text-red">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  disabled={isLoading}
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 disabled:opacity-50"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5">
                  Password <span className="text-red">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter your password (min. 6 characters)"
                  required
                  disabled={isLoading}
                  // minLength="6"
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 disabled:opacity-50"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="confirmPassword" className="block mb-2.5">
                  Re-type Password <span className="text-red">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-type your password"
                  required
                  disabled={isLoading}
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-dark text-white py-3 px-6 rounded-lg hover:bg-blue mt-7.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center mt-6">
                Already have an account?
                <Link href="/signin" className="text-dark hover:text-blue pl-2">
                  Sign in Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;