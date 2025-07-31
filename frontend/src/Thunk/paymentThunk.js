import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleSubscriptionAPI,
  invoiceAPI,
  paymentAPI,
} from "../apis/paymentAPI";

export const sendPaymentData = createAsyncThunk(
  "payment/sendPayment",
  async ({ orderId }) => {
    const response = await paymentAPI({ orderId });
    return response.data;
  }
);
export const invoiceData = createAsyncThunk(
  "payment/invoice",
  async (session_id) => {
    const response = await invoiceAPI(session_id);
    return response.data; // this will be blob
  }
);
export const handleSubscriptionData = createAsyncThunk(
  "payment/handleSubscription",
  async ({ subscribId, userId }) => {
    const response = await handleSubscriptionAPI({ subscribId, userId });
    return response.data;
  }
);
