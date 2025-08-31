// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Store/Slices/cartSlice";
import userReducer from "../Store/Slices/userSlice";
import productReducer from "../Store/Slices/productSlice";
import addressReducer from "../Store/Slices/address";
import likedProductsReducer from "../Store/Slices/likedProductSlice";
import filterReducer from "../Store/Slices/filterSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
    address: addressReducer,
    likedProducts: likedProductsReducer,
    filters: filterReducer,
    // Add other reducers here
  },
});
