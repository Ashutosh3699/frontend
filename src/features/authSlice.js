// createSlice
import { createSlice } from "@reduxjs/toolkit";
// authslice

const initialState = {
    signupData: null,
    loading: false,
    token:  localStorage.getItem("token") ? (JSON.parse(localStorage.getItem("token"))) : null,
};

export const authslice = createSlice({

    name: "auth",
    initialState:initialState,
    reducers:  {
        setToken: (state, action)=>{

            state.token = action.payload;
        },
        setsignupData(state, value) {
            state.signupData = value.payload;
          },
        setLoading(state, value) {
            state.loading = value.payload;
          },
    }
})

export const {setToken,setsignupData,setLoading} = authslice.actions;
export default authslice.reducer