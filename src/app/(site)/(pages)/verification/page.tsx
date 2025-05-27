// import Signup from "@/components/Auth/Signup";
import React from "react";

import { Metadata } from "next";
import VerificationPending from "@/components/Auth/verification";
export const metadata: Metadata = {
  title: "Signup Page | Deelzon Package Booking",
  description: "This is Signup Page for Deelzon Package Booking",
  // other metadata
};

const Verification = () => {
  return (
    <main>
      <VerificationPending />
    </main>
  );
};

export default Verification;
