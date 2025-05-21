import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Package Details Page | Deeelzon Package Booking",
  description: "This is Package Details Page for Deelzon Package Booking",
  // other metadata
};

const ShopDetailsPage = () => {
  return (
    <main>
      <ShopDetails/>
    </main>
  );
};

export default ShopDetailsPage;
