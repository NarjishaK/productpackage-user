"use client";
import React, { useEffect, useState } from "react";

import { useModalContext } from "@/app/context/QuickViewModalContext";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";
import { BASE_URL, fetchPackageWithProducts } from "@/Helper/handleapi";
import Swal from "sweetalert2";

const QuickViewModal = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const [quantity, setQuantity] = useState(1);
  const [packageProducts, setPackageProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch<AppDispatch>();

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  // get the product data
  const product = useAppSelector((state) => state.quickViewReducer.value);
  const [isCustomer, setIsCustomer] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);

  useEffect(() => {
    // Check if customer details exist in localStorage
    const customerDetailsStr = localStorage.getItem("customerDetails");
    if (customerDetailsStr) {
      try {
        const customerDetails = JSON.parse(customerDetailsStr);
        setIsCustomer(true);
        setCustomerId(customerDetails._id || customerDetails.id);
      } catch (error) {
        console.error("Error parsing customer details:", error);
        setIsCustomer(false);
      }
    }
  }, []);
  // add to cart
  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);

    if (isCustomer && customerId) {
      try {
        // Make API call to add product to customer cart
        const response = await fetch(`${BASE_URL}/customercart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: customerId,
            packageId: product._id,
            quantity: quantity,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add to customer cart");
        }

        const result = await response.json();
        console.log("Product added to customer cart successfully", result);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product added to cart successfully!",
        });
        closeModal();
      } catch (error) {
        console.error("Error adding to customer cart:", error);
        // Fallback to guest cart in case of API failure
        addToGuestCart();
      }
    } else {
      // If no customer details, use guest cart
      addToGuestCart();
    }

    setIsAddingToCart(false);
  };

  // Add to guest cart through Redux
  const addToGuestCart = () => {
    dispatch(
      addItemToCart({
        ...product,
        quantity: quantity,
      })
    );
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Product added to cart successfully!",
    });
  };

  // Fetch package products
  useEffect(() => {
    const getPackageProducts = async () => {
      if (!product?._id || !isModalOpen) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchPackageWithProducts(product._id);
        console.log("Package data:", data); // Debug log

        if (data && data.products) {
          setPackageProducts(data.products);
        } else {
          setPackageProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch package products:", error);
        setError("Failed to load package products");
        setPackageProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getPackageProducts();
  }, [isModalOpen, product?._id]);

  // Handle modal close and cleanup
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setQuantity(1);
      setPackageProducts([]);
      setError(null);
    };
  }, [isModalOpen, closeModal]);

  // Don't render if no product data
  if (!product) {
    return null;
  }

  return (
    <div
      className={`${
        isModalOpen ? "z-99999" : "hidden"
      } fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5`}
    >
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
          <button
            onClick={() => closeModal()}
            aria-label="button for close modal"
            className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
          >
            <svg
              className="fill-current"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083C19.0543 6.59895 18.8189 6.50262 18.5737 6.50262C18.3285 6.50262 18.0932 6.59895 17.9183 6.77083L13 11.6892L8.08164 6.77083C7.90679 6.59895 7.67142 6.50262 7.42623 6.50262C7.18104 6.50262 6.94566 6.59895 6.77081 6.77083C6.41331 7.12833 6.41331 7.72417 6.77081 8.08167L11.6891 13L6.77081 17.9183C6.41331 18.2758 6.41331 18.8717 6.77081 19.2292C7.12831 19.5867 7.72414 19.5867 8.08164 19.2292L13 14.3108L17.9183 19.2292C18.2758 19.5867 18.8716 19.5867 19.2291 19.2292C19.5866 18.8717 19.5866 18.2758 19.2291 17.9183L14.3108 13Z"
                fill=""
              />
            </svg>
          </button>

          <div className="flex flex-wrap items-center gap-12.5">
            <div className="max-w-[526px] w-full">
              <div className="flex gap-5">
                <div className="flex flex-col gap-5">
                  {packageProducts.length > 0 ? (
                    packageProducts.map((prod, index) => (
                      <button
                        className={`flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg bg-gray-1 ease-out duration-200 hover:border-2 hover:border-blue`}
                        key={index}
                      >
                        <img
                          src={`${BASE_URL}/images/${prod.coverimage}`}
                          alt="thumbnail"
                          width={61}
                          height={61}
                          className="aspect-square"
                        />
                      </button>
                    ))
                  ) : (
                    <button
                      className={`flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg bg-gray-1 ease-out duration-200 hover:border-2 hover:border-blue`}
                    >
                      <img
                        src={`${BASE_URL}/images/${product.image}`}
                        alt="thumbnail"
                        width={61}
                        height={61}
                        className="aspect-square"
                      />
                    </button>
                  )}
                </div>

                <div className="relative z-1 overflow-hidden flex items-center justify-center w-full sm:min-h-[508px] rounded-lg border border-gray-3">
                  <div>
                    <img
                      src={`${BASE_URL}/images/${product.image}`}
                      alt="products-details"
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-[445px] w-full">
              <h3 className="font-semibold text-xl xl:text-heading-5 text-dark mb-4">
                {product.packagename}
              </h3>

              <div className="mb-6">
                {loading && (
                  <div className="text-gray-500">Loading products...</div>
                )}

                {error && <div className="text-red-500">{error}</div>}

                {!loading && !error && (
                  <ul
                    className="list-disc pl-5 mt-2 text-dark-700"
                    style={{ color: "black" }}
                  >
                    {packageProducts.length > 0 ? (
                      packageProducts.map((prod, index) => (
                        <>
                          <li key={prod._id || index} className="mb-1">
                            {prod.title}
                          </li>
                          <p
                            className="text-gray-700"
                            style={{ color: "gray" }}
                          >
                            {prod.about}
                          </p>
                        </>
                      ))
                    ) : (
                      <li>No products available</li>
                    )}
                  </ul>
                )}
              </div>

              <div className="flex flex-wrap justify-between gap-5 mt-6 mb-7.5">
                <div>
                  <h4 className="font-semibold text-lg text-dark mb-3.5">
                    Price
                  </h4>

                  <span className="flex items-center gap-2">
                    <span className="font-semibold text-dark text-xl xl:text-heading-4">
                      ₹{product.price}
                    </span>
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-dark mb-3.5">
                    Quantity
                  </h4>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      aria-label="button for remove product"
                      className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                      disabled={quantity <= 1}
                    >
                      <svg
                        className="fill-current"
                        width="16"
                        height="2"
                        viewBox="0 0 16 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M-8.548e-08 0.977778C-3.82707e-08 0.437766 0.437766 3.82707e-08 0.977778 8.548e-08L15.0222 1.31328e-06C15.5622 1.36049e-06 16 0.437767 16 0.977779C16 1.51779 15.5622 1.95556 15.0222 1.95556L0.977778 1.95556C0.437766 1.95556 -1.32689e-07 1.51779 -8.548e-08 0.977778Z"
                          fill=""
                        />
                      </svg>
                    </button>

                    <span className="flex items-center justify-center w-20 h-10 rounded-[5px] border border-gray-4 bg-white font-medium text-dark">
                      {quantity}
                    </span>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="button for add product"
                      className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                    >
                      <svg
                        className="fill-current"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.08889 0C8.6289 2.36047e-08 9.06667 0.437766 9.06667 0.977778L9.06667 15.0222C9.06667 15.5622 8.6289 16 8.08889 16C7.54888 16 7.11111 15.5622 7.11111 15.0222L7.11111 0.977778C7.11111 0.437766 7.54888 -2.36047e-08 8.08889 0Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 7.91111C4.72093e-08 7.3711 0.437766 6.93333 0.977778 6.93333L15.0222 6.93333C15.5622 6.93333 16 7.3711 16 7.91111C16 8.45112 15.5622 8.88889 15.0222 8.88889L0.977778 8.88889C0.437766 8.88889 -4.72093e-08 8.45112 0 7.91111Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  style={{width: "100%",justifyContent: "center"}}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? "Adding..." : "Purchase Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
