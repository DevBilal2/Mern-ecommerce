import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts", // This should be a unique action type string
  async () => {
    const response = await axios.get("https://mern-ecommerce-mvvv.onrender.com/api/products");
    return response.data.data; // Accessing the 'data' array
  }
);
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    try {
      const response = await axios.get(
        `https://mern-ecommerce-mvvv.onrender.com/api/products/${id}`
      );
      return response.data.data; // Assuming the product is in response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);