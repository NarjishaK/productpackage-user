"use client";
import React, { useEffect, useState } from "react";
// import Breadcrumb from "../Common/Breadcrumb";
// import Login from "./Login";
// import Shipping from "./Shipping";
// import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
// import Coupon from "./Coupon";
import Billing from "./Billing";
import { fetchCartItems } from "@/Helper/handleapi";
import { BASE_URL } from "@/Helper/handleapi";
import Swal from "sweetalert2";

const EnhancedCheckout = () => {

  const [customerCartItems, setCustomerCartItems] = useState([]);
  const [useCustomerCart, setUseCustomerCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customerTotalPrice, setCustomerTotalPrice] = useState(0);

  // Get customer details with better error handling
  const getCustomerDetails = () => {
    try {
      const customerDetailsStr = localStorage.getItem("customerDetails");
      if (!customerDetailsStr) {
        console.log("No customer details in localStorage");
        return null;
      }
      const customerDetails = JSON.parse(customerDetailsStr);
      return customerDetails;
    } catch (error) {
      console.error("Error parsing customer details:", error);
      return null;
    }
  };

  useEffect(() => {
    const customerDetails = getCustomerDetails();
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

  const [orderLoading, setOrderLoading] = useState(false);
  
  // Form states
  const [billingData, setBillingData] = useState({
    firstName: '',
    country: '',
    address: '',
    address1: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: ''
  });
  
  const [selectedPayment, setSelectedPayment] = useState('COD');
  const [orderNotes, setOrderNotes] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Calculate totals
  const displayedItems = useCustomerCart ? customerCartItems : customerCartItems;
  const totalPrice = useCustomerCart ? customerTotalPrice : 0;
  const shippingFee = 0.00;
  const finalTotal = totalPrice + shippingFee;

  // Order creation API call
  const createOrder = async (orderData) => {
    try {
      console.log("Sending order data:", orderData);
      
      const response = await fetch(`${BASE_URL}/customerorder/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };

  // Form validation
  const validateForm = () => {
    const required = ['firstName', 'country', 'address', 'city', 'phone', 'email'];
    const missing = required.filter(field => !billingData[field]?.trim());
    
    if (missing.length > 0) {
      // alert(`Please fill in required fields: ${missing.join(', ')}`);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Please fill in required fields: ${missing.join(', ')}`,
      });
      return false;
    }

    if (displayedItems.length === 0) {
      // alert('Your cart is empty');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your cart is empty",
      })
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setOrderLoading(true);

    try {
      // Get customer details again at submit time
      const customerDetails = getCustomerDetails();
      const customerId = customerDetails?._id || customerDetails?.id;

      if (!customerId) {
        // alert('Customer not found. Please log in again.');
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Customer not found. Please log in again.",
        })
        setOrderLoading(false);
        return;
      }

      console.log("Using customer ID for order:", customerId);

      // Prepare cart items for order
      const cartItems = displayedItems.map(item => {
        if (useCustomerCart) {
          return {
            packageId: item.packageId?._id || item.packageId,
            quantity: item.quantity
          };
        } else {
          return {
            _id: item.id,
            packagename: item.packagename,
            price: item.price,
            image: item.image,
            mainCategory: item.mainCategory,
            quantity: item.quantity
          };
        }
      });

      // Prepare order data
      const orderData = {
        customerId: customerId,
        billingDetails: {
          firstName: billingData.firstName.trim(),
          country: billingData.country.trim(),
          address: billingData.address.trim(),
          address1: billingData.address1?.trim() || '',
          city: billingData.city.trim(),
          state: billingData.state?.trim() || '',
          pincode: billingData.pincode?.trim() || '',
          phone: billingData.phone.trim(),
          email: billingData.email.trim()
        },
        paymentMethod: selectedPayment,
        cartItems: cartItems,
        totalAmount: finalTotal,
        note: orderNotes.trim(),
        deliveryDate: deliveryDate || null
      };

      console.log('Creating order with data:', orderData);

      // Create order
      const result = await createOrder(orderData);
      
      console.log('Order created successfully:', result);
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Order created successfully!`,
      });
      setTimeout(() => {
        window.location.href = (`/`);
      }, 3000);
      
    } catch (error) {
      console.error('Error creating order:', error);
      // alert(`Failed to create order: ${error.message}`);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to create order: ${error.message}`,
      })
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Billing & Notes */}
            <div className="lg:w-2/3">
              <Billing 
                onBillingChange={setBillingData}
                billingData={billingData}
              />
              
              {/* Delivery Date */}
              <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                <div>
                  <label htmlFor="deliveryDate" className="block mb-2.5">
                    Preferred Delivery Date (optional)
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    id="deliveryDate"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                <div>
                  <label htmlFor="notes" className="block mb-2.5">
                    Other Notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={5}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
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
                                ? item?.packageId?.packagename 
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

                  <div className="flex items-center justify-between py-5 border-b border-gray-3">
                    <p className="text-dark">Shipping Fee</p>
                    <p className="text-dark">₹{shippingFee.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center justify-between pt-5">
                    <p className="font-medium text-lg text-dark">Total</p>
                    <p className="font-medium text-lg text-dark">₹{finalTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <PaymentMethod 
                selectedPayment={selectedPayment}
                onPaymentChange={setSelectedPayment}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={orderLoading || displayedItems.length === 0}
                className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {orderLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Processing Order...
                  </span>
                ) : displayedItems.length === 0 ? (
                  "Cart is Empty"
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnhancedCheckout;