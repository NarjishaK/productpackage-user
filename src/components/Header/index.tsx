"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomSelect from "./CustomSelect";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { useLocationContext } from "@/app/context/locationcontext";
import {
  BASE_URL,
  fetchCartItems,
  fetchLogo,
  fetchAllPackageswithProducts,
} from "@/Helper/handleapi";

import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const { openCartModal } = useCartModalContext();
  const { selectedLocation, setSelectedLocation, searchQuery, setSearchQuery } = useLocationContext();
  const [packages, setPackages] = useState([]);
  const product = useAppSelector((state) => state.cartReducer.items);
  const [logo, setLogo] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchLogo()
      .then((data) => {
        setLogo(data);
      })
      .catch((error) => {
        console.error("Error fetching logo:", error);
      });

    fetchAllPackageswithProducts()
      .then((data) => {
        setPackages(data);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });
  }, []);

  const handleOpenCartModal = () => {
    openCartModal();
  };

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  // Get ALL vendors from ALL packages and collect their addresses
  const getAllVendorsFromPackages = () => {
    const allVendors = new Map();

    packages.forEach((packageItem) => {
      const vendor = packageItem?.category?.vendor;
      if (vendor && vendor._id) {
        allVendors.set(vendor._id, vendor);
      }
    });

    return Array.from(allVendors.values());
  };

  // Updated function to get all unique districts from ALL vendors
  const getUniqueDistricts = () => {
    const districts = new Set();
    const allVendors = getAllVendorsFromPackages();

    allVendors.forEach((vendor) => {
      if (vendor.address && Array.isArray(vendor.address)) {
        vendor.address.forEach((addr) => {
          if (addr.district && addr.district.trim() !== "") {
            districts.add(addr.district.trim());
          }
        });
      }
    });
    return Array.from(districts).sort();
  };

  // Create options for dropdown
  const options = [
    { label: "All Location", value: "0" },
    ...getUniqueDistricts().map((district) => ({
      label: district,
      value: district,
    })),
  ];

  // Handle location change
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    // Navigate to shop page when location is selected and not already there
    if (window.location.pathname !== '/shop-with-sidebar') {
      router.push('/shop-with-sidebar');
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to shop page with search
      router.push('/shop-with-sidebar');
    }
  };

  const [customerName, setCustomerName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCustomer = localStorage.getItem("customerDetails");
      if (storedCustomer) {
        try {
          const parsed = JSON.parse(storedCustomer);
          setCustomerName(parsed.name);
        } catch (e) {
          console.error("Error parsing customerDetails from localStorage:", e);
        }
      }
    }
  }, []);

  const guestCartItems = useAppSelector((state) => state.cartReducer.items);
  const guestTotalPrice = useSelector(selectTotalPrice);

  const [customerCartItems, setCustomerCartItems] = useState([]);
  const [useCustomerCart, setUseCustomerCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customerTotalPrice, setCustomerTotalPrice] = useState(0);
  const [customerId, setCustomerId] = useState<string | null>(null);

  // Create a function to refresh customer cart data
  const refreshCustomerCart = useCallback(async () => {
    if (customerId) {
      try {
        const data = await fetchCartItems(customerId);
        setCustomerCartItems(data);
        const total = data.reduce(
          (acc, item) => acc + item?.packageId?.price * item.quantity,
          0
        );
        setCustomerTotalPrice(total);
      } catch (err) {
        console.error("Failed to fetch customer cart", err);
      }
    }
  }, [customerId]);

  useEffect(() => {
    const customerDetailsStr = localStorage.getItem("customerDetails");
    const customerDetails = customerDetailsStr
      ? JSON.parse(customerDetailsStr)
      : null;
    const id = customerDetails?._id || customerDetails?.id;

    if (id) {
      setCustomerId(id);
      setUseCustomerCart(true);
      fetchCartItems(id)
        .then((data) => {
          setCustomerCartItems(data);
          const total = data.reduce(
            (acc, item) => acc + item?.packageId?.price * item.quantity,
            0
          );
          setCustomerTotalPrice(total);
        })
        .catch((err) => {
          console.error("Failed to fetch customer cart", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setUseCustomerCart(false);
      setLoading(false);
    }
  }, []);

  // Listen for cart updates using custom event
  useEffect(() => {
    const handleCartUpdate = () => {
      if (useCustomerCart && customerId) {
        refreshCustomerCart();
      }
    };

    // Listen for cart update events
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [useCustomerCart, customerId, refreshCustomerCart]);

  const displayedItems = useCustomerCart ? customerCartItems : guestCartItems;
  const totalPrice = useCustomerCart ? customerTotalPrice : guestTotalPrice;
  const targetHref = customerName ? "/my-account" : "/signin";

  // Calculate cart count properly
  const cartCount = useCustomerCart ? customerCartItems.length : guestCartItems.length;

  return (
    <header
      className={`fixed left-0 top-0 w-full z-9999 bg-white transition-all ease-in-out duration-300 ${
        stickyMenu && "shadow"
      }`}
    >
      <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
        {/* <!-- header top start --> */}
        <div
          className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-between ease-out duration-200 ${
            stickyMenu ? "py-4" : "py-6"
          }`}
        >
          {/* <!-- header top left --> */}
          <div className="xl:w-auto flex-col sm:flex-row w-full flex sm:justify-between sm:items-center gap-5 sm:gap-10">
            {logo.map((d) => (
              <Link href="/" key={d._id}>
                <img
                  src={`${BASE_URL}/images/${d.image}`}
                  alt="Logo"
                  style={{ width: "140px" }}
                />
              </Link>
            ))}

            <div className="max-w-[475px] w-full">
              <form onSubmit={handleSearch}>
                <div className="flex items-center">
                <CustomSelect 
        options={options} 
      />

      <div className="relative max-w-[333px] sm:min-w-[333px] w-full">
        {/* <!-- divider --> */}
        <span className="absolute left-0 top-1/2 -translate-y-1/2 inline-block w-px h-5.5 bg-gray-4"></span>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          type="search"
          name="search"
          id="search"
          placeholder="Search ..."
          autoComplete="off"
          className="custom-search w-full rounded-r-[5px] bg-gray-1 !border-l-0 border border-gray-3 py-2.5 pl-4 pr-10 outline-none ease-in duration-200"
        />

                    <button
                      type="submit"
                      id="search-btn"
                      aria-label="Search"
                      className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-blue"
                    >
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* <!-- header top right --> */}
          <div className="flex w-full lg:w-auto items-center gap-7.5">
            <div className="hidden xl:flex items-center gap-3.5">
              <i className="bi bi-telephone text-2xl text-blue"></i>

              <div>
                <span className="block text-2xs text-dark-4 uppercase">
                  24/7 SUPPORT
                </span>
                <p className="font-medium text-custom-sm text-dark">
                  (+91) 96455 22822
                </p>
              </div>
            </div>

            {/* <!-- divider --> */}
            <span className="hidden xl:block w-px h-7.5 bg-gray-4"></span>

            <div className="flex w-full lg:w-auto justify-between items-center gap-5">
              <div className="flex items-center gap-5">
                <Link href={targetHref} className="flex items-center gap-2.5">
                  <i className="bi bi-person text-3xl text-blue"></i>

                  <div>
                    <span className="block text-2xs text-dark-4 uppercase">
                      account
                    </span>
                    <p className="font-medium text-custom-sm text-dark">
                      {customerName ? `Hi, ${customerName}` : "Sign In"}
                    </p>
                  </div>
                </Link>

                   <button
        onClick={handleOpenCartModal}
        className="flex items-center gap-2.5"
      >
        <span className="inline-block relative">
          <i className="bi bi-cart-check text-2xl text-blue"></i>
          <span className="flex items-center justify-center font-medium text-2xs absolute -right-2 -top-1.5 bg-blue w-4.5 h-4.5 rounded-full text-white">
            {cartCount}
          </span>
        </span>
        <div>
          <span className="block text-2xs text-dark-4 uppercase">
            cart
          </span>
          <p className="font-medium text-custom-sm text-dark">
            ₹{totalPrice}
          </p>
        </div>
      </button>
              </div>

              {/* <!-- Hamburger Toggle BTN --> */}
              <button
                id="Toggle"
                aria-label="Toggler"
                className="xl:hidden block"
                onClick={() => setNavigationOpen(!navigationOpen)}
              >
                <span className="block relative cursor-pointer w-5.5 h-5.5">
                  <span className="du-block absolute right-0 w-full h-full">
                    <span
                      className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-[0] ${
                        !navigationOpen && "!w-full delay-300"
                      }`}
                    ></span>
                    <span
                      className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-150 ${
                        !navigationOpen && "!w-full delay-400"
                      }`}
                    ></span>
                    <span
                      className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-200 ${
                        !navigationOpen && "!w-full delay-500"
                      }`}
                    ></span>
                  </span>

                  <span className="block absolute right-0 w-full h-full rotate-45">
                    <span
                      className={`block bg-dark rounded-sm ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full ${
                        !navigationOpen && "!h-0 delay-[0] "
                      }`}
                    ></span>
                    <span
                      className={`block bg-dark rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5 ${
                        !navigationOpen && "!h-0 dealy-200"
                      }`}
                    ></span>
                  </span>
                </span>
              </button>
              {/* //   <!-- Hamburger Toggle BTN --> */}
            </div>
          </div>
        </div>
        {/* <!-- header top end --> */}
      </div>

      <div className="border-t border-gray-3">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
          <div className="flex items-center justify-between">
            {/* <!--=== Main Nav Start ===--> */}
            <div
              className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between ${
                navigationOpen &&
                `!visible bg-white shadow-lg border border-gray-3 !h-auto max-h-[400px] overflow-y-scroll rounded-md p-5`
              }`}
            >
              {/* <!-- Main Nav Start --> */}
              <nav>
                <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                  {menuData.map((menuItem, i) =>
                    menuItem.submenu ? (
                      <Dropdown
                        key={i}
                        menuItem={menuItem}
                        stickyMenu={stickyMenu}
                      />
                    ) : (
                      <li
                        key={i}
                        className="group relative before:w-0 before:h-[3px] before:bg-blue before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full "
                      >
                        <Link
                          href={menuItem.path}
                          className={`hover:text-blue text-custom-sm font-medium text-dark flex ${
                            stickyMenu ? "xl:py-4" : "xl:py-6"
                          }`}
                        >
                          {menuItem.title}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </nav>
              {/* //   <!-- Main Nav End --> */}
            </div>
            <div className="hidden xl:block">
              <ul className="flex items-center gap-5.5"></ul>
            </div>
            {/* <!--=== Nav Right End ===--> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;