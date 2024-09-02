// combine reducers
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import profileReducer from "../features/profileSlice";
import cartReducer from "../features/cartSlice";

const rootReducer = combineReducers({

    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer
});

export default rootReducer;