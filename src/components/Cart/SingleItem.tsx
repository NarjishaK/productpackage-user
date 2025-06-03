import React, { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/redux/features/cart-slice";

import { BASE_URL } from "@/Helper/handleapi";
import Link from "next/link";

const SingleItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const dispatch = useDispatch<AppDispatch>();

const handleRemoveFromCart = async () => {
  try {
    // Call API to delete from customer cart if user is authenticated
    const res = await fetch(`${BASE_URL}/customercart/${item._id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete item from customer cart");
    }

    // Update Redux store
    dispatch(removeItemFromCart(item._id));
  } catch (error) {
    console.error("Error removing cart item:", error);
  }
};

const handleIncreaseQuantity = async () => {
  const newQuantity = quantity + 1;
  setQuantity(newQuantity);

  try {
    await fetch(`${BASE_URL}/customercart/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    dispatch(updateCartItemQuantity({ _id: item._id, quantity: newQuantity }));
  } catch (error) {
    console.error("Failed to update quantity", error);
  }
};

const handleDecreaseQuantity = async () => {
  if (quantity > 1) {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);

    try {
      await fetch(`${BASE_URL}/customercart/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      dispatch(updateCartItemQuantity({ _id: item._id, quantity: newQuantity }));
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  }
};

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-7.5">
      <div className="min-w-[400px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
              <Link href={`/shop-details/${item.id || item?.packageId?._id}`}>
                <img
                  width={200}
                  height={200}
                  src={`${BASE_URL}/images/${
                    item.image || `${item.packageId.image}`
                  }`}
                  alt="product"
                />
              </Link>
            </div>

            <div>
              <h3 className="text-dark ease-out duration-200 hover:text-blue">
                <Link href={`/shop-details/${item.id || item?.packageId?._id}`}>
                  {item.packagename || item.packageId.packagename}{" "}
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[180px]">
        <p className="text-dark">₹{item.price || item.packageId.price}</p>
      </div>

      <div className="min-w-[275px]">
        <div className="w-max flex items-center rounded-md border border-gray-3">
          <button
            onClick={() => handleDecreaseQuantity()}
            aria-label="button for remove product"
            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-blue"
          >
<i className="bi bi-dash text-blue-900"></i>

          </button>

          <span className="flex items-center justify-center w-16 h-11.5 border-x border-gray-4">
            {quantity}
          </span>

          <button
            onClick={() => handleIncreaseQuantity()}
            aria-label="button for add product"
            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-blue"
          >
          <i className="bi bi-plus text-blue-900"></i>
          </button>
        </div>
      </div>

      <div className="min-w-[200px]">
        <p className="text-dark">
          ₹{item.price * quantity || item.packageId.price * quantity}
        </p>
      </div>

      <div className="min-w-[50px] flex justify-end">
        <button
          onClick={() => handleRemoveFromCart()}
          aria-label="button for remove product from cart"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          <i className="bi bi-trash text-blue-900"></i>
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
