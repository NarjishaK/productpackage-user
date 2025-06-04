import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";
import { fetchOrders } from "@/Helper/handleapi";

const Orders = () => {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  // Get orders by customer id
  useEffect(() => {
    const customerDetailsStr = localStorage.getItem("customerDetails");
    const customerDetails = customerDetailsStr
      ? JSON.parse(customerDetailsStr)
      : null;
    const customerId = customerDetails?._id || customerDetails?.id;

    if (customerId) {
      fetchOrders(customerId)
        .then((data) => {
          console.log("API Response:", data);
          // Extract the orders array from the response
          if (data && data.orders) {
            setOrders(data.orders);
          } else if (Array.isArray(data)) {
            // In case the API returns orders directly as an array
            setOrders(data);
          } else {
            setOrders([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setOrders([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("No customer ID found");
      setLoading(false);
    }
  }, []); 

  console.log("Orders state:", orders);
  console.log("Orders length:", orders.length);

  if (loading) {
    return (
      <div className="py-9.5 px-4 sm:px-7.5 xl:px-10">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[770px]">
          {/* Header row */}
          {orders.length > 0 && (
            <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex ">
              <div className="min-w-[111px]">
                <p className="text-custom-sm text-dark" style={{ textAlign: "center" }}>Order</p>
              </div>
              <div className="min-w-[175px]">
                <p className="text-custom-sm text-dark" style={{ textAlign: "center" }}>Date</p>
              </div>
              {/* <div className="min-w-[128px]">
                <p className="text-custom-sm text-dark">Status</p>
              </div> */}
              <div className="min-w-[213px]">
                <p className="text-custom-sm text-dark" style={{ textAlign: "center" }}>Title</p>
              </div>
              <div className="min-w-[113px]">
                <p className="text-custom-sm text-dark" style={{ textAlign: "center" }}>Total</p>
              </div>
              <div className="min-w-[113px]">
                <p className="text-custom-sm text-dark" style={{ textAlign: "center" }}>Action</p>
              </div>
            </div>
          )}
          
          {/* Orders list */}
          {orders.length > 0 ? (
            orders.map((orderItem: any, key: number) => (
              <SingleOrder key={orderItem._id || key} orderItem={orderItem} smallView={false} />
            ))
          ) : (
            <p className="py-9.5 px-4 sm:px-7.5 xl:px-10">
              You don&apos;t have any orders!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;