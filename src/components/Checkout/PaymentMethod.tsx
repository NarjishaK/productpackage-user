import React, { useState } from "react";
import Image from "next/image";

// Payment Method Component (Enhanced)
const PaymentMethod = ({ selectedPayment, onPaymentChange }) => {
  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Payment Method</h3>
      </div>

      <div className="p-4 sm:p-8.5">
        <div className="flex flex-col gap-3">
          {/* <label
            htmlFor="Razorpay"
            className="flex cursor-pointer select-none items-center gap-4"
          >
            <div className="relative">
              <input
                type="radio"
                name="paymentMethod"
                id="Razorpay"
                value="Razorpay"
                checked={selectedPayment === "Razorpay"}
                onChange={(e) => onPaymentChange(e.target.value)}
                className="sr-only"
              />
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  selectedPayment === "Razorpay"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>

            <div
              className={`rounded-md border-[0.5px] py-3.5 px-5 ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none ${
                selectedPayment === "Razorpay"
                  ? "border-transparent bg-gray-2"
                  : " border-gray-4 shadow-1"
              }`}
            >
              <div className="flex items-center">
                <div className="pr-2.5">
                  <svg width="29" height="12" viewBox="0 0 29 12" fill="none">
                    <rect width="29" height="12" rx="2" fill="#3C50E0"/>
                    <text x="14.5" y="8" textAnchor="middle" fill="white" fontSize="8">Pay</text>
                  </svg>
                </div>
                <div className="border-l border-gray-4 pl-2.5">
                  <p>Razor Pay</p>
                </div>
              </div>
            </div>
          </label> */}

          <label
            htmlFor="COD"
            className="flex cursor-pointer select-none items-center gap-4"
          >
            <div className="relative">
              <input
                type="radio"
                name="paymentMethod"
                id="COD"
                value="COD"
                checked={selectedPayment === "COD"}
                onChange={(e) => onPaymentChange(e.target.value)}
                className="sr-only"
              />
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  selectedPayment === "COD"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>

            <div
              className={`rounded-md border-[0.5px] py-3.5 px-5 ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none min-w-[240px] ${
                selectedPayment === "COD"
                  ? "border-transparent bg-gray-2"
                  : " border-gray-4 shadow-1"
              }`}
            >
              <div className="flex items-center">
                <div className="pr-2.5">
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <circle cx="10.5" cy="10.5" r="10.5" fill="#10B981"/>
                    <path d="M6 10.5L9 13.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="border-l border-gray-4 pl-2.5">
                  <p>Cash on delivery</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
