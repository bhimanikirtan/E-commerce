import { createSlice } from "@reduxjs/toolkit";
import { addToCartData, getAllCartData, removeFromCartData, clearCartData, plusData, minusData } from "../Thunk/cartThunk";




const initialState = {
    cartData: [],
    total: null,
    cartItems: []
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartData = [],
                state.total = 0
        }
    },
    extraReducers: (builder) => {
        builder
            /*******************************addToCartData*****************************/
            .addCase(addToCartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCartData.fulfilled, (state, action) => {
                state.loading = false;
                state.cartData = action.payload.cart.products
            })
            .addCase(addToCartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*******************************getAllCartData*****************************/



            .addCase(getAllCartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCartData.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload.cartItems)
                state.cartData = action.payload.cartItems.products;
                state.total = action.payload.cartItems.total;
                state.cartItems = action.payload.cartItems;
            })
            .addCase(getAllCartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*******************************removeFromCartData*****************************/


            .addCase(removeFromCartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCartData.fulfilled, (state, action) => {
                state.loading = false;
                state.cartData = action.payload.cart.products
                state.total = action.payload.cart.total;
            })
            .addCase(removeFromCartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*******************************clearCartData*****************************/

            .addCase(clearCartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCartData.fulfilled, (state, action) => {
                state.loading = false;
                state.cartData = action.payload.cart.products
                state.total = action.payload.cart.total;
            })
            .addCase(clearCartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*******************************plusData*****************************/


            .addCase(plusData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(plusData.fulfilled, (state, action) => {
                state.loading = false;
                state.cartData = action.payload.cart.products;
                state.total = action.payload.cart.total;

            })
            .addCase(plusData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*******************************minusData*****************************/

            .addCase(minusData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(minusData.fulfilled, (state, action) => {
                state.loading = false;
                state.cartData = action.payload.cart.products;
                state.total = action.payload.cart.total;
            })
            .addCase(minusData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })

    }
});

export const { clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;

