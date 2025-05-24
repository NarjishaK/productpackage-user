import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/Helper/handleapi";

// Billing Component (Enhanced)
const Billing = ({ onBillingChange, billingData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onBillingChange({ ...billingData, [name]: value });
  };

  return (
    <div className="mt-9">
      <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">
        Billing details
      </h2>

      <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
          <div className="w-full">
            <label htmlFor="firstName" className="block mb-2.5">
              First Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={billingData.firstName || ''}
              onChange={handleInputChange}
              placeholder="John"
              required
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="country" className="block mb-2.5">
            Country/ Region <span className="text-red">*</span>
          </label>
          <div className="relative">
            <select 
              name="country"
              value={billingData.country || ''}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-1 rounded-md border border-gray-3 text-dark-4 py-3 pl-5 pr-9 duration-200 appearance-none outline-none focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="address" className="block mb-2.5">
            Street Address <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={billingData.address || ''}
            onChange={handleInputChange}
            placeholder="House number and street name"
            required
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
          <div className="mt-5">
            <input
              type="text"
              name="address1"
              id="address1"
              value={billingData.address1 || ''}
              onChange={handleInputChange}
              placeholder="Apartment, suite, unit, etc. (optional)"
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="city" className="block mb-2.5">
            Town/ City <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={billingData.city || ''}
            onChange={handleInputChange}
            required
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="flex gap-5 mb-5">
          <div className="w-full">
            <label htmlFor="state" className="block mb-2.5">
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              value={billingData.state || ''}
              onChange={handleInputChange}
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>
          <div className="w-full">
            <label htmlFor="pincode" className="block mb-2.5">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              id="pincode"
              value={billingData.pincode || ''}
              onChange={handleInputChange}
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2.5">
            Phone <span className="text-red">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={billingData.phone || ''}
            onChange={handleInputChange}
            required
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="mb-5.5">
          <label htmlFor="email" className="block mb-2.5">
            Email Address <span className="text-red">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={billingData.email || ''}
            onChange={handleInputChange}
            required
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>
      </div>
    </div>
  );
};

export default Billing;
