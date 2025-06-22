
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/apiHandler";
import { ErrorAlert, SuccessAlert } from "../../components/Alert/alert.js"; 


export const cartListing = createAsyncThunk(
  "CartListing",
  async (data) => {
    try {
      const response = await API.cartListing({ ...data });
      const res=JSON.parse(response)
      if (res?.code == 200) {
        // SuccessAlert(res.message);
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
 
   CartListing: {
    data: [],
    error: null,
  },

};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
     setCartId: (state) => {
      state.leadByIDGet.data = [];
    },

  },
   extraReducers: (builder) => {
    builder
      
       .addCase(cartListing.fulfilled, (state, action) => {
        state.CartListing.data = action.payload;
      })
      .addCase(cartListing.rejected, (state, action) => {
        state.CartListing.error = action.error.message;
      })
    }
});

export const {  setCartId } = cartSlice.actions;
export default cartSlice.reducer;
