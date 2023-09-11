import { createSlice } from '@reduxjs/toolkit';

export const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
   sellerId: null
  },

  reducers: {
    getSellerId: (state, action) => {
      state.sellerId = action.payload;
    },

   
  },
});

export const { getSellerId } =
  sellerSlice.actions;

export default sellerSlice.reducer;