import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

const initialState = {
 value: {
    _id: "",
    id: 0,
    title: "",
    reviews: 0,
    price: 0,
    discountedPrice: 0,
    image: "",
    packagename: "",
    imgs: {
      thumbnails: [],
      previews: [],
    },
  } as Product,
} as InitialState;

export const quickView = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    updateQuickView: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },

    resetQuickView: () => {
      return {
        value: initialState.value,
      };
    },
  },
});

export const { updateQuickView, resetQuickView } = quickView.actions;
export default quickView.reducer;
