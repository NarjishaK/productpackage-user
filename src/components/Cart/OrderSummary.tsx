import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Swal from "sweetalert2";

const OrderSummary = ({ cartItems, totalPrice, useCustomerCart }) => {
  // const router = useRouter();
  
  // Check if customer details exist in localStorage
  const checkCustomerDetails = () => {
    try {
      const customerDetailsStr = localStorage.getItem("customerDetails");
      return customerDetailsStr && JSON.parse(customerDetailsStr);
    } catch (error) {
      console.error("Error parsing customer details:", error);
      return null;
    }
  };

  const handleCheckoutClick = async (e) => {
    const customerDetails = checkCustomerDetails();
    
    if (!customerDetails) {
      e.preventDefault(); // Prevent navigation
      
      // Show SweetAlert with signup option
      const result = await Swal.fire({
        title: 'First Signup Required!',
        text: 'You need to signup before proceeding to checkout.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Go to Signup',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      });
      
      if (result.isConfirmed) {
        // Redirect to signup page using Next.js router
        // router.push("/signin");
        window.location.href = "/signin";
      }
      return;
    }
    
    // If customer details exist, allow normal navigation to checkout
  };

  return (
    <div className="lg:max-w-[670px] w-full">
      {/* <!-- order list box --> */}
      <div className="bg-white shadow-1 rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">Order Summary</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {/* <!-- title --> */}
          <div className="flex items-center justify-between py-5 border-b border-gray-3">
            <div>
              <h4 className="font-medium text-dark">Product</h4>
            </div>
            <div>
              <h4 className="font-medium text-dark text-right">Subtotal</h4>
            </div>
          </div>

          {/* <!-- product item --> */}
          {cartItems.map((item, key) => (
            <div key={key} className="flex items-center justify-between py-5 border-b border-gray-3">
              <div>
                <p className="text-dark">
                  {useCustomerCart 
                    ? item.packageId?.packagename 
                    : item.packagename
                  }
                  {item.quantity && ` x ${item.quantity}`}
                </p>
              </div>
              <div>
                <p className="text-dark text-right">
                  ₹{useCustomerCart 
                    ? (item.packageId?.price * item.quantity)
                    : (item.price * item.quantity)
                  }
                </p>
              </div>
            </div>
          ))}

          {/* <!-- total --> */}
          <div className="flex items-center justify-between pt-5">
            <div>
              <p className="font-medium text-lg text-dark">Total</p>
            </div>
            <div>
              <p className="font-medium text-lg text-dark text-right">
               ₹{totalPrice}
              </p>
            </div>
          </div>

          {/* <!-- checkout button --> */}
          <Link href="/checkout" onClick={handleCheckoutClick}>
            <button
              type="button"
              className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
            >
              Process to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;