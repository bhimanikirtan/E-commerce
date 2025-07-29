import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOrderAdminAPI,
  updateOrderAdminAPI,
  getAllUsersAPI,
  blockUserAPI,
  updateUserByAdminAPI,
  getAllCountByAdminAPI,
  getAnalyticsAPI,
} from "../apis/adminAPI";
import { openSnackbar } from "../redux/snackBarSlice";

export const getAllOrderAdminData = createAsyncThunk(
  "admin/getAllOrderAdmin",
  async (status, { dispatch, rejectWithValue }) => {
    try {
      const response = await getAllOrderAdminAPI(status);
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
export const updateOrderAdminData = createAsyncThunk(
  "admin/updateOrderAdmin",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateOrderAdminAPI(id);
      dispatch(
        openSnackbar({
          massage: `Order Update Successfully`,
          severity: "success",
        })
      );
      return response.updateOrder;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error.response.data.msg || "Failed to Update",
          severity: "error",
        })
      );
      return rejectWithValue(error.response?.data.msg);
    }
  }
);
export const getAllUsersData = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { dispatch }) => {
    try {
      const response = await getAllUsersAPI();
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "get users failed",
          severity: "error",
        })
      );
    }
  }
);
export const blockUserData = createAsyncThunk(
  "admin/blockUser",
  async (id, { dispatch }) => {
    try {
      const response = await blockUserAPI(id);
      dispatch(
        openSnackbar({
          massage: "User Block Successfully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "Block User failed",
          severity: "error",
        })
      );
    }
  }
);
export const updateUserByAdminData = createAsyncThunk(
  "admin/updateUserByAdmin",
  async ({ id, values }, { dispatch }) => {
    try {
      const response = await updateUserByAdminAPI(id, values);
      dispatch(
        openSnackbar({
          massage: "User Update Successfully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "update user failed",
          severity: "error",
        })
      );
    }
  }
);
export const getAllCountByAdminData = createAsyncThunk(
  "admin/getAllCountByAdmin",
  async (_, { dispatch }) => {
    try {
      const response = await getAllCountByAdminAPI();
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "Get Count failed",
          severity: "error",
        })
      );
    }
  }
);
export const getAnalyticsData = createAsyncThunk(
  "admin/getAnalyticsData",
  async (_, { dispatch }) => {
    try {
      const response = await getAnalyticsAPI();
      console.log(response);
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "Get Analytics failed",
          severity: "error",
        })
      );
    }
  }
);
