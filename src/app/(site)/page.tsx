import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deelzon | Deelzon Package Booking ",
  description: "Deelzon – Seamless E-commerce Package Booking & Easy Claim Process",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
