import { createSlice } from "@reduxjs/toolkit";
import {
  addNewSletterData,
  deleteEmailData,
  getAllEmailsData,
  sendNewsLetterData,
} from "../Thunk/newSletterThunk";

const initialState = {
  allEmails: [],
  loading: null,
};

const newSletterSlice = createSlice({
  name: "newSletter", 
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*************************************addNewSletterData**************************/
      .addCase(addNewSletterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewSletterData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewSletterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })

      /************************************getAllEmailsData**************************/
      .addCase(getAllEmailsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmailsData.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.allEmails);
        state.allEmails = action.payload.allEmails;
      })
      .addCase(getAllEmailsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })
      /************************************deleteEmailData**************************/
      .addCase(deleteEmailData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmailData.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.deleteEmail._id);
        state.allEmails = state.allEmails.filter(
          (e) => e._id !== action.payload.deleteEmail._id
        );
      })
      .addCase(deleteEmailData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })
      /************************************sendNewsLetterData**************************/
      .addCase(sendNewsLetterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendNewsLetterData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendNewsLetterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      });
  },
});

export default newSletterSlice.reducer;
