"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import Link from "next/link";
import { BASE_URL } from "@/Helper/handleapi";

// Quick View Modal Component
import QuickViewModal from "./quick";

const SingleItem = ({ item }: { item: Product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isCustomer, setIsCustomer] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

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

  const handleQuickView = () => {
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  // add to cart
  // const handleAddToCart = async () => {
  //   if (isCustomer && customerId) {
  //     try {
  //       // Make API call to add product to customer cart
  //       const response = await fetch(`${BASE_URL}/customercart`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           customerId: customerId,
  //           packageId: item._id,
  //           quantity: 1,
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to add to customer cart');
  //       }

  //       // Show success notification or feedback
  //       console.log('Product added to customer cart successfully');
        
  //       // Trigger cart refresh using custom event
  //       window.dispatchEvent(new CustomEvent('cartUpdated'));
        
  //     } catch (error) {
  //       console.error('Error adding to customer cart:', error);
  //       // Fallback to guest cart in case of API failure
  //       addToGuestCart();
  //     }
  //   } else {
  //     // If no customer details, use guest cart
  //     addToGuestCart();
  //   }
  // };

  //   // add to cart
  //   const addToGuestCart = () => {
  //     dispatch(
  //       addItemToCart({
  //         ...item,
  //         quantity: 1,
  //       })
  //     );
  //   };

  return (
    <>
      <div className="group">
        <div className="relative overflow-hidden rounded-lg bg-[#F6F7FB]">
          <div className="text-center px-4 py-7.5">
            <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
              <Link
                href={{
                  pathname: `/shop-details/${item._id}`,
                }}
              >
                {item?.packageDetails?.packagename}
              </Link>
            </h3>

            <span className="flex items-center justify-center gap-2 font-medium text-lg">
              <span className="text-dark">₹{item?.packageDetails?.price}</span>
            </span>
          </div>

          <div className="flex justify-center items-center">
            <Link href={`shop-details/${item._id}`}>
              <img src={`${BASE_URL}/images/${item?.packageDetails?.image}`} alt="" />
            </Link>
          </div>

          {/* <div className="absolute right-0 bottom-0 translate-x-full u-w-full flex flex-col gap-2 p-5.5 ease-linear duration-300 group-hover:translate-x-0">
            <button
              onClick={handleQuickView}
              aria-label="button for quick view"
              id="bestOne"
              className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-white hover:bg-blue"
            >
              <i className="bi bi-eye"></i>
            </button>

            <button
              // onClick={() => handleAddToCart()}
              aria-label="button for add to cart"
              id="addCartOne"
              className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-white hover:bg-blue"
            >
              <i className="bi bi-cart3"></i>
            </button>
          </div> */}
        </div>
      </div>

      {/* Quick View Modal */}
      {/* <QuickViewModal 
        item={item} 
        isOpen={isQuickViewOpen} 
        onClose={handleCloseQuickView} 
      /> */}
    </>
  );
};

export default SingleItem;