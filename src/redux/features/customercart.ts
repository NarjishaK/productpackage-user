// redux/features/customer-cart-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
  customerId: string;
}

const initialState: CartItem[] = [];

const customerCartSlice = createSlice({
  name: "customerCart",
  initialState,
  reducers: {
    addItemToCustomerCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.find(
        (item) => item._id === action.payload._id && item.customerId === action.payload.customerId
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { addItemToCustomerCart } = customerCartSlice.actions;
export default customerCartSlice.reducer;
