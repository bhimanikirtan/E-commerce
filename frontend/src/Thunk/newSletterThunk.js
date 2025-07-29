import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewSletterAPI,
  deleteEmailAPI,
  getAllEmailsAPI,
  sendNewsLetterAPI,
} from "../apis/newSletterAPI";
import { openSnackbar } from "../redux/snackBarSlice";

export const addNewSletterData = createAsyncThunk(
  "newSletter/addNewSletter",
  async (email, { dispatch, rejectWithValue }) => {
    try {
      const response = await addNewSletterAPI(email);
      dispatch(
        openSnackbar({
          massage: response?.msg || "Newsletter Added Successfully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      const errData = error.response?.data || {
        msg: "Failed to Add Newsletter",
        status: false,
      };
      dispatch(
        openSnackbar({
          massage: errData.msg,
          severity: "error",
        })
      );
      return rejectWithValue(errData);
    }
  }
);
export const getAllEmailsData = createAsyncThunk(
  "newSletter/getAllEmails",
  async () => {
    try {
      const response = await getAllEmailsAPI();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteEmailData = createAsyncThunk(
  "newSletter/deleteEmail",
  async (id, { dispatch }) => {
    try {
      const response = await deleteEmailAPI(id);
      dispatch(
        openSnackbar({
          massage: response?.msg || "Email delete Successfully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const sendNewsLetterData = createAsyncThunk(
  "newSletter/sendNewsLetter",
  async ({ values }, { dispatch }) => {
    try {
      console.log(values);
      const response = await sendNewsLetterAPI(values);
      dispatch(
        openSnackbar({
          massage: response?.msg || "NewsLetter send Successfully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
