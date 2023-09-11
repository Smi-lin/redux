import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Orders } from "../server";

// Define your initial state
const initialState = {
  isLoading: true,
  orders: [],
  error: null,
};

// Define an async thunk for getting all orders of a user
export const getAllOrdersOfUser = createAsyncThunk(
  "orders/getAllOrdersOfUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/${Orders}/getAllOrders/${userId}`);
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Define an async thunk for getting all orders of a shop
export const getAllOrdersOfShop = createAsyncThunk(
  "orders/getAllOrdersOfShop",
  async (shopId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/${Orders}/getSellerAllOrders`);
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create an orderSlice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersOfUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getAllOrdersOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllOrdersOfShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getAllOrdersOfShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = orderSlice.actions;

export default orderSlice.reducer;
