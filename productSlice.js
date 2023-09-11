import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { product } from '../server';

// Define your initial state here
const initialState = {
  isLoading: false,
  product: null,
  products: [],
  message: '',
  error: null,
};

// Define your async thunk actions
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (
    {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      shopId,
      images,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${product}/createProducts`, {
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
      });
      return data.product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllProductsShop = createAsyncThunk(
  'product/getAllProductsShop',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${product}/getAllProductShop/${id}`);
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${product}/deleteProducts/${id}`, {
        withCredentials: true,
      });
      return data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${product}/getAllProducts`);
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create your productSlice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.message = 'Product created successfully';
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllProductsShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getAllProductsShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = productSlice.actions;

export default productSlice.reducer;
