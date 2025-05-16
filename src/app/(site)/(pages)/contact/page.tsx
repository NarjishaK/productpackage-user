import Contact from "@/components/Contact";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Deelzon Contact Page | Deelzon Package Booking ",
  description: " This is Deelzon Contact Page for – Seamless E-commerce Package Booking & Easy Claim Process",

  // other metadata
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
