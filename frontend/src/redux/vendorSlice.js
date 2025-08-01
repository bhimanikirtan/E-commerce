import { createSlice } from "@reduxjs/toolkit";
import { addVendorDetailsData } from "../Thunk/vendorThunk";

const initialState = {};

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
      });
  },
});

export default vendorSlice.reducer;
