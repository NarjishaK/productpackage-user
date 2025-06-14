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
      // className="w-full max-w-screen-xl mx-auto"
    >
      {allBanners.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="">
                <img
                  src={`${BASE_URL}/images/${item.image}`}
                  alt={item.title}
                 
                  // className="object-cover rounded-lg"
                />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
