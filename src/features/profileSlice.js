// createSlice
import { createSlice } from "@reduxjs/toolkit";
// profileslice

const initialState = {
    user:  null,
};

export const profileslice = createSlice({

    name: "user",
    initialState:initialState,
    reducers:  {
        setUser: (state, action)=>{
            state.user = action.payload;
        }
    }
})

export const {setUser} = profileslice.actions;
export default profileslice.reducer