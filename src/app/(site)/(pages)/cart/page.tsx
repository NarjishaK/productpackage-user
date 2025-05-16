import React from "react";
import Cart from "@/components/Cart";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Deelzon Cart Page | Deelzon Package Booking ",
  description: " This is Deelzon Cart Page for – Seamless E-commerce Package Booking & Easy Claim Process",

  // other metadata
};

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;
