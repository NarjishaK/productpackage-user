"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import RecentlyViewdItems from "./RecentlyViewd";
import { useParams } from "next/navigation";

const ShopDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("tabOne");

  const tabs = [
    {
      id: "tabOne",
      title: "Description",
    },
    {
      id: "tabTwo",
      title: "Additional Information",
    },
    {
      id: "tabThree",
      title: "Reviews",
    },
  ];




  return (
    <>
      <Breadcrumb title={"Package Details"} pages={["shop details"]} />

    
        <>
              <div>
                <div
                  className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 ${
                    activeTab === "tabThree" ? "flex" : "hidden"
                  }`}
                >
                  <div className="max-w-[570px] w-full">
                    <h2 className="font-medium text-2xl text-dark mb-9">
                      03 Review for this product
                    </h2>

                    <div className="flex flex-col gap-6">
                      {/* <!-- review item --> */}
                      <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <a href="#" className="flex items-center gap-4">
                            <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                              <Image
                                src="/images/users/user-01.jpg"
                                alt="author"
                                className="w-12.5 h-12.5 rounded-full overflow-hidden"
                                width={50}
                                height={50}
                              />
                            </div>

                            <div>
                              <h3 className="font-medium text-dark">
                                Davis Dorwart
                              </h3>
                              <p className="text-custom-sm">
                                Serial Entrepreneur
                              </p>
                            </div>
                          </a>

                          <div className="flex items-center gap-1">
                           

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>
                          </div>
                        </div>

                        <p className="text-dark mt-6">
                          “Lorem ipsum dolor sit amet, adipiscing elit. Donec
                          malesuada justo vitaeaugue suscipit beautiful
                          vehicula’’
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="max-w-[550px] w-full">
                    <form>
                      <h2 className="font-medium text-2xl text-dark mb-3.5">
                        Add a Review
                      </h2>

                      <p className="mb-6">
                        Your email address will not be published. Required
                        fields are marked *
                      </p>

                      <div className="flex items-center gap-3 mb-7.5">
                        <span>Your Rating*</span>

                        <div className="flex items-center gap-1">
                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-gray-5">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-gray-5">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                        <div className="mb-5">
                          <label htmlFor="comments" className="block mb-2.5">
                            Comments
                          </label>

                          <textarea
                            name="comments"
                            id="comments"
                            rows={5}
                            placeholder="Your comments"
                            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          ></textarea>

                          <span className="flex items-center justify-between mt-2.5">
                            <span className="text-custom-sm text-dark-4">
                              Maximum
                            </span>
                            <span className="text-custom-sm text-dark-4">
                              0/250
                            </span>
                          </span>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-5 sm:gap-7.5 mb-5.5">
                          <div>
                            <label htmlFor="name" className="block mb-2.5">
                              Name
                            </label>

                            <input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Your name"
                              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block mb-2.5">
                              Email
                            </label>

                            <input
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Your email"
                              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                        >
                          Submit Reviews
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
        </>
    </>
  );
};

export default ShopDetails;
