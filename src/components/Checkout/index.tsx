"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import { useAppSelector } from "@/redux/store";
import { fetchCartItems } from "@/Helper/handleapi";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useSelector } from "react-redux";
import { BASE_URL } from "@/Helper/handleapi";

const Checkout = () => {
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
  const shippingFee = 15.00;
  const finalTotal = totalPrice + shippingFee;

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* <!-- checkout left --> */}
              <div className="lg:max-w-[670px] w-full">
                {/* <!-- login box --> */}
                <Login />

                {/* <!-- billing details --> */}
                <Billing />

                {/* <!-- address box two --> */}
                <Shipping />

                {/* <!-- others note box --> */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Other Notes (optional)
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder="Notes about your order, e.g. speacial notes for delivery."
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Your Order
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- title --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">Product</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          Subtotal
                        </h4>
                      </div>
                    </div>

                    {/* <!-- Dynamic product items --> */}
                    {loading ? (
                      <div className="flex items-center justify-center py-5">
                        <p className="text-dark">Loading order details...</p>
                      </div>
                    ) : displayedItems.length > 0 ? (
                      displayedItems.map((item, key) => (
                        <div key={key} className="flex items-center justify-between py-5 border-b border-gray-3">
                          <div>
                            <p className="text-dark">
                              {useCustomerCart 
                                ? item.packageId?.packagename 
                                : item.packagename
                              }
                              {` x ${item.quantity}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-dark text-right">
                              ₹{useCustomerCart 
                                ? (item.packageId?.price * item.quantity).toFixed(2)
                                : (item.price * item.quantity).toFixed(2)
                              }
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center py-5">
                        <p className="text-dark">No items in cart</p>
                      </div>
                    )}

                    {/* <!-- Subtotal --> */}
                    {displayedItems.length > 0 && (
                      <div className="flex items-center justify-between py-5 border-b border-gray-3">
                        <div>
                          <p className="text-dark">Subtotal</p>
                        </div>
                        <div>
                          <p className="text-dark text-right">₹{totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    )}

                    {/* <!-- shipping fee --> */}
                    {displayedItems.length > 0 && (
                      <div className="flex items-center justify-between py-5 border-b border-gray-3">
                        <div>
                          <p className="text-dark">Shipping Fee</p>
                        </div>
                        <div>
                          <p className="text-dark text-right">₹{shippingFee.toFixed(2)}</p>
                        </div>
                      </div>
                    )}

                    {/* <!-- total --> */}
                    {displayedItems.length > 0 && (
                      <div className="flex items-center justify-between pt-5">
                        <div>
                          <p className="font-medium text-lg text-dark">Total</p>
                        </div>
                        <div>
                          <p className="font-medium text-lg text-dark text-right">
                           ₹{finalTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* <!-- coupon box --> */}
                <Coupon />

                {/* <!-- shipping box --> */}
                <ShippingMethod />

                {/* <!-- payment box --> */}
                <PaymentMethod />

                {/* <!-- checkout button --> */}
                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                  disabled={loading || displayedItems.length === 0}
                >
                  {loading ? "Loading..." : displayedItems.length === 0 ? "Cart is Empty" : "Process to Checkout"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;