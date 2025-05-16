import React from "react";
import Checkout from "@/components/Checkout";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Deelzon Checkout Page | Deelzon Package Booking ",
  description: " This is Deelzon Checkout Page for – Seamless E-commerce Package Booking & Easy Claim Process",

};

const CheckoutPage = () => {
  return (
    <main>
      <Checkout />
    </main>
  );
};

export default CheckoutPage;
