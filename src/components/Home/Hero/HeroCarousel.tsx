"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BASE_URL, fetchBanners } from "@/Helper/handleapi";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeroCarousal = () => {
  const [allBanners, setAllBanners] = useState([]);

  useEffect(() => {
    fetchBanners()
      .then((data) => {
        setAllBanners(data);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      });
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="w-full max-w-screen-xl mx-auto"
    >
      {allBanners.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col-reverse sm:flex-row items-center gap-8 p-6 sm:p-12">
            {/* Text Content */}
            <div className="sm:w-1/2 text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
                {item.title}
              </h1>
              <p className="text-gray-600 mb-6">{item.description}</p>
            </div>

            {/* Image */}
            <div className="sm:w-1/2 w-full">
              <div className="relative w-full h-64 sm:h-96">
                <img
                  src={`${BASE_URL}/images/${item.image}`}
                  alt={item.title}
                 
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
