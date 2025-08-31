import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../ApiCalls";
import { fetchProductById } from "../ApiCalls";
// slice

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearSelectedProduct(state) { 
      state.selectedProduct = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllProducts = (state) => state.products.items || [];

export const selectedProduct = (state) => state.products.selectedProduct;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;
export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
