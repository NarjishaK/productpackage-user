import { BASE_URL } from "@/Helper/handleapi";
import { Product } from "@/types/product";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";

// Generic Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'lg' 
}: ModalProps) => {
  
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div className="flex min-h-screen items-start justify-center p-4 sm:p-6 pt-10 pb-10">
        <div 
          className={`
            relative w-full ${sizeClasses[size]} 
            transform overflow-visible rounded-2xl bg-white 
            shadow-2xl transition-all duration-300 ease-out
            animate-in fade-in-0 zoom-in-95 my-8
          `}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 leading-6">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="
                  rounded-full p-2 text-gray-400 hover:text-gray-600 
                  hover:bg-gray-100 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:ring-offset-2 
                  transition-all duration-200
                "
                aria-label="Close modal"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          {/* Content */}
          <div className="px-6 py-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// QuickView Content Component
const QuickViewContent = ({ item }: { item: Product }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Package Image */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-50 border border-gray-200">
          <img 
            src={`${BASE_URL}/images/${item?.packageDetails?.image}`} 
            alt={item?.packageDetails?.packagename}
            className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Package Information */}
      <div className="space-y-6">
        {/* Title and Price */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {item?.packageDetails?.packagename}
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-blue-600">
              ₹{item?.packageDetails?.price?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Package Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <dt className="text-sm font-medium text-gray-500 mb-1">Package ID</dt>
              <dd className="text-sm text-gray-900 font-mono break-all">
                {item._id}
              </dd>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <dt className="text-sm font-medium text-gray-500 mb-1">Status</dt>
              <dd>
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${item?.packageDetails?.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                  }
                `}>
                  <span className={`
                    w-1.5 h-1.5 rounded-full mr-1.5
                    ${item?.packageDetails?.isActive ? 'bg-green-500' : 'bg-red-500'}
                  `} />
                  {item?.packageDetails?.isActive ? 'Active' : 'Inactive'}
                </span>
              </dd>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-gray-900">Availability Period</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">From:</span>
                <p className="font-medium text-gray-900 mt-1">
                  {formatDate(item?.packageDetails?.fromDate)}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Until:</span>
                <p className="font-medium text-gray-900 mt-1">
                  {formatDate(item?.packageDetails?.toDate)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Link
            href={`/shop-details/${item._id}`}
            className="
              w-full bg-blue text-white py-3 px-6 rounded-lg 
              hover:bg-blue-700 focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-offset-2 
              transition-all duration-200 text-center block font-semibold
              shadow-lg hover:shadow-xl
            "
          >
            View Full Details
          </Link>
          
          {/* <button
            // onClick={() => handleAddToCart()}
            className="
              w-full bg-gray-900 text-white py-3 px-6 rounded-lg 
              hover:bg-gray-800 focus:outline-none focus:ring-2 
              focus:ring-gray-500 focus:ring-offset-2 
              transition-all duration-200 font-semibold
              shadow-lg hover:shadow-xl
            "
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
            </svg>
            Add to Cart
          </button> */}
        </div>
      </div>
    </div>
  );
};

// QuickViewModal Component using Modal
const QuickViewModal = ({ item, isOpen, onClose }: { 
  item: Product; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Package Details"
      size="xl"
    >
      <QuickViewContent item={item} />
    </Modal>
  );
};

export default QuickViewModal;
export { Modal };