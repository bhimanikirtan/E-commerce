import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCartAPI,
  clearCartAPI,
  getAllCartAPI,
  plusAPI,
  minusAPI,
  removeFromCartAPI,
} from "../apis/cartAPI";
import { openSnackbar } from "../redux/snackBarSlice";

export const addToCartData = createAsyncThunk(
  "products/addToCart",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      const response = await addToCartAPI(values);
      dispatch(
        openSnackbar({
          massage: `Added To Cart Successfully`,
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error.response.data.msg || "Failed to Add",
          severity: "error",
        })
      );
      return rejectWithValue(error.response?.data.msg);
    }
  }
);

export const getAllCartData = createAsyncThunk(
  "products/getAllcartData",
  async () => {
    try {
      const response = await getAllCartAPI();
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);
export const removeFromCartData = createAsyncThunk(
  "products/removeFromCartData",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await removeFromCartAPI(id);
      dispatch(
        openSnackbar({
          massage: `Product remove from cart`,
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error.response.data.msg || "Failed to remove",
          severity: "error",
        })
      );
      return rejectWithValue(error.response?.data.msg);
    }
  }
);
export const clearCartData = createAsyncThunk(
  "products/clearCartData",
  async (_, { dispatch }) => {
    try {
      const response = await clearCartAPI();
      dispatch(
        openSnackbar({ massage: `The Cart is Clear`, severity: "success" })
      );
      return response;
    } catch (error) {
      return error.response?.data || "Failed to fetch Products";
    }
  }
);
export const plusData = createAsyncThunk(
  "products/plusData",
  async (id, { dispatch }) => {
    try {
      const response = await plusAPI(id);
      dispatch(
        openSnackbar({ massage: `Quantity is Plus by 1`, severity: "success" })
      );
      return response;
    } catch (error) {
      return error.response?.data || "Failed to fetch Products";
    }
  }
);
export const minusData = createAsyncThunk(
  "products/minusData",
  async (id, { dispatch }) => {
    try {
      const response = await minusAPI(id);
      dispatch(
        openSnackbar({ massage: `Quantity is Minus by 1`, severity: "success" })
      );
      return response;
    } catch (error) {
      return error.response?.data || "Failed to fetch Products";
    }
  }
);
