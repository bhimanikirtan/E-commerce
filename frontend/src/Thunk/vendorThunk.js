import { createAsyncThunk } from "@reduxjs/toolkit";
import { openSnackbar } from "../redux/snackBarSlice";
import {
  addVendorDetailsAPI,
  getVendorDetailsAPI,
  updateVendorDetailsAPI,
} from "../apis/vendorAPI";

export const addVendorDetailsData = createAsyncThunk(
  "vendor/addVendorDetails",
  async (values, { dispatch }) => {
    try {
      console.log(values, "sdjkfsjkfjkfsjfbfbshjfbshj");
      const response = await addVendorDetailsAPI(values);
      dispatch(
        openSnackbar({
          massage: "VendorDetails Submitted SuccessFully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      return error.response?.data || "Failed to add vendor details";
    }
  }
);
export const getVendorDetailsData = createAsyncThunk(
  "vendor/getVendorDetails",
  async () => {
    try {
      const response = await getVendorDetailsAPI();
      console.log(response);
      return response;
    } catch (error) {
      return error.response?.data || "Failed to get vendor details";
    }
  }
);
export const updateVendorDetailsData = createAsyncThunk(
  "vendor/updateVendorDetails",
  async (values, { dispatch }) => {
    try {
      const response = await updateVendorDetailsAPI(values);
      //   console.log(response);
      dispatch(
        openSnackbar({
          massage: "VendorProfile updated successfully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      return error.response?.data || "Failed to get vendor details";
    }
  }
);
