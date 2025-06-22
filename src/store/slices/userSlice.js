
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/apiHandler.jsx";
import { ErrorAlert, SuccessAlert } from "../../components/Alert/alert.js";

export const userList = createAsyncThunk(
    "UserLists",
    async (data) => {
        try {
            const response = await API.userList({ ...data });
            const res = JSON.parse(response)
            console.log(res)
            if (res.code == 200) {
                SuccessAlert(res.message);
            }
            else {
                ErrorAlert(res.message);
            }
            return res;
        } catch (error) {
            console.log("error", error);

            // ErrorAlert(error);
        }
    }
);


export const userDetails = createAsyncThunk(
    "UserDetails",
    async (data) => {
        try {
            const response = await API.userDetails({ ...data });
            const res = JSON.parse(response)
            console.log(res)
            if (res.code == 200) {
                SuccessAlert(res.message);
            }
            else {
                ErrorAlert(res.message);
            }
            return res;
        } catch (error) {
            console.log("error", error);

            // ErrorAlert(error);
        }
    }
);

export const userChangeStatus = createAsyncThunk(
    "UserChangeStatus",
    async (data) => {
        try {
            const response = await API.userChangeStatus({ ...data });
            const res = JSON.parse(response)
            console.log(res)
            if (res.code == 200) {
                // SuccessAlert(res.message);
            }
            else {
                ErrorAlert(res.message);
            }
            return res;
        } catch (error) {
            console.log("error", error);

            // ErrorAlert(error);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "DeleteUser",
    async (data) => {
        try {
            const response = await API.deleteUser({ ...data });
            const res = JSON.parse(response)
            console.log(res)
            if (res.code == 200) {
                SuccessAlert(res.message);
            }
            else {
                ErrorAlert(res.message);
            }
            return res;
        } catch (error) {
            console.log("error", error);

            // ErrorAlert(error);
        }
    }
);

const initialState = {
    UserLists: {
        data: [],
        error: null,
    },

    UserDetails : {
         data: [],
        error: null,
    },
    UserChangeStatus:{
        data:[],
        error:null
    },
    DeleteUser:{
        data:[],
        error:null
    }

};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state) => {
            state.leadByIDGet.data = [];
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(userList.fulfilled, (state, action) => {
                state.UserLists.data = action.payload;
            })
            .addCase(userList.rejected, (state, action) => {
                state.UserLists.error = action.error.message;
            })
            .addCase(userDetails.fulfilled, (state, action) => {
                state.UserDetails.data = action.payload;
            })
            .addCase(userDetails.rejected, (state, action) => {
                state.UserDetails.error = action.error.message;
            })
             .addCase(userChangeStatus.fulfilled, (state, action) => {
                state.UserChangeStatus.data = action.payload;
            })
            .addCase(userChangeStatus.rejected, (state, action) => {
                state.UserChangeStatus.error = action.error.message;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.DeleteUser.data = action.payload;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.DeleteUser.error = action.error.message;
            })

    }
});
export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
