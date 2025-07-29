import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { openSnackbar } from "./snackBarSlice";
import {
  loginUserAPI,
  userDetailAPI,
  registerUserAPI,
  updateUserAPI,
  addAddressAPI,
  getAddressAPI,
  deleteAddressAPI,
  updateAddressAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
  setDefaultAddressAPI,
} from "../apis/authAPI";
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const user = await userDetailAPI();
  return user;
});
export const loginUser = createAsyncThunk(
  "user/login",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      const response = await loginUserAPI(values);
      dispatch(
        openSnackbar({
          massage: "Login Successfully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "Login failed",
          severity: "error",
        })
      );
      return rejectWithValue(error?.data.msg);
    }
  }
);
export const registerUser = createAsyncThunk(
  "user/register",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      const response = await registerUserAPI(values);
      dispatch(
        openSnackbar({
          massage: "Registration Successfully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "Register failed",
          severity: "error",
        })
      );
      return rejectWithValue(error?.data.msg);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/UserUpdate",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateUserAPI(values);
      dispatch(
        openSnackbar({
          massage: "UserProfile update Successfully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "profile update failed",
          severity: "error",
        })
      );
      return rejectWithValue(error?.data.msg);
    }
  }
);
export const addAddress = createAsyncThunk(
  "user/addAddress",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      const response = await addAddressAPI(values);
      dispatch(
        openSnackbar({
          massage: "Address added Successfully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "add  Address failed",
          severity: "error",
        })
      );
      return rejectWithValue(error?.data.msg);
    }
  }
);
export const getAddress = createAsyncThunk(
  "user/getAddress",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await getAddressAPI();
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "get address failed",
          severity: "error",
        })
      );
      return rejectWithValue(error?.data.msg);
    }
  }
);
export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteAddressAPI(id);
      dispatch(
        openSnackbar({
          massage: "address Deleted Successfully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "delete address failed",
          severity: "error",
        })
      );
      return rejectWithValue(error?.data.msg);
    }
  }
);
export const updateAddress = createAsyncThunk(
  "user/updateAddress",
  async ({ id, values }, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateAddressAPI(id, values);
      dispatch(
        openSnackbar({
          massage: "Address Update Successfully",
          severity: "success",
        })
      );
      return response.addressUpdate;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "update address failed",
          severity: "error",
        })
      );
      return rejectWithValue(error?.data.msg);
    }
  }
);
export const setDefaultAddressData = createAsyncThunk(
  "user/setDefaultAddress",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await setDefaultAddressAPI(id);
      dispatch(
        openSnackbar({
          massage: "set Address Default Successfully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "update address failed",
          severity: "error",
        })
      );
      return rejectWithValue(error?.data.msg);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { dispatch, rejectWithValue }) => {
    try {
      const response = await forgotPasswordAPI(email);
      dispatch(
        openSnackbar({
          massage: "Email send  Successfully",
          severity: "success",
        })
      );
      return response.addressUpdate;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "update address failed",
          severity: "error",
        })
      );
      return rejectWithValue(error?.data.msg);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      const response = await resetPasswordAPI(values);
      dispatch(
        openSnackbar({
          massage: "Password Update Successfully",
          severity: "success",
        })
      );
      return response.addressUpdate;
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: error?.response?.data?.msg || "update address failed",
          severity: "error",
        })
      );
      return rejectWithValue(error?.data.msg);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  address: [],
  users: [],
};
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // updateUserSubscription(state, action) {
    //   if (state.user) {
    //     state.user.isSubscribe = action.payload;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      /*********Fetch User***********/
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      /*********Login User***********/
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      /*********Register User***********/
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      /*********update UserProfile***********/
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.updateUser;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      /*********add Address***********/
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      /*********get Address***********/
      .addCase(getAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.addresses);
        state.address = action.payload.addresses;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      /*********delete Address***********/
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.address = state.address.filter(
          (add) => add._id !== action.payload.deleteAddress._id
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      /*********update Address***********/
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload.addressData;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      /*********set default Address***********/
      .addCase(setDefaultAddressData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddressData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setDefaultAddressData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      /*********forgot password***********/
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      /*********reset password***********/
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { login, updateUserSubscription } = userSlice.actions;
export default userSlice.reducer;
