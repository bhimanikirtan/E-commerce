import {
  getAllproductsData,
  updateProductData,
  deleteProductData,
  getOneproductData,
  getNewArrivalsProductData,
  getTopSellingProductData,
  addProductData,
} from "../Thunk/productThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  newArrival: [],
  topSelling: [],
  loading: false,
  error: null,
  total: null,
  selectedProduct: null,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /*******************************addProductData*****************************/
      .addCase(addProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.AllProduct;
      })
      .addCase(addProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })
      /*******************************getAllProductData*****************************/
      .addCase(getAllproductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllproductsData.fulfilled, (state, action) => {
        const { products, total, skip } = action.payload;
        if (skip === 0) {
          state.products = products;
        } else {
          state.products = [...state.products, ...products];
        }
        state.total = total;
        state.loading = false;
      })

      .addCase(getAllproductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })

      /*******************************getNewArrivalProductData*****************************/
      .addCase(getNewArrivalsProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewArrivalsProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.newArrival = action.payload.products;
      })
      .addCase(getNewArrivalsProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })

      /*******************************getTopSellingProductData*****************************/
      .addCase(getTopSellingProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopSellingProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.topSelling = action.payload.products;
      })
      .addCase(getTopSellingProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })

      /***********************************updateProductData***************************/
      .addCase(updateProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductData.fulfilled, (state, action) => {
        state.loading = false;
        const updateProduct = action.payload.updateProduct;
        const index = state.products.findIndex(
          (p) => p._id === action.payload.updateProduct._id
        );
        if (index !== -1) {
          state.products[index] = updateProduct;
        }
      })
      .addCase(updateProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })

      /*************************************deleteProductData*************************/

      .addCase(deleteProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductData.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.products = state.products.filter(
          (d) => d._id !== action.payload.deleteProduct._id
        );
      })
      .addCase(deleteProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })

      /*************************************getOneProductData**************************/

      .addCase(getOneproductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneproductData.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.product;
      })
      .addCase(getOneproductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      });
  },
});

export default productSlice.reducer;
