import Forgetpassword from "@/components/Auth/Forgetpassword";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signup Page | Deelzon Package Booking",
  description: "This is Signup Page for Deelzon Package Booking",
  // other metadata
};

const SignupPage = () => {
  return (
    <main>
      <Forgetpassword />
    </main>
  );
};

export default SignupPage;
