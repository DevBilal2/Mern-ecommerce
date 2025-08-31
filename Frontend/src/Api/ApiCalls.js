import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk (this will create pending, fulfilled, rejected actions automatically)
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("/api/products");
    console.log(response);
    return response.data;
  }
);
