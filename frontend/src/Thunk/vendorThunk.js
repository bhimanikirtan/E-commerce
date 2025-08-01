import { createAsyncThunk } from "@reduxjs/toolkit";
import { openSnackbar } from "../redux/snackBarSlice";
import { addVendorDetailsAPI } from "../apis/vendorAPI";

export const addVendorDetailsData = createAsyncThunk(
  "vendor/addVendorDetails",
  async (values, { dispatch }) => {
    try {
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
