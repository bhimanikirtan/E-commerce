import { createSlice } from "@reduxjs/toolkit";
import {
  addOrderData,
  getAllOrderData,
  cancelOrderData,
  getAllVendorOrderData,
} from "../Thunk/orderThunk";

const initialState = {
  orderData: [],
  ratingData: [],
  orderVendorData: [],
  total: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*************************************addOrderData**************************/
      .addCase(addOrderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrderData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })

      /*************************************getAllOrderData**************************/

      .addCase(getAllOrderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrderData.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.orderData = action.payload.data;
        state.ratingData = action.payload.rateValue;
        state.total = action.payload.data.total;
      })
      .addCase(getAllOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })
      /*************************************getAllVendorOrderData**************************/

      .addCase(getAllVendorOrderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVendorOrderData.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.orderVendorData = action.payload.filteredOrders;
      })
      .addCase(getAllVendorOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })

      /*************************************cancelOrderData**************************/

      .addCase(cancelOrderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrderData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(cancelOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      });
  },
});

export const { deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
