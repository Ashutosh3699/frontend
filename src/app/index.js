// combine reducers
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import profileReducer from "../features/profileSlice";
import cartReducer from "../features/cartSlice";
import courseReducer from "../features/courseSlice";
import viewCourseReducer from "../features/viewCourseSlice";

const rootReducer = combineReducers({

    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseReducer,
    viewCourse: viewCourseReducer,
    
});

export default rootReducer;