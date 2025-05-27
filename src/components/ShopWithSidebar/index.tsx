"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";
import { fetchAllPackageswithProducts } from "@/Helper/handleapi";
import { useLocationContext } from "@/app/context/locationcontext";

const ShopWithSidebar = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const { selectedLocation, searchQuery } = useLocationContext();


  useEffect(() => {
    fetchAllPackageswithProducts()
      .then((data) => {
        setAllPackages(data);
        setFilteredPackages(data);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });
  }, []);

  // Filter packages based on selected location and search query
  useEffect(() => {
    let filtered = [...allPackages];

    // Filter by location
    if (selectedLocation && selectedLocation !== "0") {
      filtered = filtered.filter((packageItem) => {
        const vendor = packageItem?.category?.vendor;
        if (!vendor || !vendor.address) return false;
        
        return vendor.address.some((addr: any) => 
          addr.district && addr.district.trim().toLowerCase() === selectedLocation.toLowerCase()
        );
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((packageItem) => 
        packageItem.name?.toLowerCase().includes(query) ||
        packageItem.description?.toLowerCase().includes(query) ||
        packageItem.category?.name?.toLowerCase().includes(query) ||
        packageItem.category?.vendor?.name?.toLowerCase().includes(query)
      );
    }
    
    setFilteredPackages(filtered);
  }, [allPackages, selectedLocation, searchQuery]);

  useEffect(() => {
    // closing sidebar while clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as Element).closest(".sidebar-content")) {
        setProductSidebar(false);
      }
    }

    if (productSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productSidebar]);

  return (
    <>
      <Breadcrumb
        title={"Explore All Packages"}
        pages={["shop", "/", "shop with sidebar"]}
      />
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            <div className="w-full">
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  {/* <!-- top bar left --> */}
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="text-sm text-gray-600">
                      Showing {filteredPackages.length} of {allPackages.length}{" "}
                      packages
                    </p>
                  </div>

                  {/* <!-- top bar right --> */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setProductStyle("grid")}
                      aria-label="button for product grid tab"
                      className={`${
                        productStyle === "grid"
                          ? "bg-blue border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                    >
                     <i className="bi bi-grid"></i>
                    </button>

                    <button
                      onClick={() => setProductStyle("list")}
                      aria-label="button for product list tab"
                      className={`${
                        productStyle === "list"
                          ? "bg-blue border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                    >
                     <i className="bi bi-layout-split"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid Tab Content Start */}
              <div
                className={`${
                  productStyle === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9"
                    : "flex flex-col gap-7.5"
                }`}
              >
                {filteredPackages.length > 0 ? (
                  filteredPackages.map((item, key) =>
                    productStyle === "grid" ? (
                      <SingleGridItem item={item} key={key} />
                    ) : (
                      <SingleListItem item={item} key={key} />
                    )
                  )
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-gray-600">
                      No packages found matching your criteria.
                    </p>
                    {(selectedLocation !== "0" || searchQuery) && (
                      <p className="text-sm text-gray-500 mt-2">
                        Try adjusting your filters or search terms.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* <!-- Products Pagination End --> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebar;