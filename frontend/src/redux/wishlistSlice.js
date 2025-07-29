import { createSlice } from "@reduxjs/toolkit";
import { addWishlistData, deleteUserWishlistData, getUserWishlistData } from "../Thunk/wishlistThunk";



const initialState = {
    userLikes: [],
};

const wishlistSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            /*************************************addwishlistData**************************/
            .addCase(addWishlistData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addWishlistData.fulfilled, (state) => {
                state.loading = false;
                // console.log(action.payload.allLikes)
                // state.userLikes = action.payload.allLikes
            })
            .addCase(addWishlistData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*************************************getUserwishlistData**************************/
            .addCase(getUserWishlistData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserWishlistData.fulfilled, (state, action) => {
                state.loading = false;
                state.userLikes = action.payload.userLikes
            })
            .addCase(getUserWishlistData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*************************************deleteUserwishlistData**************************/
            .addCase(deleteUserWishlistData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUserWishlistData.fulfilled, (state, action) => {
                state.loading = false;
                state.userLikes = state.userLikes.filter((l) => l._id !== action.payload.userLikes._id)
            })
            .addCase(deleteUserWishlistData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })

    }
})


export default wishlistSlice.reducer;