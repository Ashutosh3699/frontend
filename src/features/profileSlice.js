// createSlice
import { createSlice } from "@reduxjs/toolkit";
// profileslice

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

export const profileslice = createSlice({

    name: "user",
    initialState:initialState,
    reducers:  {
        setUser: (state, action)=>{
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user))
        }
    }
})

export const {setUser} = profileslice.actions;
export default profileslice.reducer