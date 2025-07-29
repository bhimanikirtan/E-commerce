import { createAsyncThunk } from "@reduxjs/toolkit";
import { openSnackbar } from "../redux/snackBarSlice";
import { addWishlistAPI, deleteUserWishlistAPI, getUserWishlistAPI } from "../apis/wishlistAPI";


export const addWishlistData = createAsyncThunk(
    "wishList/addwishlist",
    async ({ id }, { dispatch }) => {
        try {
            const response = await addWishlistAPI(id);
            console.log(response)
            dispatch(
                openSnackbar({
                    massage: response?.msg || "Product Added to wishlist",
                    severity: "success",
                })
            );
            return response;
        } catch (error) {
            dispatch(
                openSnackbar({
                    massage: "Product Already in wishlist",
                    severity: "error",
                })
            );
            return error.response?.data || "Failed to add Product in wishlist";
        }
    }
);

export const getUserWishlistData = createAsyncThunk(
    "wishList/getUserwishlist",
    async () => {
        try {
            const response = await getUserWishlistAPI();
            return response;
        } catch (error) {
            return error.response?.data || "Failed to add Product in wishlist";
        }
    }
);
export const deleteUserWishlistData = createAsyncThunk(
    "wishList/deleteUserwishlist",
    async ({ id }, { dispatch }) => {
        try {
            const response = await deleteUserWishlistAPI(id);
            dispatch(
                openSnackbar({
                    massage: response?.msg || "Remove from wishList",
                    severity: "success",
                })
            );
            return response;
        } catch (error) {
            return error.response?.data || "Failed to add Product in wishlist";
        }
    }
);