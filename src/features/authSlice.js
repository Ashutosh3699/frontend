// createSlice
import { createSlice } from "@reduxjs/toolkit";
// authslice

const initialState = {

    token:  localStorage.getItem("token") ? (JSON.parse(localStorage.getItem("token"))) : null,
};

export const authslice = createSlice({

    name: "auth",
    initialState:initialState,
    reducers:  {
        setToken: (state, action)=>{

            state.token = action.payload;
        }
    }
})

export const {setToken} = authslice.actions;
export default authslice.reducer