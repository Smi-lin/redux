import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define your initial state here
const initialState = {
  cart: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  isLoading: false,
  error: null,
};

// Create your cartSlice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);
      if (isItemExist) {
        return {
          ...state,
          cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    },
    removeFromCart: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((i) => i._id !== action.payload),
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        cart: [],
      };
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
