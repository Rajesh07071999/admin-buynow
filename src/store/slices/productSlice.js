
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/apiHandler";
import { ErrorAlert, SuccessAlert } from "../../components/Alert/alert.js";

export const productListing = createAsyncThunk(
    "ProductListing",
    async (data) => {
        try {
            const response = await API.productListing({ ...data });
            const res = JSON.parse(response)
            if (res?.code == 200) {
                // SuccessAlert(res.message);
            } else {
                // ErrorAlert(res.message);
            }
            return res;
        } catch (error) {
            ErrorAlert(error);
        }
    }
);

export const addProduct = createAsyncThunk(
    "AddProduct",
    async (data) => {
        try {
            const response = await API.addProduct({ ...data });
            const res = JSON.parse(response)
            if (res?.code == 200) {
                SuccessAlert(res.message);
            } else {
                ErrorAlert(res.message);
            }
            return res;
        } catch (error) {
            ErrorAlert(error);
        }
    }
);
export const editProduct = createAsyncThunk(
    "EditProduct",
    async (data) => {
        try {
            const response = await API.editProduct({ ...data });
            const res = JSON.parse(response)
            if (res?.code == 200) {
                SuccessAlert(res.message);
            } else {
                ErrorAlert(res.message);
            }
            return res;
        } catch (error) {
            ErrorAlert(error);
        }
    }
);
export const deleteProduct = createAsyncThunk(
    "DeleteProduct",
    async (data) => {
        try {
            const response = await API.deleteProduct({ ...data });
            const res = JSON.parse(response)
            if (res?.code == 200) {
                SuccessAlert(res.message);
            } else {
                ErrorAlert(res.message);
            }
            return res;
        } catch (error) {
            ErrorAlert(error);
        }
    }
);
const initialState = {
    ProductListing: {
        data: [],
        error: null,
    },
    AddProduct: {
        data: [],
        error: null,
    },
    EditProduct: {
        data: [],
        error: null,
    },
    DeleteProduct: {
        data: [],
        error: null,
    },
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductId: (state) => {
            state.leadByIDGet.data = [];
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(productListing.fulfilled, (state, action) => {
                state.ProductListing.data = action.payload;
            })
            .addCase(productListing.rejected, (state, action) => {
                state.ProductListing.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.AddProduct.data = action.payload;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.AddProduct.error = action.error.message;
            })
             .addCase(editProduct.fulfilled, (state, action) => {
                state.EditProduct.data = action.payload;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.EditProduct.error = action.error.message;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.DeleteProduct.data = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.DeleteProduct.error = action.error.message;
            })
    }
});

export const { setProductId } = productSlice.actions;
export default productSlice.reducer;
