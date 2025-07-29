import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleSubscriptionAPI, paymentAPI } from "../apis/paymentAPI";

export const sendPaymentData = createAsyncThunk(
  "payment/sendPayment",
  async ({ orderId }) => {
    const response = await paymentAPI({ orderId });
    return response.data;
  }
);
export const handleSubscriptionData = createAsyncThunk(
  "payment/handleSubscription",
  async ({ subscribId,userId }) => {
    const response = await handleSubscriptionAPI({ subscribId,userId });
    return response.data;
  }
);
