// features/cartSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  status: "idle",
  error: null,
};

// Async Thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("https://mern-ecommerce-mvvv.onrender.com/api/cart", {
        withCredentials: true,
      });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://mern-ecommerce-mvvv.onrender.com/api/cart",
        cartItem,
        {
          withCredentials: true, // Required for sessions
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      // Return actual error message from server
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    // Change from itemId to productId
    try {
      const { data } = await axios.delete(
        `https://mern-ecommerce-mvvv.onrender.com/api/cart/${productId}`,
        { withCredentials: true }
      );
      return data.deletedProductId; // Make sure backend returns this
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    console.log("Sending to backend:", productId, quantity); // Debug log
    try {
      const { data } = await axios.patch(
        `https://mern-ecommerce-mvvv.onrender.com/api/cart/quantity/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      return { productId, quantity: data.updatedQuantity };
    } catch (error) {
      console.error("Update quantity error:", error); // Debug log
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const items = action.payload?.items || [];

        state.status = "succeeded";
        state.items = items;
        state.totalQuantity = items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.totalAmount = items.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        );
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalAmount = action.payload.totalAmount;
        state.status = "succeeded";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      // Update the reducer case
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const productId = action.payload;

        // Find index first to minimize array operations
        const itemIndex = state.items.findIndex(
          (item) => item.productId === productId
        );
        if (itemIndex === -1) return;

        // Create new state immutably but efficiently
        state.items.splice(itemIndex, 1);
        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        state.status = "succeeded";
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const itemIndex = state.items.findIndex(
          (item) => item.productId === productId
        );

        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = quantity;
          state.totalQuantity = state.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          state.totalAmount = state.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
        }
      });
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer;
