import { createSlice } from "@reduxjs/toolkit";
import {
  addVendorDetailsData,
  getVendorDetailsData,
  getVendorProductsData,
  updateVendorDetailsData,
} from "../Thunk/vendorThunk";

const initialState = {
  vendor: null,
  vendorProducts: [],
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*********add vendor Details***********/
      .addCase(addVendorDetailsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVendorDetailsData.fulfilled, (state) => {
        state.loading = false;
        // state.users = action.payload.users;
      })
      .addCase(addVendorDetailsData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      /*********get vendor Details***********/
      .addCase(getVendorDetailsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorDetailsData.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload.vendorDetails;
      })
      .addCase(getVendorDetailsData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      /*********update vendor Details***********/
      .addCase(updateVendorDetailsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendorDetailsData.fulfilled, (state) => {
        state.loading = false;
        // state.vendor = action.payload.vendorDetails;
      })
      .addCase(updateVendorDetailsData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      /*********get vendorProducts***********/
      .addCase(getVendorProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorProducts = action.payload.vendorProducts;
      })
      .addCase(getVendorProductsData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default vendorSlice.reducer;
