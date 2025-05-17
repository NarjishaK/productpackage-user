import React from "react";
import Image from "next/image";

const featureData = [
    // {
  //   img: "/images/icons/icon-01.svg",
  //   title: "Free Shipping",
  //   description: "For all orders $200",
  // },
  // {
  //   img: "/images/icons/icon-02.svg",
  //   title: "1 & 1 Returns",
  //   description: "Cancellation after 1 day",
  // },
  {
    img: "/images/icons/icon-03.svg",
    title: "100% Secure Payments",
    description: "Guarantee secure payments",
  },
  {
    img: "/images/icons/icon-04.svg",
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start gap-6 mt-10">
        {featureData.map((item, key) => (
          <div className="flex items-start gap-4 w-full sm:w-[calc(50%-12px)] lg:w-auto" key={key}>
            <Image src={item.img} alt="icon" width={40} height={41} />

            <div>
              <h3 className="font-medium text-base md:text-lg text-dark">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
