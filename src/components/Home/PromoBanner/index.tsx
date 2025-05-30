"use client";
import React, { useEffect, useState } from "react";
import { BASE_URL, fetchProducts } from "@/Helper/handleapi";

const PromoBanner = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const filtered = data.filter(
          (product) => product.description && product.description.trim() !== ""
        );
        setProducts(filtered.slice(0, 3)); // Limit to first 3 products
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section 1 */}
        {products[0] && (
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-12.5 lg:py-17.5 xl:py-22.5 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-7.5">
            <div className="max-w-[550px] w-full">
              <span className="block font-medium text-xl text-dark mb-3">
                {products[0] && products[0].title}
              </span>
              <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
                {products[0] && products[0].description}
              </h2>
              <p>{products[0] && products[0].about}</p>
              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-blue py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
              >
                View All
              </a>
            </div>

            <img
              src={`${BASE_URL}/images/${products[0].coverimage}`}
              alt="promo img"
              className="absolute bottom-0 right-4 lg:right-0 -z-1"
              // width={274}
              // height={350}
              width={500}
              height={500}
            />
          </div>
        )}
        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          {/* Section 2 */}
           {products[1] && (
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
           
              <img
                src={`${BASE_URL}/images/${products[1].coverimage}`}
                alt="promo img"
                className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-10 -z-1"
                width={241}
                height={241}
              />
            
            <div className="text-right">
              <span className="block text-lg text-dark mb-1.5">
               {products[1] && products[1].title}
              </span>
              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                {products[1] && products[1].about}
              </h2>
              <p className="font-semibold text-custom-1 text-teal">
                {products[1] && products[1].description}
              </p>
              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
              >
                Grab Now
              </a>
            </div>
          </div>
          )}

          {/* Section 3 */}
          {products[2] && (
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            
              <img
                src={`${BASE_URL}/images/${products[2].coverimage}`}
                alt="promo img"
                className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1"
                width={200}
                height={200}
              />
           
            <div>
              <span className="block text-lg text-dark mb-1.5">
                {products[2] && products[2].title}
              </span>
              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
               <span className="text-orange">{products[2] && products[2].description}</span> 
              </h2>
              <p className="max-w-[285px] text-custom-sm">
                {products[2] && products[2].about}
              </p>
              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-orange py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-orange-dark mt-7.5"
              >
                Buy Now
              </a>
            </div>
          </div>
           )}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
