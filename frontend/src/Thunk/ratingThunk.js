import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addRatingAPI,
  getOneProductRatingAPI,
  getUserRatingAPI,
  updateUserRatingAPI,
} from "../apis/ratingAPI";
import { openSnackbar } from "../redux/snackBarSlice";

export const addRatingData = createAsyncThunk(
  "rating/addrating",
  async (values, { dispatch }) => {
    try {
      const response = await addRatingAPI(values);
      dispatch(
        openSnackbar({
          massage: "Rating Submitted SuccessFully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      return error.response?.data || "Failed to fetch Products";
    }
  }
);
export const getUserRatingData = createAsyncThunk(
  "rating/getUserrating",
  async (id) => {
    try {
      const response = await getUserRatingAPI(id);
      return response;
    } catch (error) {
      return error.response?.data || "Failed to fetch Products";
    }
  }
);
export const getOneProductRatingData = createAsyncThunk(
  "rating/getOneProductRating",
  async (id) => {
    try {
      const response = await getOneProductRatingAPI(id);
      return response;
    } catch (error) {
      return error.response?.data || "Failed to fetch Products";
    }
  }
);
export const updateUserRatingData = createAsyncThunk(
  "rating/updateUserrating",
  async (values, { dispatch }) => {
    try {
      const response = await updateUserRatingAPI(values);
      dispatch(
        openSnackbar({
          massage: "Rating Update SuccessFully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      return error.response?.data || "Failed to fetch Products";
    }
  }
);
