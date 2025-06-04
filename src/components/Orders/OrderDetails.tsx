import { BASE_URL } from "@/Helper/handleapi";
import React from "react";

interface OrderDetailsProps {
  orderItem: any;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderItem }) => {
  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status styling based on orderStatus
  const getStatusStyle = (status: string) => {
    const lowerStatus = status?.toLowerCase() || "";
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

  // Get payment status styling
  const getPaymentStatusStyle = (status: string) => {
    const lowerStatus = status?.toLowerCase() || "";
    if (lowerStatus === "paid") {
      return "text-green bg-green-light-6";
    } else if (lowerStatus === "unpaid") {
      return "text-red bg-red-light-6";
    } else if (lowerStatus === "partial") {
      return "text-yellow bg-yellow-light-4";
    } else {
      return "text-gray bg-gray-light";
    }
  };

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Details</h2>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-red">
              {orderItem?.orderId}
            </span>
            {/* <span
              className={`inline-block text-sm py-1 px-3 rounded-full capitalize ${getStatusStyle(orderItem?.orderStatus)}`}
            >
              {orderItem?.orderStatus || "Unknown"}
            </span> */}
          </div>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
              Customer Information
            </h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-600">Name: </span>
                <span className="text-gray-800">{orderItem?.customerName || ""}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Email: </span>
                <span className="text-gray-800">{orderItem?.email || ""}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Phone: </span>
                <span className="text-gray-800">{orderItem?.phone || ""}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
              Order Information
            </h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-600">Order Date: </span>
                <span className="text-gray-800">{formatDate(orderItem?.orderDate)}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Payment Method: </span>
                <span className="text-gray-800">{orderItem?.paymentMethod || ""}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Payment Status: </span>
                <span
                  className={`inline-block text-sm py-1 px-2 rounded-full capitalize ${getPaymentStatusStyle(orderItem?.paymentStatus)}`}
                >
                  {orderItem?.paymentStatus || "Unknown"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
            Delivery Address
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div>{orderItem?.address || ""}</div>
              {orderItem?.address1 && <div>{orderItem.address1}</div>}
              <div className="flex gap-4">
                <span>{orderItem?.city || ""}</span>
                <span>{orderItem?.state || ""}</span>
                <span>{orderItem?.Pincode || ""}</span>
              </div>
              <div>{orderItem?.country || ""}</div>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
            Package Details
          </h3>
          <div className="space-y-3">
            {orderItem?.package?.map((pkg: any, index: number) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  {pkg?.packageDetails?.image && (
                    <img
                      src={`${BASE_URL}/images/${pkg?.packageDetails?.image}`}
                      alt={pkg?.packageDetails?.packagename || "Package"}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {pkg?.packageDetails?.packagename || pkg?.title || "Unknown Package"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {pkg?.packageDetails?.quantity || 1}
                    </p>
                    <p className="text-sm text-gray-600">
                     Status: {pkg?.packageDetails?.deliveryStatus || "Not claimed"} 
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">
                    ₹{pkg?.packageDetails?.price || 0}
                  </p>
                  <p className="text-sm text-gray-600">per item</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
            Payment Summary
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium text-gray-800">₹{orderItem?.totalAmount || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Paid Amount:</span>
              <span className="font-medium text-green">₹{orderItem?.paidAmount || 0}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="text-gray-600">Balance Amount:</span>
              <span className="font-medium text-red">₹{orderItem?.balanceAmount || 0}</span>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        {orderItem?.note && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
              Order Notes
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{orderItem.note}</p>
            </div>
          </div>
        )}

        {/* Delivery Status */}
        {/* <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
            Delivery Information
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Status:</span>
              <span className="font-medium text-gray-800">
                {orderItem?.deliveryStatus || "Pending"}
              </span>
            </div>
            {orderItem?.deliveryDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Delivery:</span>
                <span className="font-medium text-gray-800">
                  {formatDate(orderItem.deliveryDate)}
                </span>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default OrderDetails;