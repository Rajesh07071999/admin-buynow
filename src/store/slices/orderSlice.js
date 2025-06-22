
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/apiHandler";
import { ErrorAlert, SuccessAlert } from "../../components/Alert/alert.js"; 

export const orderUpdateStatas = createAsyncThunk(
  "OrderUpdateStatas",
  async (data) => {
    try {
      const response = await API.orderUpdateStatas({ ...data });
      const res=JSON.parse(response)
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
export const orderListing = createAsyncThunk(
  "OrderListing",
  async (data) => {
    try {
      const response = await API.orderListing({ ...data });
      const res=JSON.parse(response)
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

const initialState = {
   OrderUpdateStatas: {
    data: [],
    error: null,
  },
    OrderListing: {
    data: [],
    error: null,
  },
 
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
     setOrderId: (state) => {
      state.leadByIDGet.data = [];
    },

  },
   extraReducers: (builder) => {
    builder
      .addCase(orderUpdateStatas.fulfilled, (state, action) => {
        state.OrderUpdateStatas.data = action.payload;
      })
      .addCase(orderUpdateStatas.rejected, (state, action) => {
        state.OrderUpdateStatas.error = action.error.message;
      })
       .addCase(orderListing.fulfilled, (state, action) => {
        state.OrderListing.data = action.payload;
      })
      .addCase(orderListing.rejected, (state, action) => {
        state.OrderListing.error = action.error.message;
      })
    
    }
});

export const {  setOrderId } = orderSlice.actions;
export default orderSlice.reducer;
