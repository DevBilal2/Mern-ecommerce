import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  addresses: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async Thunks
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://mern-ecommerce-mvvv.onrender.com/api/addresses", {
        withCredentials: true,
      });

      console.log("RESPONSE DATA:", response.data); // will log the array directly

      return response.data; // <-- return the array directly
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const { _id, ...cleanedData } = addressData;

      const { data } = await axios.post(
        "https://mern-ecommerce-mvvv.onrender.com/api/addresses",
        cleanedData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return data; // return the new address object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `https://mern-ecommerce-mvvv.onrender.com/api/addresses/${addressId}`,
        { withCredentials: true }
      );
      return { addressId, addresses: data.addresses };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      if (!id) {
        console.error("Missing address ID for update:", id);
        return;
      }
      const { data } = await axios.put(
        `https://mern-ecommerce-mvvv.onrender.com/api/addresses/${id}`,
        updatedData,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch Addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Address
      .addCase(addAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses.push(action.payload); // append the new address
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = action.payload.addresses;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.addresses.findIndex(
          (addr) => addr._id === action.payload._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload; // replace updated address
        }
      });
  },
});

// Selectors
export const selectAddresses = (state) => state.address.addresses;
export const selectAddressStatus = (state) => state.address.status;
export const selectAddressError = (state) => state.address.error;

export default addressSlice.reducer;
