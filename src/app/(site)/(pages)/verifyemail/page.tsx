// import Signup from "@/components/Auth/Signup";
import React from "react";

import { Metadata } from "next";
import VerifyEmail from "@/components/Auth/verifyemail";
export const metadata: Metadata = {
  title: "Signup Page | Deelzon Package Booking",
  description: "This is Signup Page for Deelzon Package Booking",
  // other metadata
};

const Verification = () => {
  return (
    <main>
      <VerifyEmail />
    </main>
  );
};

export default Verification;
