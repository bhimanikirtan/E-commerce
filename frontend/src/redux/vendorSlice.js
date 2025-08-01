import { createSlice } from "@reduxjs/toolkit";
import {
  addVendorDetailsData,
  getVendorDetailsData,
} from "../Thunk/vendorThunk";

const initialState = {
  vendor: null,
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
      });
  },
});

export default vendorSlice.reducer;
