import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { selectAllProducts } from "./productSlice";
import axios from "axios";

// Async thunk to fetch liked products
export const fetchLikedProducts = createAsyncThunk(
  "likedProducts/fetchLikedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/likes");
      return response.data.data; // expects array of { _id, productId: string, ... }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Like a product
export const likeProduct = createAsyncThunk(
  "likedProducts/likeProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/likes", {
        productId,
      });
      return response.data.data; // expects liked product object with productId as string
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Unlike a product
export const unlikeProduct = createAsyncThunk(
  "likedProducts/unlikeProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/likes/${productId}`);
      return productId; // return productId string to remove from state
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const likedProductsSlice = createSlice({
  name: "likedProducts",
  initialState: {
    items: [], // each item: { _id, productId: string or full product object, ... }
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLikedProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchLikedProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      .addCase(likeProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(likeProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newLiked = action.payload;
        const newProductId = newLiked.productId?._id || newLiked.productId;
        const exists = state.items.some((item) => {
          const id = item.productId?._id || item.productId;
          return id === newProductId;
        });
        if (!exists) {
          state.items.push(newLiked);
        }
      })
      .addCase(likeProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      .addCase(unlikeProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(unlikeProduct.fulfilled, (state, action) => {
        const productId = action.payload;
        state.items = state.items.filter((item) => {
          const id = item.productId?._id || item.productId;
          return id !== productId;
        });
        state.status = "succeeded";
      })
      .addCase(unlikeProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

// Selectors

// Selects array of liked product IDs (strings)
export const selectLikedProductIds = createSelector(
  (state) => state.likedProducts.items,
  (items) =>
    items.map((item) =>
      typeof item.productId === "string" ? item.productId : item.productId?._id
    )
);

// Selects full product objects that are liked, based on all products and liked IDs
export const selectLikedItems = createSelector(
  [selectAllProducts, selectLikedProductIds],
  (allProducts, likedIds) => {
    const likedSet = new Set(likedIds);
    return allProducts.filter((product) => likedSet.has(product._id));
  }
);

export default likedProductsSlice.reducer;
