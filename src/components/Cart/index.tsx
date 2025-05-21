"use client";
import React, { useEffect, useState } from "react";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import Breadcrumb from "../Common/Breadcrumb";
import { fetchCartItems } from "@/Helper/handleapi";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useSelector } from "react-redux";
import EmptyCart from "../Common/CartSidebarModal/EmptyCart";

const Cart = () => {
  const guestCartItems = useAppSelector((state) => state.cartReducer.items);
  const guestTotalPrice = useSelector(selectTotalPrice);

  const [customerCartItems, setCustomerCartItems] = useState([]);
  const [useCustomerCart, setUseCustomerCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customerTotalPrice, setCustomerTotalPrice] = useState(0);

  useEffect(() => {
    const customerDetailsStr = localStorage.getItem("customerDetails");
    const customerDetails = customerDetailsStr ? JSON.parse(customerDetailsStr) : null;
    const customerId = customerDetails?._id || customerDetails?.id;

    if (customerId) {
      setUseCustomerCart(true);
      fetchCartItems(customerId)
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

  const displayedItems = useCustomerCart ? customerCartItems : guestCartItems;
  const totalPrice = useCustomerCart ? customerTotalPrice : guestTotalPrice;

  return (
    <>
      <section>
        <Breadcrumb title="Cart" pages={["Cart"]} />
      </section>

      {displayedItems.length > 0 || loading ? (
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
              <h2 className="font-medium text-dark text-2xl">Your Cart</h2>
              <button className="text-blue">Clear Shopping Cart</button>
            </div>

            <div className="bg-white rounded-[10px] shadow-1">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1170px]">
                  <div className="flex items-center py-5.5 px-7.5">
                    <div className="min-w-[400px]"><p className="text-dark">Product</p></div>
                    <div className="min-w-[180px]"><p className="text-dark">Price</p></div>
                    <div className="min-w-[275px]"><p className="text-dark">Quantity</p></div>
                    <div className="min-w-[200px]"><p className="text-dark">Subtotal</p></div>
                    <div className="min-w-[50px]"><p className="text-dark text-right">Action</p></div>
                  </div>

                  {loading ? (
                    <p className="text-center py-4">Loading cart...</p>
                  ) : displayedItems.length > 0 ? (
                    displayedItems.map((item, key) => (
                      <SingleItem key={key} item={item} />
                    ))
                  ) : (
                    <>
                    {/* <EmptyCart /> */}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 mt-9">
              <Discount />
              <OrderSummary />
            </div>
          </div>
        </section>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
