"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchCartItems } from "@/Helper/handleapi";

interface CartModalContextType {
  isCartModalOpen: boolean;
  openCartModal: () => void;
  closeCartModal: () => void;
  refreshCart: () => void;
}

const CartModalContext = createContext<CartModalContextType | undefined>(undefined);

export const CartModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  // Function to trigger cart refresh
  const refreshCart = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const value = {
    isCartModalOpen,
    openCartModal,
    closeCartModal,
    refreshCart,
  };

  return (
    <CartModalContext.Provider value={value}>
      {children}
    </CartModalContext.Provider>
  );
};

export const useCartModalContext = (): CartModalContextType => {
  const context = useContext(CartModalContext);
  if (!context) {
    throw new Error("useCartModalContext must be used within a CartModalProvider");
  }
  return context;
};