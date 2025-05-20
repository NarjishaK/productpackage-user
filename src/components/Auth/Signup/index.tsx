"use client";

import React, { useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Customersignup } from "@/Helper/handleapi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      // alert("Passwords do not match.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    try {
      const { name, email, password, phone } = values;
      const response = await Customersignup({ name, email, password, phone });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Account created successfully!",
      });
      window.location.href = "/signin";
      // Optionally, redirect or reset form
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: "Something went wrong,Do not use a registered email and phone number. Please try again.",
      });
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
              <p>Enter your detail below</p>
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
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
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
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5">
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
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
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
                  placeholder="Enter your password"
                  required
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
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
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-dark text-white py-3 px-6 rounded-lg hover:bg-blue mt-7.5"
              >
                Create Account
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
