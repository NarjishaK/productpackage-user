import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  items: CartItem[];
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
  image: string;
  packagename: string;
  _id?: string;
};

// Helper function to load guest cart from localStorage
const loadGuestCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const guestCartStr = localStorage.getItem('guestCart');
      if (guestCartStr) {
        const guestCart = JSON.parse(guestCartStr);
        return guestCart.items || [];
      }
    } catch (error) {
      console.error('Error loading guest cart from localStorage:', error);
    }
  }
  return [];
};

// Helper function to save guest cart to localStorage
const saveGuestCartToStorage = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    try {
      const guestCart = { items };
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
    } catch (error) {
      console.error('Error saving guest cart to localStorage:', error);
    }
  }
};

const initialState: InitialState = {
  items: loadGuestCartFromStorage(),
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, title, price, quantity, discountedPrice, imgs, image, packagename, _id } =
        action.payload;
      const existingItem = state.items.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          _id,
          title,
          price,
          quantity,
          discountedPrice,
          imgs,
          image,
          packagename
        });
      }

      // Save to localStorage for guest cart
      saveGuestCartToStorage(state.items);
    },
    
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);
      
      // Save to localStorage for guest cart
      saveGuestCartToStorage(state.items);
    },
    
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const { _id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }

      // Save to localStorage for guest cart
      saveGuestCartToStorage(state.items);
    },

    removeAllItemsFromCart: (state) => {
      state.items = [];
      
      // Clear localStorage for guest cart
      if (typeof window !== 'undefined') {
        localStorage.removeItem('guestCart');
      }
    },

    // New action to load cart from localStorage (useful for hydration)
    loadCartFromStorage: (state) => {
      state.items = loadGuestCartFromStorage();
    },

    // New action to clear guest cart (used after login/merge)
    clearGuestCart: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('guestCart');
      }
    },
  },
});

export const selectCartItems = (state: RootState) => state.cartReducer.items;

export const selectTotalPrice = createSelector([selectCartItems], (items) => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

export const selectCartItemCount = createSelector([selectCartItems], (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
  loadCartFromStorage,
  clearGuestCart,
} = cart.actions;

export default cart.reducer;