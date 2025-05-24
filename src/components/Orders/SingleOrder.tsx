import React, { useState } from "react";
import OrderActions from "./OrderActions";
import OrderModal from "./OrderModal";

const SingleOrder = ({ orderItem, smallView }: any) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  const toggleModal = (status: boolean) => {
    setShowDetails(status);
    setShowEdit(status);
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status styling based on orderStatus
  const getStatusStyle = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === "delivered") {
      return "text-green bg-green-light-6";
    } else if (lowerStatus === "pending" || lowerStatus === "on-hold") {
      return "text-red bg-red-light-6";
    } else if (lowerStatus === "processing" || lowerStatus === "packing") {
      return "text-yellow bg-yellow-light-4";
    } else {
      return "text-gray bg-gray-light";
    }
  };

  return (
    <>
      {!smallView && (
        <div className="items-center justify-between border-t border-gray-3 py-5 px-7.5 hidden md:flex">
          <div className="min-w-[111px]">
            <p className="text-custom-sm text-red">
              {orderItem.orderId}
            </p>
          </div>
          <div className="min-w-[175px]">
            <p className="text-custom-sm text-dark">
              {formatDate(orderItem.orderDate)}
            </p>
          </div>

          <div className="min-w-[128px]">
            <p
              className={`inline-block text-custom-sm py-0.5 px-2.5 rounded-[30px] capitalize ${getStatusStyle(orderItem.orderStatus)}`}
            >
              {orderItem.orderStatus}
            </p>
          </div>

          <div className="min-w-[213px]">
            <div className="text-custom-sm text-dark flex flex-col gap-1">
              {orderItem.package?.map((pkg: any, index: number) => (
                <span key={index}>
                  {pkg.title || pkg?.packageDetails?.packagename || ""} x {pkg?.packageDetails?.quantity}
                </span>
              ))}
            </div>
          </div>

          <div className="min-w-[113px]">
            <p className="text-custom-sm text-dark">₹ {orderItem.totalAmount}</p>
          </div>

          <div className="flex gap-5 items-center">
            <OrderActions
              toggleDetails={toggleDetails}
              toggleEdit={toggleEdit}
            />
          </div>
        </div>
      )}

      {smallView && (
        <div className="block md:hidden">
          <div className="py-4.5 px-7.5">
            <div>
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2">Order:</span> #
                {orderItem.orderId.slice(-8)}
              </p>
            </div>
            <div>
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2">Date:</span>
                {formatDate(orderItem.orderDate)}
              </p>
            </div>
            <div>
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2">Status:</span>
                <span
                  className={`inline-block text-custom-sm py-0.5 px-2.5 rounded-[30px] capitalize ${getStatusStyle(orderItem.orderStatus)}`}
                >
                  {orderItem.orderStatus}
                </span>
              </p>
            </div>
            <div className="text-custom-sm text-dark">
              <span className="font-bold pr-2">Titles:</span>
              <div className="flex flex-col gap-1 pl-2">
                {orderItem.package?.map((pkg: any, index: number) => (
                  <span key={index}>
                    {pkg.title || pkg?.packageDetails?.packagename || ""} x {pkg?.packageDetails?.quantity}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2">Total:</span> ₹{orderItem.totalAmount}
              </p>
            </div>
            <div>
              <p className="text-custom-sm text-dark flex items-center">
                <span className="font-bold pr-2">Actions:</span>
                <OrderActions
                  toggleDetails={toggleDetails}
                  toggleEdit={toggleEdit}
                />
              </p>
            </div>
          </div>
        </div>
      )}

      <OrderModal
        showDetails={showDetails}
        toggleModal={toggleModal}
        order={orderItem}
      />
    </>
  );
};

export default SingleOrder;
