import { createSlice } from "@reduxjs/toolkit";
import {
  handleSubscriptionData,
  invoiceData,
  sendPaymentData,
} from "../Thunk/paymentThunk";

const initialState = {};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(sendPaymentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendPaymentData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendPaymentData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(invoiceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(invoiceData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(invoiceData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(handleSubscriptionData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSubscriptionData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleSubscriptionData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default paymentSlice.reducer;
