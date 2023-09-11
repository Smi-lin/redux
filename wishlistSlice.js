import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define your initial state here
const initialState = {
  wishlist: localStorage.getItem('wishlistItems')
    ? JSON.parse(localStorage.getItem('wishlistItems'))
    : [],
  isLoading: false,
  error: null,
};

// Create your wishlistSlice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);
      if (isItemExist) {
        return {
          ...state,
          wishlist: state.wishlist.map((i) => (i._id === isItemExist._id ? item : i)),
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, item],
        };
      }
    },
    removeFromWishlist: (state, action) => {
      return {
        ...state,
        wishlist: state.wishlist.filter((i) => i._id !== action.payload),
      };
    },
    clearWishlist: (state) => {
      return {
        ...state,
        wishlist: [],
      };
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
